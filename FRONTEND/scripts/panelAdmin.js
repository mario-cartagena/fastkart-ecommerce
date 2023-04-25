
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

const deleteProducts = async (url, id) => {
    try {
      const {data} = await axios.delete(url+"productos/"+id); //desestructuración de objetos
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
                        
                          data-bs-toggle="modal"
                          data-bs-target="#view"
                        >
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <span class="material-symbols-outlined">visibility</span>
                        </button>
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
                    <div class="product-header-top">
                                    <button class="btn wishlist-button close_button" data-delete="delete" data-id=${product.id}>
                                    <svg data-id=${product.id} data-delete="delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
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

              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">${product.nombre}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="row g-sm-4 g-2">
                    <div class="col-lg-6">
                        <div class="slider-image">
                            <img src=${product.imagenURL} class="img-fluid blur-up lazyloaded" alt="">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="right-sidebar-modal">
                            <h4 class="title-name">${product.nombre}</h4>
                            <h4 class="price">$${product.precio}</h4>
                            <div class="product-rating">
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
                                <span class="ms-2">8 Reviews</span>
                            </div>

                            <div class="product-detail">
                                <h4>Product Details :</h4>
                                <p>Candy canes sugar plum tart cotton candy chupa chups sugar plum chocolate I love.
                                    Caramels marshmallow icing dessert candy canes I love soufflé I love toffee.
                                    Marshmallow pie sweet sweet roll sesame snaps tiramisu jelly bear claw. Bonbon
                                    muffin I love carrot cake sugar plum dessert bonbon.</p>
                            </div>

                            <ul class="brand-list">
                                <li>
                                    <div class="brand-box">
                                        <h5>Brand Name:</h5>
                                        <h6>Black Forest</h6>
                                    </div>
                                </li>

                                <li>
                                    <div class="brand-box">
                                        <h5>Product Code:</h5>
                                        <h6>W0690034</h6>
                                    </div>
                                </li>

                                <li>
                                    <div class="brand-box">
                                        <h5>Product Type:</h5>
                                        <h6>White Cream Cake</h6>
                                    </div>
                                </li>
                            </ul>

                            <div class="select-size">
                                <h4>Cake Size :</h4>
                                <select class="form-select select-form-size">
                                    <option selected="">Select Size</option>
                                    <option value="1.2">1/2 KG</option>
                                    <option value="0">1 KG</option>
                                    <option value="1.5">1/5 KG</option>
                                    <option value="red">Red Roses</option>
                                    <option value="pink">With Pink Roses</option>
                                </select>
                            </div>

                            <div class="modal-button">
                                <button onclick="location.href = 'cart.html';" class="btn btn-md add-cart-button icon">Add
                                    To Cart</button>
                                <button onclick="location.href = 'product-left.html';" class="btn theme-bg-color view-button icon text-white fw-bold btn-md">
                                    View More Details</button>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
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
document.addEventListener("DOMContentLoaded", async (event) => {
    const productos = await getProducts(URL_API);
    printProducts(productos, containerProducts);
    // await getProductsFavorites(URL_API);
  });
document.addEventListener("click", async(event) => {
    const productos = await getProducts(URL_API);
    filterByCategory(productos, event);
});
  // Delete product shopping cart
document.addEventListener("click", async(event) => {
    const productId = event.target.getAttribute("data-id");
    const buttonDelete = event.target.getAttribute("data-delete")
    console.log(buttonDelete)
    if(buttonDelete=="delete"){
        await deleteProducts(URL_API, productId);
        Swal.fire('¡Producto Eliminado!', 'El producto se ha eliminado de la lista de favoritos', 'success');
    }
});