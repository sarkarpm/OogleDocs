function socketHandler(io){

    let allDocs = {};

    io.on('connection', socket => {
        console.log( 'listening in socket...' );

        socket.on( 'login', loginInfo => {
            socket.username = JSON.parse( loginInfo ).username;
            socket.mongoId = JSON.parse( loginInfo ).userId;
            socket.emit('login', `you are logged in, username: ${ socket.username } mongoID: ${ socket.mongoId }`);
        });

        socket.on( 'joinDocument', docId => {
            socket.join( docId );
            if (!allDocs[docId]) {
                allDocs[docId] = {
                    availableColors: ['Yellow', 'Purple', 'Blue', 'Orange', 'Green', 'Red'],
                    usedColors: [],
                    currentState: null
                };
            }
            let joinInfo = getJoinInfo(docId, allDocs);
            socket.userColor = joinInfo.userColor;
            if (joinInfo.roomStatus !== 'full') {
                socket.currentDoc = docId;
                socket.emit('userColor', joinInfo.userColor);
                socket.emit('currentState', allDocs[socket.currentDoc].currentState);
            }
            io.to( docId ).emit('roomStatus', joinInfo.roomStatus);
            // console.log('join info', joinInfo);
            // console.log('allDocs on join', allDocs);
        });

        socket.on( 'leaveDocument', docId => {
            socket.leave( docId );
            let roomStatus = getLeaveInfo(docId, allDocs, socket);
            io.to( docId ).emit('roomInfo', roomStatus);
        });

        socket.on( 'madeChange', changedDoc => {
            allDocs[socket.currentDoc].currentState = changedDoc;
            socket.to( socket.currentDoc ).emit( 'changeListener', changedDoc );
        });

        socket.on( 'madeSelection', ranges => {
            ranges = JSON.parse(ranges);
            const newSelection = {
                ranges,
                userColor: socket.userColor
            };
            // console.log('newSelection', newSelection);
            socket.broadcast.to( socket.currentDoc ).emit( 'renderSelection', newSelection);
        });
    });
}

function getJoinInfo(docId, allDocs) {
    let userColor = allDocs[docId].availableColors.pop();
    allDocs[docId].usedColors.push(userColor);
    if (allDocs[docId].availableColors.length === 0) {
        console.log('full in getJoinInfo!');
        console.log('docId in getJoinInfo', docId);
        console.log('allDocs in getJoinInfo', allDocs);
        console.log('docInfo in getJoinInfo', allDocs[docId]);
        return { userColor: null, roomStatus: 'full'};
    } else {
        console.log('inBetween in getJoinInfo!!');
        console.log('docId in getJoinInfo', docId);
        console.log('allDocs in getJoinInfo', allDocs);
        console.log('docInfo in getJoinInfo', allDocs[docId]);
        return { userColor, roomStatus: 'inBetween'};
    }

}

function getLeaveInfo(docId, allDocs, socket) {
    allDocs[docId].availableColors.push(socket.userColor);
    allDocs[docId].usedColors.splice(allDocs[docId].usedColors.indexOf(socket.userColor), 1);
    if (allDocs[docId].availableColors.length === 6) {
        console.log('empty in getLeaveInfo!');
        console.log('docId in getLeaveInfo', docId);
        console.log('allDocs in getLeaveInfo', allDocs);
        console.log('docInfo in getLeaveInfo', allDocs[docId]);
        return 'empty';
    } else {
        console.log('inBetween in getLeaveInfo!');
        console.log('docId in getLeaveInfo', docId);
        console.log('allDocs in getLeaveInfo', allDocs);
        console.log('docInfo in getLeaveInfo', allDocs[docId]);
        return 'inBetween';
    }
}

module.exports = {
    socketHandler
};
