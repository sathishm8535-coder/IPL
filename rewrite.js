const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Frontend', 'js', 'Ipl.js');
let content = fs.readFileSync(filePath, 'utf8');

const anchor = '// Multiplayer functionality';
const parts = content.split(anchor);
if (parts.length < 2) {
    console.error("Anchor not found!");
    process.exit(1);
}

// STRIP OUT OLD SOCKET EMITS IN TOP HALF
let topHalf = parts[0];
topHalf = topHalf.replace(/if\s*\(\s*isMultiplayer\s*&&\s*socket\s*&&\s*socket\.connected\s*&&\s*currentRoomId.*\)/g, 'if (false)');

const newMultiplayerCode = `// Multiplayer functionality (Firebase Realtime Database)
const firebaseConfig = {
    apiKey: "AIzaSyA5xPQfsRg9zJGc1Qdcarop54KDpDeZRqE",
    authDomain: "ipl-auction-a4ef9.firebaseapp.com",
    projectId: "ipl-auction-a4ef9",
    databaseURL: "https://ipl-auction-a4ef9-default-rtdb.firebaseio.com",
    storageBucket: "ipl-auction-a4ef9.firebasestorage.app",
    messagingSenderId: "104002355056",
    appId: "1:104002355056:web:4f9a83b2a996bda62759b5"
};

let db = null;
let currentRoomRef = null;
let currentRoomId = null;
let isMultiplayer = false;
let playerData = null;
let selectedTeamsInRoom = [];
let playersInRoom = [];
let isRoomHost = false;

// DUMMY SOCKET TO PREVENT REFERENCE ERRORS in older code
const socket = { connected: false, emit: () => {} };

function updateServerStatus(message, color) {
  const serverStatus = document.getElementById('serverStatus');
  if (serverStatus) {
    serverStatus.textContent = message;
    serverStatus.style.color = color;
  }
}

function initializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.database();
  updateServerStatus('✅ Connected to Firebase', '#4CAF50');
}

function listenToRoom(roomId) {
  if (currentRoomRef) {
    currentRoomRef.off();
  }
  
  currentRoomRef = db.ref('rooms/' + roomId);
  
  currentRoomRef.child('players').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    playersInRoom = Object.values(data);
    
    if (currentRoomId) {
      document.getElementById('roomStatus').innerHTML = \`
        <div style="color:#4CAF50;font-weight:bold">\${isRoomHost ? 'Room' : 'Connected to Room'}: \${currentRoomId}</div>
        <div style="font-size:12px;color:var(--muted)">\${playersInRoom.length} player(s) connected</div>
      \`;
      document.getElementById('connectedCount').textContent = \`\${playersInRoom.length} player(s) connected\`;
    }
  });

  currentRoomRef.child('gameState/selectedTeams').on('value', (snapshot) => {
    selectedTeamsInRoom = snapshot.val() || [];
    updateTeamDropdowns();
  });

  currentRoomRef.child('gameState').on('value', (snapshot) => {
    const state = snapshot.val();
    if (!state) return;
    
    if (state.phase === 'auction' && document.getElementById("team-selection").style.display !== "none") {
      teams = state.teams || [];
      currentPlayerIndex = state.currentPlayerIndex || 0;
      document.getElementById("team-selection").style.display = "none";
      auctionBlock.style.display = "grid";
      populateBidButtons();
      updateTeamsView();
      loadPlayer();
      showNotification('Auction Started!', 'success');
    }
    
    if (state.phase === 'auction') {
      if (state.currentPlayerIndex !== undefined && state.currentPlayerIndex !== currentPlayerIndex) {
        currentPlayerIndex = state.currentPlayerIndex;
        highestBidderIdx = -1;
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        if (currentPlayerIndex < players.length) {
          loadPlayer();
        } else {
          showResult();
        }
      }
      
      if (state.currentPrice !== undefined && state.currentPrice !== currentPrice) {
        currentPrice = state.currentPrice;
        highestBidderIdx = state.highestBidderIdx;
        currentPriceEl.textContent = currentPrice;
        highestBidderEl.textContent = state.highestBidderName || '-';
        
        countdown = NO_BID_SECONDS;
        timerEl.textContent = \`\${countdown}s\`;
        startCountdownIfNeeded();
      }
      
      if (state.lastAssigned) {
        teams = state.teams || [];
        updateTeamsView();
        updateLiveScoreboard();
        
        auctionHistory.innerHTML = "";
        (state.history || []).forEach(msg => {
          auctionHistory.insertAdjacentHTML("afterbegin", msg);
        });
      }
    }
  });
}

const hostNameInput = document.getElementById('hostName');
if (hostNameInput) {
  const createBtn = document.createElement('button');
  createBtn.style.cssText = "width:100%; padding:12px; background:#f5c518; color:#111; border:none; cursor:pointer; border-radius:6px; font-weight:bold; font-size:15px;";
  createBtn.textContent = '🎯 Create Room';
  createBtn.onclick = handleCreateRoom;
  hostNameInput.parentNode.replaceChild(createBtn, hostNameInput.nextElementSibling);
}

const roomCodeInput = document.getElementById('roomCodeInput');
if (roomCodeInput) {
  const joinBtn = document.createElement('button');
  joinBtn.style.cssText = "width:100%; padding:12px; background:#3d7fff; color:white; border:none; cursor:pointer; border-radius:6px; font-weight:bold; font-size:15px;";
  joinBtn.textContent = '🚀 Join Room';
  joinBtn.onclick = handleJoinRoom;
  roomCodeInput.parentNode.replaceChild(joinBtn, roomCodeInput.nextElementSibling);
}

function handleCreateRoom() {
  const name = document.getElementById('hostName').value.trim();
  if (!name) { 
    showNotification('Enter your name', 'error'); 
    return; 
  }
  
  if (!db) initializeFirebase();
  
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const roomData = {
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    hostSessionId: playerData?.uid || Date.now(),
    players: {},
    gameState: { 
      currentPlayerIndex: 0, 
      currentPrice: 0,
      phase: 'team_selection',
      selectedTeams: [],
      teams: [],
      history: [],
      highestBidderIdx: -1
    }
  };
  
  db.ref('rooms/' + roomId).set(roomData).then(() => {
    currentRoomId = roomId;
    isRoomHost = true;
    isMultiplayer = true;
    
    const playerRef = db.ref('rooms/' + roomId + '/players').push();
    const sessionId = Date.now().toString();
    const pData = { name, uid: playerData?.uid || sessionId, email: playerData?.email || '', socketId: sessionId };
    playerRef.set(pData);
    playerRef.onDisconnect().remove();
    
    document.getElementById('roomCodeDisplay').style.display = 'block';
    document.getElementById('roomCodeValue').textContent = roomId;
    document.getElementById('enterAuctionBtn').style.display = 'block';
    showNotification(\`Room Created: \${roomId}\`, 'success');
    
    listenToRoom(roomId);
  });
}

function handleJoinRoom() {
  const name = document.getElementById('guestName').value.trim();
  const code = document.getElementById('roomCodeInput').value.trim();
  if (!name || !code) { 
    showNotification('Enter name and room code', 'error'); 
    return; 
  }
  
  if (!db) initializeFirebase();
  
  db.ref('rooms/' + code).once('value', (snapshot) => {
    if (!snapshot.exists()) {
      showNotification(\`Error: Room not found\`, 'error');
      return;
    }
    
    const data = snapshot.val();
    const pCount = data.players ? Object.keys(data.players).length : 0;
    if (pCount >= 10) {
      showNotification(\`Error: Room is full\`, 'error');
      return;
    }
    
    currentRoomId = code;
    isRoomHost = false;
    isMultiplayer = true;
    
    const playerRef = db.ref('rooms/' + code + '/players').push();
    const sessionId = Date.now().toString();
    const pData = { name, uid: playerData?.uid || sessionId, email: playerData?.email || '', socketId: sessionId };
    playerRef.set(pData);
    playerRef.onDisconnect().remove();
    
    showNotification(\`Joined Room: \${code}\`, 'success');
    listenToRoom(code);
    
    document.getElementById('enterAuctionBtn').style.display = 'block';
  });
}

function enterAuction() {
  document.getElementById('room-lobby').style.display = 'none';
  document.getElementById('team-selection').style.display = 'block';
  showNotification('Welcome to the auction!', 'success');
}

function copyRoomCode() {
  const codeEl = document.getElementById('roomCodeValue');
  if (!codeEl || !codeEl.textContent) return;
  const code = codeEl.textContent.trim();
  navigator.clipboard.writeText(code).then(() => {
    showNotification(\`Room code \${code} copied!\`, 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showNotification(\`Copied: \${code}\`, 'success');
  });
}

function initializeMultiplayer() {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    playerData = JSON.parse(userInfo);
    initializeFirebase();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initializeMultiplayer();
  }, 1000);
});

window.updateAuctionUI = function () {
  if (currentPlayerIndex < players.length) {
    loadPlayer();
  }
  updateTeamsView();
  updateLiveScoreboard();
  populateBidButtons();
};

const originalBidNow = bidNow;
bidNow = function (idx) {
  originalBidNow(idx);
  if (isMultiplayer && currentRoomRef) {
    const t = teams[idx];
    currentRoomRef.child('gameState').update({
      currentPrice: currentPrice,
      highestBidderIdx: idx,
      highestBidderName: \`\${t.friendName} (\${t.teamName})\`
    });
  }
};

const originalAssignPlayer = assignPlayer;
assignPlayer = function (skipped) {
  originalAssignPlayer(skipped);
  if (isMultiplayer && currentRoomRef) {
    
    const p = players[currentPlayerIndex];
    let msg = skipped ? \`<li>❌ \${p.name} - UNSOLD</li>\` :
      \`<li>✅ \${p.name} → \${teams[highestBidderIdx]?.teamName} sold for ₹\${currentPrice} Cr</li>\`;

    currentRoomRef.child('gameState').once('value').then(snap => {
      let history = snap.val()?.history || [];
      history.push(msg);
      
      currentRoomRef.child('gameState').update({
        teams: teams,
        lastAssigned: Date.now(),
        history: history
      });
    });
  }
};

document.getElementById('startAuctionBtn')?.addEventListener('click', () => {
  if (isMultiplayer && isRoomHost && currentRoomRef) {
    currentRoomRef.child('gameState').update({
      phase: 'auction',
      teams: teams,
      currentPlayerIndex: 0,
      currentPrice: 0,
      highestBidderIdx: -1
    });
  }
});

let auctionEnded = false;

function showCurrentStandings() {
  auctionEnded = false;
  renderWinnerTable();
}

function showResult() {
  auctionEnded = true; 
  renderWinnerTable();
}

function renderWinnerTable() {
  const winnerDiv = document.getElementById("winnerArea");
  if (!winnerDiv) return;

  winnerDiv.style.display = "block";
  const activeTeams = teams.filter(t => t.players && t.players.length > 0);

  if (activeTeams.length === 0) {
    winnerDiv.innerHTML = "<p style='text-align:center; color:#ff8c00; font-size:18px;'>No teams have players yet. Start the auction first!</p>";
    return;
  }

  const sorted = [...activeTeams].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

  let html = \`
    <h2 style="text-align:center; color:#ff8c00; margin:20px 0;">🏆 FINAL WINNER TABLE</h2>
    <table class="winner-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Friend</th>
          <th>Players</th>
          <th>Budget Left</th>
          \${auctionEnded ? "<th>Total Points</th>" : ""}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  \`;

  sorted.forEach((team, index) => {
    let status = "";
    let rowClass = "";

    if (index === 0) {
      status = "🥇 WINNER";
      rowClass = "gold";
    } else if (index === 1) {
      status = "🥈 RUNNER-UP";
      rowClass = "silver";
    } else if (index === 2) {
      status = "🥉 THIRD";
      rowClass = "bronze";
    } else {
      status = \`#\${index + 1}\`;
    }

    html += \`
      <tr class="\${rowClass}">
        <td>\${index + 1}</td>
        <td>\${escapeHtml(team.teamName)}</td>
        <td>\${escapeHtml(team.friendName)}</td>
        <td>\${team.players.length}</td>
        <td>₹\${team.budget} Cr</td>
        \${auctionEnded ? \`<td><strong>\${team.totalPoints || 0}</strong></td>\` : ""}
        <td><strong>\${status}</strong></td>
      </tr>
    \`;
  });

  html += \`
      </tbody>
    </table>
  \`;

  winnerDiv.innerHTML = html;
  winnerDiv.scrollIntoView({ behavior: "smooth" });
}

document.getElementById('declineBtn')?.addEventListener('click', () => {
    if (isMultiplayer && currentRoomRef && isRoomHost) {
        currentRoomRef.child('gameState').update({
            currentPlayerIndex: currentPlayerIndex + 1,
            currentPrice: 0,
            highestBidderIdx: -1
        });
    }
});

function updateLiveScoreboard() {
  const board = document.getElementById("teamBoard");
  if (!board) return;

  board.innerHTML = "";
  teams.forEach(team => {
    const shortName = TEAM_SHORT_NAMES[team.teamName] || team.teamName;
    board.innerHTML += \`
      <div class="team-box">
        \${shortName}<br>
        \${team.friendName}<br>
        Players: \${team.players.length}<br>
        Points: \${team.totalPoints}
      </div>
    \`;
  });
}
`;

const finalContent = topHalf + newMultiplayerCode;
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully rewrote Ipl.js with Firebase multiplayer logic!');
