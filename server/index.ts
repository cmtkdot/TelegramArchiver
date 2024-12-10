import express from 'express';
import session from 'express-session';
import MemoryStore from 'memorystore';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import axios from 'axios';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://localhost:8000';

// Session store setup
const MemoryStoreSession = MemoryStore(session);

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStoreSession({
    checkPeriod: 86400000
  }),
  resave: false,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// WebSocket setup
const wss = new WebSocketServer({ noServer: true });

// WebSocket connection handling
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'get_updates':
          // Send real-time updates about media processing
          break;
        
        case 'get_stats':
          const { data: stats } = await axios.get(`${API_URL}/api/stats`);
          ws.send(JSON.stringify({ type: 'stats', data: stats }));
          break;
        
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('WebSocket error:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// API Routes
app.get('/api/channels', async (req, res) => {
  try {
    const { data: channels } = await axios.get(`${API_URL}/api/channels`);
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const { data: media } = await axios.get(`${API_URL}/api/media`);
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Integrate WebSocket server with HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
