const API = "http://localhost:3000/productos/"

const paginaProductos = document.getElementById("principal__productos")

const cargarApaginaProductos = async () => {
    const response = await fetch(API);
    const data = await response.json();
    paginaProductos.innerHTML ="";
    data.forEach(element => {
        paginaProductos.innerHTML += `
        <div class="tarjeta__contenedor">

          <img class="contenedor_imagen" src="${element.imagen}" alt="">

          <span class="contenedor_categoria">${element.categoria}</span>

           <h5 class="contenedor_titulo">${element.nombre}</h5>

           <span class="contenedor_precio">${element.precio}</span>

           <span class="contenedor_disponibilidad">${element.disponibilidad}</span>

        </div>
        `
    });
};

cargarApaginaProductos()

export default cargarApaginaProductos