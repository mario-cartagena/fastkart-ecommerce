// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".product-box");
// --------------------- Funciones ------------------------
const getProducts = async (url) => {
    try {
      const {data} = await axios.get(url+"productos"); //desestructuración de objetos
      return data;
    } catch (error) {
      console.log(error);
    }
};

const printProducts = (products, container) => {
    products.forEach(product => {
        container.innerHTML = `
        
      `;
    });
    
  };


// --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const productos = await getProducts(URL_API);
    console.log(productos)
    printProducts(productos, containerProducts);
});