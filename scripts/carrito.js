

// capturando botones y elementos a usar

const sectionCarrito = document.getElementById("contenedorTarjetasCarrito")
const icono = document.getElementById("oculta")

// definiendo las url del json (base de datos)
const API_CARRITO = 'http://localhost:3000/productosCarrito/';


// Es todo lo que se muestra cuando se pasa por encima del icono del carrito

const agregandoIcono = async() => {
    const response = await fetch('http://localhost:3000/productosCarrito');
    const data = await response.json();
    data.forEach(element => {
    icono.innerHTML += `
        <div class="tarjeta__contenedor2">


            <div id="img_car">
            <img class="contenedor_imagen2" src="${element.imagen}" alt="">
            </div>

            <div class="tarjeta__contenedor3">
            
            <div id="nombre_car">
            <h5 class="contenedor_titulo">${element.nombre}</h5>
            </div>

            <div id=categoria_car">
            <span class="contenedor_categoria">${element.categoria}</span>
            </div>

            

            <span class="contenedor_precio">${element.precio}</span>

            <span class="contenedor_disponibilidad">${element.disponibilidad}</span>
            </div>
                <button class="ver__mas">Ver Más</button>
        </div>

        `
    });
}
agregandoIcono()



// agregando productos al carrito

let cargarProductosCarrito = async(producto) =>{

    try{

        const response = await fetch(API_CARRITO, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(producto),

        });

        const data = await response.json();

    }
    catch (error){
        console.error(error);
    }
}

// eliminando productos del carrito

const eliminar = async(edpoint) =>{
    try{
        const response = await fetch(`${API_CARRITO}/${edpoint}`, {
            method: "DELETE",
        });
       
        console.log(response);
    }
    catch (error){
        console.log(error, "el error es este");
    }
}

// Nos inserta las tarjetas en la pagina de carrito
const pintandoCarrito = async (ruta) => {
    const response = await fetch(API_CARRITO);
    const data = await response.json();
    ruta.innerHTML ="";
    await data.forEach(element => {
        ruta.innerHTML += `
        <div class="tarjeta__contenedor">

        <span class="material-symbols-outlined iconoBorrar"  id="${element.id}">
            close
        </span>

          <img class="contenedor_imagen" src="${element.imagen}" alt="">

          <span class="contenedor_categoria">${element.categoria}</span>

           <h5 class="contenedor_titulo">${element.nombre}</h5>

           <span class="contenedor_precio">${element.precio}</span>

           <span class="contenedor_disponibilidad">${element.disponibilidad}</span>
        </div>
        `
    });

};
pintandoCarrito(sectionCarrito)


// se le pone precios al formulario que hay dentro de la pagina (cupon y eso) y se hace la peticion para que me traiga los valores de los precios de los productos

const definiendoPrecios = async () => {
    const response = await fetch(API_CARRITO)
    const data = await response.json()
    data.forEach((element, index) => {

        // se definen las variables que guardan los valores
        let precioSubtotal = element.precio
        precioSubtotal = precioSubtotal + element.precio
        let iva = precioSubtotal - 0.19
        let total = precioSubtotal * index

        // se guardan en el sessionStorage
        sessionStorage.setItem("subtotal", precioSubtotal)
        sessionStorage.setItem("iva", iva)
        sessionStorage.setItem("total", total)

        // se capturan los botones y eso
        const Subtotal = document.getElementById("respuesta__subtotal")
        const cupon = document.getElementById("respuesta__cupon")
        const domicilio = document.getElementById("respuesta__iva")
        const cantidadTotal = document.getElementById("respuesta__total")
        const botonRojo = document.getElementById("boton__rojo")
        const botonRetorno = document.getElementById("boton__retorno")

        // se cambia el valor del formulario de precios
        Subtotal.innerText = sessionStorage.getItem("subtotal")
        domicilio.innerText = sessionStorage.getItem("iva")
        cantidadTotal.innerText = sessionStorage.getItem("total")
        cupon.innerText = 0;

        // la funcionalidad de los botones
        botonRojo.addEventListener("click", () => {
            window.location.href="../paginas/formulario.html"
        })

        botonRetorno.addEventListener("click", () => {
            window.location.href="../index.html"
        })

    })

// borrando tarjetas

    const borrar = document.querySelectorAll(".iconoBorrar")
    borrar.forEach(element =>{
        element.addEventListener("click",() => {
            let edpoint = element.getAttribute("id")
            console.log(element.id)
             eliminar(edpoint)

        })
    })

}
definiendoPrecios()





export default cargarProductosCarrito; eliminar;