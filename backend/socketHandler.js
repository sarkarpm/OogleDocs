function socketHandler(io){

    let allDocs = {};

    let allSelections = {};

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

        socket.on( 'madeSelection', selectionInfo => {
            // console.log('selI before parse', selectionInfo);
            selectionInfo = JSON.parse(selectionInfo);
            // console.log('selI after parse', selectionInfo);
            if(!allSelections[selectionInfo.docId]) {
                allSelections[selectionInfo.docId] = [selectionInfo];
                // console.log('all selections after created doc', allSelections);
                console.log('here1');
            } else {
                const index = allSelections[selectionInfo.docId].findIndex( selection => {
                    console.log('selection usercolor', selection.userColor );
                    console.log('socker usercolor', socket.userColor );
                    return selection.userColor === socket.userColor;
                });
                allSelections[selectionInfo.docId].splice(index, 1, selectionInfo);



                // console.log('index', index);
                console.log('socketcolor', socket.userColor);
                // console.log('new selection info', selectionInfo);
                console.log('all selections', allSelections);
                console.log('doc selectionInfo', allSelections[selectionInfo.docId]);
            }
            allSelections[selectionInfo.docId].forEach(selection => {
                console.log('selection in for each', selection);
                socket.broadcast.to( socket.currentDoc ).emit( 'renderSelection', JSON.stringify(selection));
                console.log('broadcasted selState', selection.selectionState);
            });
        });
    });
}

function getJoinInfo(docId, allDocs) {
    let userColor = allDocs[docId].availableColors.pop();
    allDocs[docId].usedColors.push(userColor);
    if (allDocs[docId].availableColors.length === 0) {
        return { userColor: null, roomStatus: 'full'};
    } else {
        return { userColor, roomStatus: 'inBetween'};
    }

}

function getLeaveInfo(docId, allDocs, socket) {
    allDocs[docId].availableColors.push(socket.userColor);
    allDocs[docId].usedColors.splice(allDocs[docId].usedColors.indexOf(socket.userColor), 1);
    if (allDocs[docId].availableColors.length === 6) {
        return 'empty';
    } else {
        return 'inBetween';
    }
}

module.exports = {
    socketHandler
};
