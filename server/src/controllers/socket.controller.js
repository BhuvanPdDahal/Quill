const realTimeChat = (socket) => {
    console.log('New client connected with id: ', socket.id);

    socket.on('join-rooms', (rooms) => {
        rooms.forEach((room) => {
            socket.join(room.chatId.toString());
            console.log(`Joined room: ${room.chatId.toString()}`);
        });
    });

    socket.on('send-message', (room, message) => {
        if(room) {
            socket.to(room).emit('receive-message', { message, chatId: room });
        }
    });
};

export default realTimeChat;