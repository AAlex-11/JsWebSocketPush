import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import the 'ws' library using CommonJS require
const WebSocket = require('ws');

// Export the WebSocket class
export default WebSocket;