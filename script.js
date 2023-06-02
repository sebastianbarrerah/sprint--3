//Importando variables y funciones
import cargarProductosCarrito from "./scripts/carrito.js";
import eliminar from "./scripts/carrito.js";
import cargarProductosFavoritos from "./scripts/favoritos.js";
import eliminarFav from "./scripts/favoritos.js";



// api principal de la base de datos
const API = "http://localhost:3000/productos/"

//Capturando elementos del DOM
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let productos = [];
let productosFavoritos = [];


// pinta las tarjetas, recibe como parametro donde las quiero pintar (la ruta) en el HOME 
const cargarProductos = async (ruta) => {
    const response = await fetch(API);
    const data = await response.json();
    ruta.innerHTML ="";
    data.forEach(element => {
        ruta.innerHTML += `
        <div class="tarjeta__contenedor">
          
          <div><button  class="contenedor_favorito oculto_favorito" id="${element.id}">
          <span class="material-symbols-outlined">
          favorite</span></button></div>
          
          <img class="contenedor_imagen" src="${element.imagen}" alt="">

          <span class="contenedor_categoria">${element.categoria}</span>

           <h5 class="contenedor_titulo">${element.nombre}</h5>

           <span class="contenedor_precio">${element.precio}</span>

           <span class="contenedor_disponibilidad">${element.disponibilidad}</span>

           <button class="contenedor_botonAdd" id="${element.id}">
            <span class="textoAdd">Add</span>
            <span class="material-symbols-outlined plusTarjetas">add</span>
           </button>

        </div>
        `
    });
    
};
await cargarProductos(contenedorTarjetas);



//BOTON ADICIONAR PRODUCTOS AL CARRITO 

// funcion que agrega y lee el boton de agregar (ADD)
const agregar = () => {
    let edpoint = 0;
    const btn = document.querySelectorAll(".contenedor_botonAdd")
    btn.forEach((element, index) => {
    element.addEventListener("click", async() => {
        console.log(element.id); 
        edpoint = element.id;

        await llamarProductos("productos"); 
        productos.forEach (producto => {
            if(producto.id == edpoint){
                const productico = {
                    "categoria": producto.categoria,
                    "nombre": producto.nombre,
                    "precio": producto.precio,
                    "disponibilidad": producto.disponibilidad,
                    "imagen": producto.imagen
                }
              
                cargarProductosCarrito(productico); 
               
            }
        })

    });

}); 
}; 

// funcion principal que llama la base de datos
const llamarProductos = async (tabla) => {
    productos = [];
    const API = "http://localhost:3000/" + tabla; 
    const response = await fetch(API);
    const data = await response.json();
    data.forEach(element => {
        productos.push(element)
    })
}; 
agregar()


//BOTON ADICIONAR PRODUCTOS COMO FAVORITOS

// funcion que agrega y lee el boton de favorito (Favorito)
const agregarFav = () => {
    let edpoint = 0;
    const favorito = document.querySelectorAll(".contenedor_favorito")
    favorito.forEach((element, index) => {
    element.addEventListener("click", async() => {
        console.log(element.id); 
        edpoint = element.id;

        await llamarProductosFavoritos("productosFavoritos"); 
        productosFavoritos.forEach (productosFavoritos => {
            if(productosFavoritos.id == edpoint){
                const producticosfav = {
                    "categoria": productosFavoritos.categoria,
                    "nombre": productosFavoritos.nombre,
                    "precio": productosFavoritos.precio,
                    "disponibilidad": productosFavoritos.disponibilidad,
                    "imagen": productosFavoritos.imagen
                }
              
                cargarProductosFavoritos(producticosfav); 
               
            }
        })

    });

}); 
}; 


const llamarProductosFavoritos = async (tabla) => {
    productosFavoritos = [];
    const API = "http://localhost:3000/" + tabla; 
    const response = await fetch(API);
    const data = await response.json();
    data.forEach(element => {
        productosFavoritos.push(element)
    })
}; 
agregarFav()

export default llamarProductos; agregar; cargarProductos; productos; 
llamarProductosFavoritos; agregarFav; cargarProductosFavoritos; productosFavoritos;
 
 





    