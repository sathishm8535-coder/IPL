const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Frontend', 'js', 'Ipl.js');
let content = fs.readFileSync(filePath, 'utf8');

const anchor = '// Multiplayer functionality (Firebase Realtime Database)';
const parts = content.split(anchor);
if (parts.length < 2) {
  console.error("Firebase anchor not found!");
  process.exit(1);
}

// STRIP OUT FIREBASE IN TOP HALF IF ANY DUMMY CODE EXISTS
let topHalf = parts[0];
topHalf = topHalf.replace(/const socket = { connected: false, emit: \(\) => {} };/, '');

const newMultiplayerCode = `// Multiplayer functionality (Robust Socket.io)
let socket = null;
let currentRoomId = null;
let isMultiplayer = false;
let playerData = null;
let selectedTeamsInRoom = [];
let playersInRoom = [];
let isRoomHost = false;

function updateServerStatus(message, color) {
  const serverStatus = document.getElementById('serverStatus');
  if (serverStatus) {
    serverStatus.textContent = message;
    serverStatus.style.color = color;
  }
}

function initializeSocket() {
  if (socket && socket.connected) return;

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  // Detect local vs production
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  // Fallback to local 4000 if opened directly from file system
  const isFile = window.location.protocol === 'file:';
  const serverUrl = (isLocal || isFile) ? 'http://localhost:4000' : 'https://ipl-cca1.onrender.com';

  socket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    upgrade: true,
    autoConnect: true
  });

  updateServerStatus('🔄 Connecting...', '#ff8c00');

  socket.on('connect', () => {
    console.log('✅ Connected to server');
    updateServerStatus('✅ Connected', '#4CAF50');
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected:', reason);
    updateServerStatus('❌ Disconnected - Reconnecting...', '#f44336');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
    updateServerStatus('❌ Connection failed - Retrying...', '#f44336');
  });

  setupSocketListeners();
}

function setupSocketListeners() {
  socket.on('roomCreated', (roomId) => {
    console.log('✅ Room created:', roomId);
    currentRoomId = roomId;
    isRoomHost = true;
    isMultiplayer = true;

    selectedTeamsInRoom = [];
    playersInRoom = [playerData];

    document.getElementById('roomCodeDisplay').style.display = 'block';
    document.getElementById('roomCodeValue').textContent = roomId;
    document.getElementById('enterAuctionBtn').style.display = 'block';
    showNotification(\`Room Created: \${roomId}\`, 'success');
  });

  socket.on('joinedRoom', (data) => {
    console.log('Successfully joined room:', data);
    currentRoomId = data.roomId;
    isRoomHost = false;
    isMultiplayer = true;
    selectedTeamsInRoom = data.selectedTeams || [];
    playersInRoom = data.players || [];
    
    document.getElementById('roomStatus').innerHTML = \`
      <div style="color:#4CAF50;font-weight:bold">Connected to Room: \${data.roomId}</div>
      <div style="font-size:12px;color:var(--muted)">\${playersInRoom.length} player(s) connected</div>
    \`;
    document.getElementById('enterAuctionBtn').style.display = 'block';
    showNotification(\`Joined Room: \${data.roomId}\`, 'success');
    updateTeamDropdowns();
  });

  socket.on('playerJoined', (data) => {
    console.log('Player joined room:', data);
    playersInRoom.push(data.player);

    if (currentRoomId) {
      document.getElementById('roomStatus').innerHTML = \`
        <div style="color:#4CAF50;font-weight:bold">\${isRoomHost ? 'Room' : 'Connected to Room'}: \${currentRoomId}</div>
        <div style="font-size:12px;color:var(--muted)">\${data.playerCount} player(s) connected</div>
      \`;
      document.getElementById('connectedCount').textContent = \`\${data.playerCount} player(s) connected\`;
    }
    showNotification(\`\${data.player.name || 'Player'} joined the room\`, 'info');
  });

  socket.on('playerLeft', (data) => {
    console.log('Player left room:', data);
    playersInRoom = playersInRoom.filter(p => p.socketId !== data.playerId);
    selectedTeamsInRoom = data.selectedTeams || [];

    if (currentRoomId) {
      document.getElementById('roomStatus').innerHTML = \`
        <div style="color:#4CAF50;font-weight:bold">\${isRoomHost ? 'Room' : 'Connected to Room'}: \${currentRoomId}</div>
        <div style="font-size:12px;color:var(--muted)">\${data.playerCount} player(s) connected</div>
      \`;
      document.getElementById('connectedCount').textContent = \`\${data.playerCount} player(s) connected\`;
    }
    updateTeamDropdowns();
    showNotification('A player left the room', 'info');
  });

  socket.on('joinError', (error) => {
    console.error('Join error:', error);
    showNotification(\`Error: \${error}\`, 'error');
    isMultiplayer = false;
    currentRoomId = null;
    isRoomHost = false;
  });

  socket.on('teamSelected', (data) => {
    selectedTeamsInRoom = data.selectedTeams || [];
    if (data.socketId !== socket.id) {
      const playerName = data.playerInfo?.friendName || 'Another player';
      showNotification(\`\${playerName} selected \${data.teamName}\`, 'info');
    }
    updateTeamDropdowns();
  });

  socket.on('auctionStarted', (data) => {
    if (data.teams) {
      teams = data.teams;
      currentPlayerIndex = data.gameState.currentPlayerIndex || 0;
      document.getElementById("team-selection").style.display = "none";
      auctionBlock.style.display = "grid";
      populateBidButtons();
      updateTeamsView();
      loadPlayer();
      showNotification('Auction Started!', 'success');
    }
  });

  socket.on('bidPlaced', (data) => {
    currentPrice = data.bidAmount;
    highestBidderIdx = data.teamIndex;
    currentPriceEl.textContent = currentPrice;
    highestBidderEl.textContent = data.playerName;

    countdown = NO_BID_SECONDS;
    timerEl.textContent = \`\${countdown}s\`;
    startCountdownIfNeeded();

    if (data.socketId !== socket.id) {
      showNotification(\`\${data.playerName} bid ₹\${data.bidAmount} Cr\`, 'info');
    }
  });

  socket.on('nextPlayer', (data) => {
    currentPlayerIndex = data.playerIndex;
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
  });

  socket.on('playerAssigned', (data) => {
    if (data.winningTeam && !data.skipped) {
      const teamIndex = teams.findIndex(t => t.teamName === data.winningTeam.teamName);
      if (teamIndex !== -1) {
        const playerExists = teams[teamIndex].players.some(p =>
          (typeof p === 'string' ? p : p.name) === data.player.name
        );
        if (!playerExists) {
          teams[teamIndex].players.push(data.player);
          teams[teamIndex].budget = +(teams[teamIndex].budget - data.price).toFixed(2);
          teams[teamIndex].totalPoints += data.player.points || 0;
          if (data.player.foreign) teams[teamIndex].foreignCount++;
        }
        updateTeamsView();
        updateLiveScoreboard();
      }
    }

    auctionHistory.insertAdjacentHTML(
      "afterbegin",
      data.skipped ? \`<li>❌ \${data.player.name} - UNSOLD</li>\` :
        \`<li>✅ \${data.player.name} → \${data.winningTeam.teamName} sold for ₹\${data.price} Cr</li>\`
    );
  });
}

function handleCreateRoom() {
  const name = document.getElementById('hostName').value.trim();
  if (!name) { 
    showNotification('Enter your name', 'error'); 
    return; 
  }
  
  if (!socket || !socket.connected) {
    showNotification('Connecting to server...', 'info');
    if (!socket) initializeSocket();
    setTimeout(() => {
      if (socket && socket.connected) {
        socket.emit("createRoom", { name, email: playerData?.email || '', uid: playerData?.uid || Date.now() });
      } else {
        showNotification('Connection failed - Try again', 'error');
      }
    }, 2000);
  } else {
    socket.emit("createRoom", { name, email: playerData?.email || '', uid: playerData?.uid || socket.id });
  }
}

function handleJoinRoom() {
  const name = document.getElementById('guestName').value.trim();
  const code = document.getElementById('roomCodeInput').value.trim();
  if (!name || !code) { 
    showNotification('Enter name and room code', 'error'); 
    return; 
  }
  
  if (!socket || !socket.connected) {
    showNotification('Connecting...', 'info');
    if (!socket) initializeSocket();
    setTimeout(() => {
      if (socket && socket.connected) {
        socket.emit("joinRoom", { roomId: code, userData: { name, email: playerData?.email || '', uid: playerData?.uid || Date.now() } });
      } else {
        showNotification('Connection failed - Try again', 'error');
      }
    }, 2000);
  } else {
    socket.emit("joinRoom", { roomId: code, userData: { name, email: playerData?.email || '', uid: playerData?.uid || socket.id } });
  }
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
    initializeSocket();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initializeMultiplayer();
  }, 1000);
});

// Broadcast auction state changes
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
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    const t = teams[idx];
    socket.emit('placeBid', {
      roomId: currentRoomId,
      bidAmount: currentPrice,
      teamIndex: idx,
      playerName: \`\${t.friendName} (\${t.teamName})\`
    });
  }
};

const originalAssignPlayer = assignPlayer;
assignPlayer = function (skipped) {
  const p = players[currentPlayerIndex];
  const winningTeam = highestBidderIdx !== -1 ? teams[highestBidderIdx] : null;
  const price = currentPrice;

  originalAssignPlayer(skipped);
  
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    socket.emit('playerAssigned', {
      roomId: currentRoomId,
      player: p,
      winningTeam: winningTeam,
      price: price,
      skipped: skipped
    });
  }
};

document.getElementById('startAuctionBtn')?.addEventListener('click', () => {
  if (isMultiplayer && isRoomHost && socket && socket.connected && currentRoomId) {
    socket.emit('startAuction', {
      roomId: currentRoomId,
      teams: teams
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

// Button overrides
const hostNameInput = document.getElementById('hostName');
if (hostNameInput) {
  const createBtn = document.createElement('button');
  createBtn.style.cssText = "width:100%; padding:12px; background:#f5c518; color:#111; border:none; cursor:pointer; border-radius:6px; font-weight:bold; font-size:15px;";
  createBtn.textContent = '🎯 Create Room';
  createBtn.onclick = handleCreateRoom;
  
  // Replace if previously created by Firebase script
  if (hostNameInput.nextElementSibling && hostNameInput.nextElementSibling.tagName === 'BUTTON') {
      hostNameInput.parentNode.replaceChild(createBtn, hostNameInput.nextElementSibling);
  } else {
      hostNameInput.insertAdjacentElement('afterend', createBtn);
  }
}

const roomCodeInput = document.getElementById('roomCodeInput');
if (roomCodeInput) {
  const joinBtn = document.createElement('button');
  joinBtn.style.cssText = "width:100%; padding:12px; background:#3d7fff; color:white; border:none; cursor:pointer; border-radius:6px; font-weight:bold; font-size:15px;";
  joinBtn.textContent = '🚀 Join Room';
  joinBtn.onclick = handleJoinRoom;
  
  if (roomCodeInput.nextElementSibling && roomCodeInput.nextElementSibling.tagName === 'BUTTON') {
      roomCodeInput.parentNode.replaceChild(joinBtn, roomCodeInput.nextElementSibling);
  } else {
      roomCodeInput.insertAdjacentElement('afterend', joinBtn);
  }
}

// Intercept select team logic
const oUpdateTeamsObj = window.updateTeamsObj;
window.updateTeamsObj = function() {
  if (oUpdateTeamsObj) oUpdateTeamsObj();
  
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    document.querySelectorAll('[id^="team-select-"]').forEach(sel => {
      if (sel.value) {
        socket.emit('selectTeam', {
          roomId: currentRoomId,
          teamName: sel.value,
          playerInfo: { socketId: socket.id }
        });
      }
    });
  }
};

document.getElementById('declineBtn')?.addEventListener('click', () => {
    if (isMultiplayer && isRoomHost && socket && socket.connected && currentRoomId) {
        socket.emit('nextPlayer', {
            roomId: currentRoomId,
            playerIndex: currentPlayerIndex + 1
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
console.log('Successfully reverted Ipl.js to robust Socket.io logic!');
