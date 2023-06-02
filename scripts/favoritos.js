

// capturando botones y elementos a usar
const sectionFavoritos = document.getElementById("sectionFavoritos");

// definiendo las url del json (base de datos)
const API_FAVORITO = 'http://localhost:3000/productosFavoritos/';


// agregando productos a favoritos
let cargarProductosFavoritos = async(productosFavoritos) =>{

    try{

        const response = await fetch(API_FAVORITO, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productosFavoritos),

        });

        const data = await response.json();

    }
    catch (error){
        console.error(error);
    }
    
}

// eliminando productos del carrito

const eliminarFav = async(edpoint) =>{
    try{
        const response = await fetch(`${API_FAVORITO}/${edpoint}`, {
            method: "DELETE",
        });
       
        console.log(response);
    }
    catch (error){
        console.log(error, "el error es este");
    }
}



// pinta las tarjetas, recibe como parametro donde las quiero pintar (la ruta) 
const pintandoFavoritos = async (ruta) => {
    const response = await fetch(API_FAVORITO);
    const data = await response.json();
    ruta.innerHTML ="";
    await data.forEach(element => {
        ruta.innerHTML += `
        <div class="tarjeta__contenedor">

        <span class="material-symbols-outlined equis "  id="${element.id}">
        close
        </span>
        
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
        const equis = document.querySelectorAll(".equis")
        equis.forEach(element => {
            element.addEventListener("click", () => {
                let edpoint = element.id
                console.log(edpoint);
                eliminarFav(edpoint)
            })
        })
        
    });
    
};
pintandoFavoritos(sectionFavoritos);




export default cargarProductosFavoritos;