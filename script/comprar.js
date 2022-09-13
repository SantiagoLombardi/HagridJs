let carritoCompra = JSON.parse(localStorage.getItem("carrito")) || []
const productosComprar = document.getElementById("comprar")
let nombre = document.querySelector("#nombre")
let domicilio = document.querySelector("#domicilio")
let submit = document.querySelector("#submit")
let mensajeCompra = document.querySelector("#mensaje")
let formulario = document.querySelector("#formulario")

function productosCompra() {
    carritoCompra.map(producto => {
            productosComprar.innerHTML +=`
            <li class="prod">
                <img src="${producto.img}" alt="">
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
            </li>
            `})
}

carritoCompra.length ? productosCompra() : (    
    swal({
        title: "Lo sentimos",
        text: `Aún no agregaste productos a tu carrito.`,
        button: "Ver los productos"
}))

function comprarProd() {
    if (nombre.value !== "" && domicilio.value !== "") {
        swal({
            title: `Genial ${nombre.value}!`,
            text: `En los proximos dias habiles vas a recibir una lechuza en ${domicilio.value} con tu compra.`
        });
        setTimeout(
            function() {
                window.location.href="../index.html" 
            }, 3500
        )
    } else {
        swal({
            title: "Estas a un paso",
            text: "completa el formulario para que podamos enviarte tu compra",
            button: "Volver"
        })
    }
}

formulario.onsubmit = (e) => {
    e.preventDefault()
    comprarProd()
    formulario.reset
}