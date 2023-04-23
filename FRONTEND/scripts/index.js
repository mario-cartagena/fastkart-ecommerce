// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".productContainer");

// --------------------- Funciones ------------------------
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
// Post for favorites
const postProducts = async (url, product) => {
    try {
      const {data} = await axios.post(url+"favoritos", product); //desestructuración de objetos
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

// const counterProduct = () => {
//   const addBtn = document.querySelector(".qty-right-plus");
//   const subBtn = document.querySelector(".qty-left-minus ");
//   const qtyInput = document.querySelector(".qty-input");
//   addBtn.addEventListener("click", () => {
//     qtyInput.value = parseInt(qtyInput.value)+1;
//   });
//   subBtn.addEventListener("click", () => {
//     if(qtyInput.value <=0){
//         qtyInput.value = 0;
//     }else{
//         qtyInput.value = parseInt(qtyInput.value)-1;
//     }
//   });
// }

const printProducts = (products, container) => {
  container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
        <div class="col-4 col-product">
                <div class="product-box border-row">
                  <div class="product-image">
                    <a href="product-left-thumbnail.html">
                      <img
                        src=${product.imagenURL}
                        class="img-fluid blur-up lazyload"
                        alt=${product.nombre}
                      />
                    </a>
                    <ul class="product-option">
                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View"
                      >
                        <a
                        
                          data-bs-toggle="modal"
                          data-bs-target="#view"
                        >
                        <span class="material-symbols-outlined">visibility</span>
                        </a>
                      </li>

                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Compare"
                      >
                        <a>
                        <span class="material-symbols-outlined">cached</span>
                        </a>
                      </li>

                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Wishlist"
                      >
                        <a class="notifi-wishlist">
                        <span class="material-symbols-outlined" data-id=${product.id} data-button="btn__favorite">favorite</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="product-detail">
                    <a href="product-left-thumbnail.html">
                      <h6 class="name">${product.nombre}</h6>
                    </a>

                    <h5 class="sold text-content">
                      <span class="theme-color price">$${product.precio}</span>
                    </h5>

                    <div class="product-rating mt-sm-2 mt-1">
                      <ul class="rating">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </li>
                      </ul>
                      <h6 class="theme-color">In Stock</h6>
                    </div>

                    <div class="add-to-cart-box">
                      <button  data-card="btnAddcart" data-id=${product.id} class="btn btn-add-cart addcart-button">Add</button>
                    </div>
                  </div>
                </div>
              </div>
      `;
    }); 
};

const filterByCategory = (products, event) =>{
        if(event.target.classList.contains("btn__categories")){
          const category = event.target.parentElement;
          const nameCategory = category.querySelector("a").textContent;
          const productsFilter = products.filter((elemento) =>  {
            return elemento.categoria.includes(nameCategory)
         });
          printProducts(productsFilter, containerProducts);
        }
  }

// --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const productos = await getProducts(URL_API);
  printProducts(productos, containerProducts);
  // await getProductsFavorites(URL_API);
  await getProductsCart(URL_API)
});

document.addEventListener("click", async(event) => {
  const productos = await getProducts(URL_API);
  filterByCategory(productos, event);
});

// Add click event to save to favorites
document.addEventListener('click', async(event) => {
  const productos = await getProducts(URL_API);
  const favoritos = await getProductsFavorites(URL_API);
  const productId = event.target.getAttribute("data-id")
  const buttonFavorite = event.target.getAttribute("data-button")
  console.log(buttonFavorite)
  if (buttonFavorite) {
      if (favoritos.find(item => item.id == productId)) {
        Swal.fire('¡Ya se encuentra en favoritos!', 'Tu producto ya se encuentra en tu lista de productos favoritos', 'info');
      } else {
        const arrayProduct = productos.find(item => item.id == productId);
        Swal.fire('¡Producto agregado!', 'El producto se ha agregado a tu lista de favoritos', 'success');
        await postProducts(URL_API, arrayProduct)
      }       
  }
});

// Add click event to save to shopping cart
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