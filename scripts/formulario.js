const cancelar = document.getElementById("btn1")
const comprar = document.getElementById("btn2")

cancelar.addEventListener("click", (event) => {
    event.preventDefault()
    alert("Su compra ha sido cancelada")
    window.location.href="./carrito.html"
})
comprar.addEventListener("click", (event) => {
    event.preventDefault()
    alert("Su compra ha sido exitosa")
    window.location.href="../index.html"
    
})