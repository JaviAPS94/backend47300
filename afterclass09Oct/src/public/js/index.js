const socket = io();

const container = document.getElementById('container');

socket.emit('test', 'Hola usando sockets en otro módulo');

socket.on('show-products', data => {
    container.innerHTML = '';

    data.forEach(product => {
        container.innerHTML += `
            <ul>
                <l1>Title: ${product.title}</li>
                <l1>Description: ${product.description}</li>
                <l1>Price: ${product.price}</li>
                <l1>Id: ${product.id}</li>
            </ul>
        `
    });
})