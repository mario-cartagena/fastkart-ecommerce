// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".container-products");

const getProducts = async (url) => {
    try {
      const {data} = await axios.get(url+"productos"); //desestructuración de objetos
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};
const getProductsFavorites = async (url) => {
    try {
      const {data} = await axios.get(url+"favoritos"); //desestructuración de objetos
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};
const getProductsCart = async (url) => {
    try {
      const {data} = await axios.get(url+"carrito"); //desestructuración de objetos
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
const deleteProductsFavorites = async (url, id) => {
    try {
      const {data} = await axios.delete(url+"favoritos/"+id); //desestructuración de objetos
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};
// Post for cart
const postProductsCart = async (url, product) => {
    try {
      const {data} = await axios.post(url+"carrito", product); //desestructuración de objetos
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

const printProducts = (products, container) => {  
    container.innerHTML = '';
      products.forEach(product => {
          container.innerHTML += `
          <div class="col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain">
          <div class="product-box-3 h-100">
                        <div class="product-header">
                            <div class="product-image">
                                    <img src=${product.imagenURL} class="img-fluid blur-up lazyload"
                                        alt=${product.nombre}>

                                <div class="product-header-top">
                                    <button class="btn wishlist-button close_button" data-button="delete" data-id=${product.id}>
                                    <svg data-id=${product.id} data-button="delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="product-footer">
                            <div class="product-detail">
                                <span class="span-name">${product.categoria}</span>
                                <a href="product-left-thumbnail.html">
                                    <h5 class="name">${product.nombre}</h5>
                                </a>
                                <h6 class="unit mt-1">${product.contenidoNeto} ${product.peso}</h6>
                                <h5 class="price">
                                    <span class="theme-color">$${product.precio}</span>
                                </h5>

                                <div class="add-to-cart-box bg-white mt-2">
                                    <button data-card="btnAddcart" data-id=${product.id} class="btn btn-add-cart addcart-button">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        `;
      }); 
  };

 const counterProduct = () => {
    const addBtn = document.querySelector(".qty-right-plus")
    const subBtn = document.querySelector(".qty-left-minus ")
    const qtyInput = document.querySelector(".qty-input")
     addBtn.addEventListener("click", () => {
       qtyInput.value = parseInt(qtyInput.value)+1;
     });
     subBtn.addEventListener("click", () => {
       if(qtyInput.value <=0){
           qtyInput.value = 0;
       }else{
           qtyInput.value = parseInt(qtyInput.value)-1;
       }
     });
 }

  // --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const productosFavoritos = await getProductsFavorites(URL_API);
    printProducts(productosFavoritos, containerProducts);
});

// Delete products favorites
document.addEventListener("click", async(event) => {
    const productId = event.target.getAttribute("data-id");
    const buttonDelete = event.target.getAttribute("data-button")
    if(buttonDelete){
        await deleteProductsFavorites(URL_API, productId);
        Swal.fire('¡Producto Eliminado!', 'El producto se ha eliminado de la lista de favoritos', 'success');

    }
});
//  Add product shopping cart
document.addEventListener("click", async(event) => {
    const productos = await getProducts(URL_API);
    const carrito = await getProductsCart(URL_API);
    const productId = event.target.getAttribute("data-id");
    const buttonCart = event.target.getAttribute("data-card");
    if(buttonCart){
      if (carrito.find(item => item.id == productId)) {
        Swal.fire('¡Ya se encuentra en el carrito de compras!', 'Tu producto ya se encuentra en tu carrito de compras', 'info');
      } else {
        const arrayProduct = productos.find(item => item.id == productId);
        Swal.fire('¡Producto agregado al carrito!', 'El producto se ha agregado al carrito de compras', 'success');
        await postProductsCart(URL_API, arrayProduct)
      }
    }
  });

  