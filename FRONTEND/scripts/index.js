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
                          <i data-feather="eye"></i>
                        </a>
                      </li>

                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Compare"
                      >
                        <a href="#">
                          <i data-feather="refresh-cw"></i>
                        </a>
                      </li>

                      <li
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Wishlist"
                      >
                        <a href="#" class="notifi-wishlist">
                          <i data-feather="heart"></i>
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
          const categoria = event.target.parentElement;
          const nombreCategoria = categoria.querySelector("a").textContent;
          const productsFilter = products.filter((elemento) =>  {
            return elemento.categoria.includes(nombreCategoria)
         });
          printProducts(productsFilter, containerProducts);
        }
  }

// --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const productos = await getProducts(URL_API);
    printProducts(productos, containerProducts);
});

document.addEventListener("click", async(event) => {
        const productos = await getProducts(URL_API);
        filterByCategory(productos, event);
    });