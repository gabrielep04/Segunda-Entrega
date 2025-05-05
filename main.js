//Sistema de inventario

//Array de productos
let productos = [];

cargarProductos();

//Funcion para agregar productos
function agregarProducto(id, nombre, precio, cantidad) {
    // Obtener los productos del localStorage
    const productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados) || [];
    //Se verifica que los campos no esten vacios
    if(!id || !nombre || !precio || !cantidad) {
        console.log("Todos los campos son obligatorios");
        return;
    }
    //Se verifica que el id sea unico
    const find = productos.find(productos => productos.id === id);
    if (!find) {
        const producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };
        //Se agrega el producto al array
        productos.push(producto);

        //Se guarda el array en el localStorage
        localStorage.setItem("productos", JSON.stringify(productos));
        return true;
    } else {
        console.log("El producto ya existe");
        return false
    }
}

//Funcion para eliminar productos
function eliminarProducto(id){
    //Se trae el array de productos del localStorage
    const find = localStorage.getItem("productos");
    //Parsea el array de productos
    let productos = JSON.parse(find);
    
    //Si hay productos en el localStorage se verifica que el id exista y luego se elimina
    if (productos){
        const index = productos.findIndex(producto => producto.id === id);
        
        if(index !== -1){
            localStorage.removeItem("productos");
            productos.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

//Funcion para editar productos
function editarProducto(id, nombre, precio, cantidad) {
    // Se verifica que los campos no esten vacios
    if(!id || !nombre || !precio || !cantidad) {
        console.log("Todos los campos son obligatorios");
        return;
    }
    // Obtener los productos del localStorage
    const productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados) || [];

    // Buscar el producto por ID
    const producto = productos.find(producto => producto.id === id);

    if (producto) {
            // Actualizar los valores del producto
            producto.nombre = document.getElementById("nombre-editar").value;
            producto.precio = parseFloat(document.getElementById("precio-editar").value);
            producto.cantidad = parseInt(document.getElementById("cantidad-editar").value);

            // Guardar los cambios en el localStorage
            localStorage.setItem("productos", JSON.stringify(productos));
            return true;
    } else {
        return false;
    }
}

//Se traen los botones y formularios del html
let botonAgregar = document.getElementById("boton-agregar");
let formAgregar = document.getElementById("form-agregar");
let mensajeAgregar = document.getElementById("mensaje-agregar");

//Evento para agregar productos
botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    let id = document.getElementById("id-agregar").value;
    let nombre = document.getElementById("nombre-agregar").value;
    let precio = document.getElementById("precio-agregar").value;
    let cantidad = document.getElementById("cantidad-agregar").value;

    //Se agrega el producto al array
    const resultado = agregarProducto(id, nombre, precio, cantidad);
    //Se formatea el formulario
    formAgregar.reset();
    
    //Se verifica si el producto fue agregado correctamente
    if(resultado){
        mensajeAgregar.innerText = "Producto agregado correctamente";
        mensajeAgregar.style.color = "green";
        cargarProductos();
    }
    else{
        mensajeAgregar.innerText = "El producto ya existe";
        mensajeAgregar.style.color = "red";
    }
})

//Se traen los botones y formularios del html
let botonEliminar = document.getElementById("boton-eliminar");
let formEliminar = document.getElementById("form-eliminar");
let mensajeEliminar = document.getElementById("mensaje-eliminar");

//Eveto para eliminar productos
botonEliminar.addEventListener("click", (e) => {
    e.preventDefault();
    
    let id = document.getElementById("id-eliminar").value;
    const resultado = eliminarProducto(id);
    formEliminar.reset();
    if(resultado){
        mensajeEliminar.innerText = "Producto eliminado correctamente";
        mensajeEliminar.style.color = "green";
        cargarProductos();
    }
    else{
        mensajeEliminar.innerText = "El producto no existe";
        mensajeEliminar.style.color = "red";
    }
})

//Se traen los botones y formularios del html
let buscarEditar = document.getElementById("buscar-editar");
let mensajeEditar = document.getElementById("mensaje-editar");

//Evento para buscar el producto a editar
buscarEditar.addEventListener("click", (e) => {
    e.preventDefault();
    let id = document.getElementById("id-editar").value;
    const productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados) || [];
    const producto = productos.find(producto => producto.id === id);

    //Si el producto existe se llenan los campos del formulario
    if (producto) {
        document.getElementById("nombre-editar").value = producto.nombre;
        document.getElementById("precio-editar").value = producto.precio;
        document.getElementById("cantidad-editar").value = producto.cantidad;
    } else {
        mensajeEditar.innerText = "El producto con el ID especificado no existe";
        mensajeEditar.style.color = "red";
    }
})

let botonEditar = document.getElementById("boton-editar");
let formEditar = document.getElementById("form-editar");


//Evento para editar productos
botonEditar.addEventListener("click", (e) => {
    e.preventDefault();
    let id = document.getElementById("id-editar").value;
    let nombre = document.getElementById("nombre-editar").value;
    let precio = document.getElementById("precio-editar").value;
    let cantidad = document.getElementById("cantidad-editar").value;

    const resultado = editarProducto(id, nombre, precio, cantidad);
    formEditar.reset();
    console.log(productos);
    
    if(resultado){
        mensajeEditar.innerText = "Producto editado correctamente";
        mensajeEditar.style.color = "green";
        cargarProductos();
    }
    else{
        mensajeEditar.innerText = "El producto no existe";
        mensajeEditar.style.color = "red";
    }
})

function cargarProductos() {
    // Obtener los productos del localStorage
    const productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados) || [];

    // Seleccionar el contenedor donde se mostrarán las tarjetas
    let contenedorTarjetas = document.getElementById("contenedor-productos");

    // Limpiar el contenedor antes de agregar nuevas tarjetas
    contenedorTarjetas.innerHTML = "";

    // Generar las tarjetas para cada producto
    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <h3>ID: ${producto.id}</h3>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
        `;

        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(tarjeta);
    });
}