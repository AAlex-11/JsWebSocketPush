import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import WebSocket from './ws-wrapper.js'; // Import the WebSocket wrapper

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an HTTP server to serve static files
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'Frontend.htm' : req.url);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(content);
        }
    });
});

// Helper function to determine content type
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.htm':
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        default:
            return 'text/plain';
    }
}

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('A new client connected!');

    // Send a welcome message to the client
    ws.send('Welcome! You are now connected to the server.');

    // Handle messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`User says: ${message}`);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});