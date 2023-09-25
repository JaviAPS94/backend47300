// let bebida;

// switch(type) {
//     case 'fanta':
//         bebida = 'Soy una bebida fanta';
//         break;
//     case 'pepsi':
//         bebida = 'Soy una bebida pepsi';
//         break;
//     case 'cocacola':
//         bebida = 'Soy una bebida cocacola';
//         break;
//     default:
//         break;
// }

// {
//     id: 1,
//     name: 'producto'
// }

// producto.id
// producto.name

//si yo quiero accecer al elemento de mi objeto de una manera dinámica
// producto[atributo]

function obtenerBebida(tipo, complemento) {
    const bebida = {
        fanta: (complemento) => {
            return `Soy una bebida fanta con ${complemento}`;
        },
        pepsi: (complemento) => {
            return `Soy una bebida pepsi con ${complemento}`;
        },
        cocacola: (complemento) => {
            return `Soy una bebida cocacola con ${complemento}`;
        },
        default: () => {
            return 'Bebida desconocida';
        }
    };

    return (bebida[tipo] || bebida['default'])(complemento);
};

const bebida = obtenerBebida('cocacola', 'hamburguesa');
console.log(bebida);