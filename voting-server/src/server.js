import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        /* 
        ** this allows any client to connect to the socket
        ** irl, there should be authentication/security here
        */

        socket.on('action', store.dispatch.bind(store));
    })
}