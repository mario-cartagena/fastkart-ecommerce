// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".container-products");
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

const printProducts = (products, container) => {
    container.innerHTML = '';
      products.forEach(product => {
          container.innerHTML += `
          <div class="product-box-3 h-100">
                        <div class="product-header">
                            <div class="product-image">
                                    <img src=${product.imagenURL} class="img-fluid blur-up lazyload"
                                        alt=${product.nombre}>

                                <div class="product-header-top">
                                    <button class="btn wishlist-button close_button">
                                        <i data-feather="x"></i>
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
                                <h6 class="unit mt-1">250 ml</h6>
                                <h5 class="price">
                                    <span class="theme-color">$${product.precio}</span>
                                </h5>

                                <div class="add-to-cart-box bg-white mt-2">
                                    <button class="btn btn-add-cart addcart-button">Add
                                        <span class="add-icon bg-light-gray">
                                            <i class="fa-solid fa-plus"></i>
                                        </span>
                                    </button>
                                    <div class="cart_qty qty-box">
                                        <div class="input-group bg-white">
                                            <button type="button" class="qty-left-minus bg-gray" data-type="minus"
                                                data-field="">
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                            <input class="form-control input-number qty-input" type="text"
                                                name="quantity" value="0">
                                            <button type="button" class="qty-right-plus bg-gray" data-type="plus"
                                                data-field="">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
      }); 
  };

  // --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const productosFavoritos = await getProductsFavorites(URL_API);
    printProducts(productosFavoritos, containerProducts);
    // await getProductsFavorites(URL_API);
});

  