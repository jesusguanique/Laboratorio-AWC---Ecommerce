    const pintarCarrito = () => {
    modalContainter.innerHTML = "";
    modalContainter.style.display = "flex";
    document.body.classList.add("no-scroll");
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Tu Carrito 🛒</h1>

    `;

    modalContainter.append(modalHeader);

    const modalbutton = document.createElement("div");
    modalbutton.className = "modal-header-button";
    modalbutton.innerHTML = `
    <i class='bx bxs-x-circle' ></i>
    `;

    modalbutton.addEventListener("click", () => {
        modalContainter.style.display = "none";
        document.body.classList.remove("no-scroll");
    });

    modalHeader.append(modalbutton);



    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <i class='bx bxs-chevron-left' ></i>
        <p>Cantidad : ${product.cantidad}</p>
        <i class='bx bxs-chevron-right' ></i>
        <p class="cuenta-total">Total : ${product.cantidad * product.precio}</p>
        `;


    modalContainter.append(carritoContent);


    let restar = carritoContent.querySelector(".bxs-chevron-left");

    restar.addEventListener("click", () => {
        if(product.cantidad !== 1) {
            product.cantidad--;

        }
        saveLocal ();
        pintarCarrito();

    });

    let sumar = carritoContent.querySelector(".bxs-chevron-right");

    sumar.addEventListener("click", () => {
        if(product.cantidad !== 0) {
            product.cantidad++;

        }
        saveLocal ();
        pintarCarrito();

    });

    console.log(carrito.length);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌ ";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", () => eliminarProducto(product.id));
    });
 
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainter.append (totalBuying);


  const finalizarCompraBtn = document.createElement("button");
  finalizarCompraBtn.innerText = "Finalizar Compra";
  finalizarCompraBtn.className = "boton-finalizar-compra";

  finalizarCompraBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.clear();
    pintarCarrito();
    carritoCounter();
    modalContainter.style.display = "none";
       document.body.classList.remove("no-scroll");
    mostrarMensaje("¡Gracias por tu compra! 🎉");
});

modalContainter.append(finalizarCompraBtn);

const acciones = document.createElement("div");
acciones.className = "acciones-carrito";

const btnEliminarTodo = document.createElement("button");
btnEliminarTodo.innerText = "Eliminar productos";
btnEliminarTodo.className = "boton-eliminar-compra";

btnEliminarTodo.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    localStorage.removeItem("carritoLength");
    carritoCounter();
    pintarCarrito();

    modalContainter.style.display = "none";
document.body.classList.remove("no-scroll");

    mostrarMensaje("Has eliminado todos los productos del carrito❌");
});

acciones.append(btnEliminarTodo);
modalContainter.append(acciones);

};

verCarrito.addEventListener("click", pintarCarrito);
document.querySelector(".cantidad-carrito").addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    carrito = carrito.filter((producto) => producto.id !== id);
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter ();
