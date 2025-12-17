// Auto-fix all image paths in Ipl.js
function fixImagePaths() {
    // Update all player image paths from IPL_auction/assests/ to assets/
    players.forEach(player => {
        if (player.pic && player.pic.includes('IPL_auction/assests/')) {
            player.pic = player.pic.replace('IPL_auction/assests/', 'assets/');
        }
    });
    
    // Update team logos
    Object.keys(TEAM_LOGOS).forEach(team => {
        if (TEAM_LOGOS[team].includes('IPL_auction/assests/')) {
            TEAM_LOGOS[team] = TEAM_LOGOS[team].replace('IPL_auction/assests/', 'assets/');
        }
    });
    
    console.log('✅ All image paths fixed to use assets/ folder');
}

// Run the fix when page loads
document.addEventListener('DOMContentLoaded', fixImagePaths);