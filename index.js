AOS.init();
let productosDiv = document.getElementById("productos");
const home = document.querySelector("#home")
let toastDiv = document.querySelector("#containerToast")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let btnFinales = document.querySelectorAll(".btnFinales")
let botonesCarrito = document.querySelector(".botonesCarrito")
let botonDeFiltracion = document.querySelectorAll("button.filtro")
let botonAgregar = document.querySelectorAll(".agregar")
const carritoDiv = document.querySelector("#carrito")
const carritoSection = document.querySelector("#carritoSection")
const vaciar = document.querySelector("#vaciar")

function verProductos(array){
    array.forEach(producto => {
        productosDiv.innerHTML += `
        <div class="card producto" data-aos="zoom-in">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}.</p>
                <p>$${producto.precio}</p>
                <button href="#" id="${producto.id}" class="btn btn-dark  agregar">Añadir al carrito</button>
            </div>
        </div>`
    })
};

verProductos(productos);

function filtrar(e){
    let boton = e.target
    console.log(boton)
    let categoria = boton.innerText
    let productosFiltrados = productos.filter(producto => producto.casa === categoria.toLowerCase())
    productosDiv.innerHTML = ""
    verProductos(productosFiltrados)
};

for (const boton of botonDeFiltracion) {
    boton.addEventListener("click", filtrar)
};

home.addEventListener("click", () => {
    productosDiv.innerHTML = "";
    verProductos(productos);
});

function agregarAlCarrito(e) {
    carritoDiv.innerHTML = ""
    const boton = e.target;
    const botonId = boton.getAttribute("id");
    let productoSeleccionado = productos.find(producto => producto.id === botonId)
    carrito.push(productoSeleccionado)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    swal({
        title: "Genial!",
        text: `Agregaste ${productoSeleccionado.nombre} al carrito.`,
        button: "Continuar comprando",
    });
    verCarrito()
};

for (const boton of botonAgregar) {
    boton.addEventListener("click", agregarAlCarrito)
}

function verCarrito() {
    carrito.forEach(producto =>{
        carritoDiv.innerHTML += `
        <div class="productoCarrito">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button class="borrar" id="btnBorrar${producto.id}">X</button>
        </div>`
    })
    let total = carrito.reduce((acc, curr) => acc + parseInt(curr.precio), 0)
    let compraTotal = document.createElement("p")
    compraTotal.setAttribute("class", "total")
    compraTotal.innerText = (`Total: $${total}`)
    carritoDiv.appendChild(compraTotal)
    let btnBorrar = document.querySelectorAll(".borrar")
    for (boton of btnBorrar) {
        boton.addEventListener("click", eliminarProducto)
    }
    vaciar.addEventListener("click", () => {
        carrito = []
        localStorage.clear()
        carritoDiv.innerHTML = ""
    })
    let comprar = document.createElement("button")
    comprar.setAttribute("class", "comprar")
    comprar.setAttribute("class", "btn")
    comprar.innerHTML=("Comprar")
    carritoDiv.append(comprar)
    comprar.addEventListener("click", () => {
        window.location.href="./secciones/comprar.html"
    })
};

function eliminarProducto(e) {
    carritoDiv.innerHTML = ""
    const btnBorrar = e.target
    const btnBorrarId = `btnBorrar${btnBorrar.getAttribute("id")}`
    let indexProducto = carrito.findIndex(producto => producto.id === btnBorrarId)
    carrito.splice(indexProducto, 1)
    localStorage.removeItem("carrito", JSON.stringify(carrito))
    verCarrito(carrito)
};