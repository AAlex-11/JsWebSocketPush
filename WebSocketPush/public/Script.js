// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:3000');

// Event listener for when the connection is established
ws.onopen = () => {
    console.log('Connected to the server');
};

// Event listener for when a message is received from the server
ws.onmessage = (event) => {
    const message = event.data;
    displayMessage(message);
};

// Function to send a message to the server
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    ws.send(message);
    input.value = '';
}

// Function to display messages in the messages div
function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}