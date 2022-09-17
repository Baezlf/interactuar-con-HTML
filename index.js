class Manga {
    constructor(id, marca, formato, titulo, autor, stock, precio){
        this.id = id;
        this.marca = marca;
        this.formato = formato;
        this.titulo = titulo;
        this.autor = autor;
        this.stock = stock;
        this.precio = precio;
    }
    venta(cantidad){
        this.stock -= cantidad;
    }
}

const manga = [//id, marca, formato, titulo, autor, stock, precio
    new Manga(1, "ivrea", "b6 doble", "Shaman king", "Hiroyuki Takei", 30, 1700),
    new Manga(2, "ivrea", "tanko", "Chainsaw man", "Tatsuki Fujimoto", 15, 750),
    new Manga(3, "panini", "tanko", "Berserk", "Kentaro Miura", 10, 1100),
    new Manga(4, "ivrea", "b6", "Mushihime", "Masaya Hokazono", 15, 850),
    new Manga(5, "ivrea", "b6", "Alice in Borderland", "Haro Aso", 14, 1700)
];

let carrito = [];

const contenedor = document.getElementById("contenedor");
const carritoComprasHTML = document.getElementById("carrito");
const totalCompra = document.getElementById("total");
const vaciar = document.getElementById("boton-vaciar");

for(const producto of manga){
    const div = document.createElement(`div`);
    if (producto.stock > 0){
        let divHTML = `
        <div class="mostrar-productos">
            <h3 class="titulo-manga">"${producto.titulo}"</h3>
            <p>Autor: ${producto.autor}<br>
            Editorial: ${producto.marca} <br>
            Formato: ${producto.formato}<br>
            Precio: <b>$${producto.precio}</b></p>
            <button id="agregar-prod", onclick="agregarProducto(${producto.id})">Agregar al carrito</button>
        </div>
        `;
        div.innerHTML +=divHTML;
    }
    contenedor.append(div);
}

const agregarProducto = (id) => {
    let producto = manga.find((producto) => producto.id === id);
    let productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito){
        producto.cantidad++;
    } else {
        producto.cantidad = 1
        carrito.push(producto);
    }
    renderizarCarrito();
    calcularTotal();
} 

let renderizarCarrito = () =>{
    let carritoHTML = "";
    carrito.forEach((prod, id) => {
        carritoHTML += `
        <div class="prod-en-carrito">
            <h3>"${prod.titulo}"</h3>
            <p>Precio: ${prod.precio}<br>
            Cantidad: ${prod.cantidad}<br>
            <button onclick="eliminarProdCarrito(${id})">Eliminar</button>
        </div>            
        `
    });
    carritoComprasHTML.innerHTML = carritoHTML;
}

let calcularTotal = () => {
    let total = 0;

    carrito.forEach(prod => {
        total += prod.precio * prod.cantidad;
    });

    
    totalCompra.innerHTML = `<b>$${total}</b>`
}

let eliminarProdCarrito = (id) => {
    carrito[id].cantidad--;

    if(carrito[id].cantidad === 0){
        carrito.splice(id, 1);
    }
    renderizarCarrito();
    calcularTotal();
}

let vaciarCarrito = () => {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
}

vaciar.addEventListener("click", vaciarCarrito);