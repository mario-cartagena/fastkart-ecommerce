// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".container-products");

const getProducts = async (url) => {
    try {
      const {data} = await axios.get(url+"carrito");
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};
const deleteProductsCart = async (url, id) => {
    try {
      const {data} = await axios.delete(url+"carrito/"+id); //desestructuración de objetos
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};

const counterProduct = () => {
    let cantidad = 0;
    const addBtn = document.querySelector(".qty-right-plus")
    const subBtn = document.querySelector(".qty-left-minus ")
    const qtyInput = document.querySelector(".qty-input")
     addBtn.addEventListener("click", () => {
       qtyInput.value = parseInt(qtyInput.value)+1;
       cantidad++;
     });
     subBtn.addEventListener("click", () => {
       if(qtyInput.value <=0){
           qtyInput.value = 0;
       }else{
           qtyInput.value = parseInt(qtyInput.value)-1;
       }
     });
 }

const printProducts = (products, container) => {
    container.innerHTML = '';
      products.forEach(product => {
          container.innerHTML += `
          <div class="col-xxl-9">
                    <div class="cart-table">
                        <div class="table-responsive-xl">
                            <table class="table">
                                <tbody>
                                    <tr class="product-box-contain">
                                        <td class="product-detail">
                                            <div class="product border-0">
                                                <a href="product-left-thumbnail.html" class="product-image">
                                                    <img src=${product.imagenURL}
                                                        class="img-fluid blur-up lazyload" alt=${product.nombre}>
                                                </a>
                                                <div class="product-detail">
                                                    <ul>
                                                        <li class="name">
                                                            <a href="product-left-thumbnail.html">${product.nombre}</a>
                                                        </li>

                                                        <li class="text-content"><span class="text-title">Sold
                                                                By:</span> Fresho</li>

                                                        <li class="text-content"><span
                                                                class="text-title">Quantity</span> - ${product.contenidoNeto} ${product.peso}
                                                        </li>
                                                        <li class="text-content"><span
                                                                class="text-title">Cantidad</span> - 0
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="price">
                                            <h4 class="table-title text-content">Price</h4>
                                            <h5>$${product.precio} <del class="text-content">$45.68</del></h5>
                                            <h6 class="theme-color">You Save : $20.68</h6>
                                        </td>

                                        <td class="quantity">
                                            <h4 class="table-title text-content">Qty</h4>
                                            <div class="quantity-price">
                                                <div class="cart_qty">
                                                    <div class="input-group">
                                                        <button type="button" class="btn qty-left-minus"
                                                            data-type="minus" data-field="">
                                                            <i class="fa fa-minus ms-0" aria-hidden="true"></i>
                                                        </button>
                                                        <input class="form-control input-number qty-input" type="text"
                                                            name="quantity" value="0">
                                                        <button type="button" class="btn qty-right-plus"
                                                            data-type="plus" data-field="">
                                                            <i class="fa fa-plus ms-0" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="subtotal">
                                            <h4 class="table-title text-content">Total</h4>
                                            <h5>$35.10</h5>
                                        </td>

                                        <td class="save-remove">
                                            <h4 class="table-title text-content">Action</h4>
                                            <a class="save notifi-wishlist" href="javascript:void(0)">Save for later</a>
                                            <a class="remove close_button" href="javascript:void(0)" data-id=${product.id} data-button="delete">Remove</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        `;
      }); 
  };

    // --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const productsCart = await getProducts(URL_API);
    printProducts(productsCart, containerProducts);
    counterProduct();
});

// Delete product shopping cart
document.addEventListener("click", async(event) => {
    const productId = event.target.getAttribute("data-id");
    const buttonDelete = event.target.getAttribute("data-button")
    if(buttonDelete){
        await deleteProductsCart(URL_API, productId);
        Swal.fire('¡Producto Eliminado!', 'El producto se ha eliminado de la lista de favoritos', 'success');
    }
});