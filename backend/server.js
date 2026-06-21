require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const http       = require('http');
const connectDB  = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { initWebSocket } = require('./utils/busTracker');

const app    = express();
const server = http.createServer(app);


connectDB();


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://safarsaathi-frontend.onrender.com'
  ],
  credentials: true
}));


app.use('/api/auth',    require('./routes/auth'));
app.use('/api/routes',  require('./routes/routes'));
app.use('/api/buses',   require('./routes/buses'));
app.use('/api/contact', require('./routes/contact'));


app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚌 SafarSaathi API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: `${req.originalUrl} not found` });
});


app.use(errorHandler);


initWebSocket(server);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server     → http://localhost:${PORT}`);
  console.log(`❤️  Health     → http://localhost:${PORT}/api/health`);
  console.log(`🔌 WebSocket  → ws://localhost:${PORT}/ws/buses`);
  console.log(`🌍 Env        → ${process.env.NODE_ENV || 'development'}\n`);
});
