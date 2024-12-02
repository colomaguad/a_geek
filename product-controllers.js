const BASE_URL = "https://674662b7512ddbd807fbaee8.mockapi.io/productos";

const listaProductos = async()=> {

    try {
      const respuesta = await fetch(BASE_URL);
      const datos = await respuesta.json();
      return datos;

    } catch (error) {
        console.log("error en lista de productos" , error);
    }
};

const crearProducto = async(nombre, precio, imagen)=>{
    try {
        const renponse = await fetch(BASE_URL,{
            method:"POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({nombre, precio, imagen})
        });
        const data = await renponse.json();
        return data;
    } catch (error) {
        console.log("error al crear producto: ", error)
        
    }
};

const eliminarProducto = async (id) => {
    try {
      // Realiza una solicitud DELETE para eliminar el producto
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
  
      // Si la respuesta es exitosa, devuelve la respuesta
      if (response.ok) {
        return true; // El producto fue eliminado correctamente
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  };

export const serviciosProductos = {
    listaProductos,
    crearProducto,
    eliminarProducto
};