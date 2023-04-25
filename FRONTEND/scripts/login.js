// --------------------- Variables ------------------------
const URL_API = "http://localhost:3000/";
const containerProducts = document.querySelector(".productContainer");

// --------------------- Funciones ------------------------
const getUsers = async (url) => {
    try {
      const {data} = await axios.get(url+"usuarios"); //desestructuración de objetos
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};


const form = document.querySelector(".signin-form");
form.addEventListener("submit", async(event)=>{
    event.preventDefault();  
    const users = await getUsers(URL_API);
    const username = document.getElementById("name").value;
    console.log(username)
    const password = document.getElementById("password").value;
    console.log(password)

    const arrayUser = users.find((user)=>{
        return user.nombre == username && user.contrasena == password;
    });
    console.log(arrayUser)
    if(arrayUser){
      Swal.fire('¡Datos Correctos!', 'Bienvenido Administrador', 'success');
      window.location.href = "../pages/panelAdmin.html";
    }else{
      Swal.fire('¡Error!', '¡Ingresaste datos incorrectos!', 'error');
    }
});


// --------------------- Ejecución ------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const users = await getUsers(URL_API);
    console.log(users)
  });