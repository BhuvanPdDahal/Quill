// LIBRARY IMPORTS
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

// LOCAL IMPORTS
import './src/mongodb/connection.js';
import userRouter from './src/routes/user.routes.js';
import chatRouter from './src/routes/chat.routes.js';
import realTimeChat from './src/controllers/socket.controller.js';

// CONFIGURATIONS
dotenv.config();

// VARIABLES
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
});
const port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
io.on('connection', realTimeChat);
app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);

// SERVER
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});