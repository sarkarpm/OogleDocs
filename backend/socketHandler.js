function socketHandler(io){

    io.on('connection', socket => {
        console.log('listening in socket...');

        socket.on('login', loginInfo => {
            socket.username = JSON.parse(loginInfo).username;
            socket.userId = JSON.parse(loginInfo).userId;
            // console.log('username in socket', socket.username );
            // console.log('userId in socket', socket.userId );
        });

        socket.on('joinedDocument', newDocId => {
            if (socket.currentDoc) {
                socket.leave(socket.currentDoc);
            }
            socket.currentDoc = String(newDocId);
            socket.join(newDocId);
            socket.to(socket.currentDoc).emit('message', `${socket.username} has joined the doc.`);
            console.log('user accessing doc', socket.username );
            console.log('docId in socket', socket.currentDoc );
        });

        socket.on('leftDocument', docId => {
            socket.to(socket.currentDoc).emit('message', `${socket.username} has left the doc.`);
            if (socket.currentDoc) {
                socket.leave(socket.currentDoc);
            }
            socket.currentDoc = null;
            console.log('user left doc', socket.username );
        });

        socket.on('madeChange', changedDoc => {
            socket.changedDoc = changedDoc;
            socket.to(socket.currentDoc).emit('changeListener', changedDoc);
        });
    });
}

module.exports = {
    socketHandler
};
