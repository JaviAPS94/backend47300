export default (io) => {
    io.on('connection', (socket) => {
        console.log('nuevo cliente conectado');

        socket.on('test', data => {
            console.log(data);
        })
    })
}