import { serviciosProductos } from "/product-controllers.js";

const productContainer = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-form]");

function crear({id,nombre,precio,imagen}){

    const card = document.createElement("div");
    card.classList.add("productos-container");
    card.innerHTML = `
     <div class="imagen-container">
       <img src="${imagen}" alt="consola portatil">
        </div>

        <div class="informacion-container">
          <p>${nombre}</p>

      <div class="Precio-container">
      <p>${precio}</p>
      <button class="eliminar-button" data-id=${id} >Eliminar
                       
                       
   </button>
  </div>

      
  </div>
    `;

    return card;


    
   
};

const renderProduct = async ()=>{

    try {
       const productosLista = await serviciosProductos.listaProductos();
       productosLista.forEach((productos) => {
        const productCard = crear(productos);
        productContainer.appendChild(productCard);


       });
    } catch (error) {
       console.log("error") 
    }
};

formulario.addEventListener("submit", async(Event)=>{
    Event.preventDefault();

    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

   

     
     try {
        const nuevoProducto = await serviciosProductos.crearProducto(nombre, precio, imagen);
        const nuevocard = crear(nuevoProducto);
        productContainer.appendChild(nuevocard)
    } catch (error) {
        console.log(error)
        
    }

});

productContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("eliminar-button")) {
      const id = event.target.dataset.id;
  
      try {
        await serviciosProductos.eliminarProducto(id);
        event.target.closest(".productos-container").remove();
        console.log(`Producto con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  });
  
 

renderProduct();