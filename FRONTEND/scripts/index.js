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
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const postProducts = async (url, product) => {
    try {
      const {data} = await axios.post(url+"favoritos", product); //desestructuración de objetos
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
                          href="#"
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
                        <a href="#">
                        <span class="material-symbols-outlined">cached</span>
                        </a>
                      </li>

                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Wishlist"
                      >
                        <a href="#" class="notifi-wishlist" data-button="btn__favorite">
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

                    <div>
                      <ul class="rating">
                        <li>
                          <i data-feather="star" class="fill"></i>
                        </li>
                        <li>
                          <i data-feather="star" class="fill"></i>
                        </li>
                        <li>
                          <i data-feather="star" class="fill"></i>
                        </li>
                        <li>
                          <i data-feather="star" class="fill"></i>
                        </li>
                        <li>
                          <i data-feather="star"></i>
                        </li>
                      </ul>
                    </div>

                    <div class="add-to-cart-box">
                      <button class="btn btn-add-cart addcart-button">
                        Add
                      </button>
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
});

document.addEventListener("click", async(event) => {
        const productos = await getProducts(URL_API);
        filterByCategory(productos, event);
});

// Add click event to save to favorites
document.addEventListener('click', async(event) => {
  const productos = await getProducts(URL_API);
  const favoritos = await getProductsFavorites(URL_API);
  console.log(favoritos)
  const productId = event.target.getAttribute("data-id")
  const buttonFavorite = event.target.getAttribute("data-button")
  if (buttonFavorite) {
      if (favoritos.find(item => item.id == productId)) {
         alert('¡ya se encuentra en favoritos!');
      } else {
        const arrayProduct = productos.find(item => item.id == productId);
        console.log(arrayProduct)
         await postProducts(URL_API, arrayProduct)
         // Mostrar notificación de SweetAlert
         alert('¡Producto agregado!');
      }
          
  }
});