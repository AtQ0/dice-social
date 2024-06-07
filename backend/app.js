// Import necessary modules
const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

// Initialize Express application
const app = express();
// Create HTTP server using Express app
const server = http.createServer(app);

const io = new Server(server, {
    // Set up CORS configuration for Socket.IO server
    cors: {
        origin: "http://localhost:3001", // Allow requests from this origin
        methods: ["GET", "POST"] // Allow specified HTTP methods
    }
});
const port = 3000;

// Apply CORS middleware to Express app
app.use(cors());

// Socket.IO connection handling
io.on('connection', (socket) => {
    // Log when a client connects
    console.log(`A client with id ${socket.id} connected to the chat!`);

    // Listen for chat messages from clients and emit them to all connected clients
    socket.on('chatMessage', msg => {
        io.emit('newChatMessage', msg);
    });

    // Handle user login events
    socket.on('userLogin', username => {
        // Emit user login event to all clients
        io.emit('newUserLogin', username);

        // Update user stats for all clients
        updateUserStats(io);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected!`);
    });
});

// Function to update user stats for all clients
function updateUserStats(io) {
    // Fetch user stats from the API
    fetch('https://www.atkobabic.com/api/dice/diceplayers/')
        .then(response => response.json())
        .then(data => {
            // Emit user stats update event to all clients
            io.emit('userStatsUpdate', data);
        })
        .catch(error => {
            console.error('Error fetching user stats:', error);
        });
}

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
