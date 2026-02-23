const { io } = require("socket.io-client");

const hostSocket = io("http://localhost:3000");
let roomId = null;

hostSocket.on("connect", () => {
    console.log("Host connected with id:", hostSocket.id);
    hostSocket.emit("createRoom", { name: "HostUser", uid: "123" });
});

hostSocket.on("roomCreated", (id) => {
    console.log("Room Created:", id);
    roomId = id;

    // Now connect guest
    const guestSocket = io("http://localhost:3000");

    guestSocket.on("connect", () => {
        console.log("Guest connected with id:", guestSocket.id);
        guestSocket.emit("joinRoom", { roomId: id, userData: { name: "GuestUser", uid: "456" } });
    });

    guestSocket.on("joinedRoom", (data) => {
        console.log("Guest successfully joined room!", data.roomId);
        console.log("Players in room:", data.players.length);

        // Test complete, exit
        setTimeout(() => {
            hostSocket.disconnect();
            guestSocket.disconnect();
            process.exit(0);
        }, 1000);
    });

    guestSocket.on("joinError", (err) => {
        console.error("Guest join error:", err);
        process.exit(1);
    });
});
