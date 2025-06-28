const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainter = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const productModal = document.getElementById("product-modal");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
   
};

getProducts();
mostrarProductos(productos);

const mostrarDetalleProducto = (product) => {
    productModal.classList.remove("hidden");
    productModal.innerHTML = `
        <div class="product-modal-content">
            <span class="product-modal-close">X</span>
            <img src="${product.img}" alt="${product.nombre}" style="max-width: 100%;">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p><strong>Precio:</strong> ${product.precio} $</p>
            <button class="agregar-al-carrito-btn">Agregar al carrito</button>
        </div>
    `;

    productModal.querySelector(".product-modal-close").addEventListener("click", () => {
        productModal.classList.add("hidden");
    });

   productModal.querySelector(".agregar-al-carrito-btn").addEventListener("click", () => {
        agregarProductoAlCarrito(product);
        productModal.classList.add("hidden");
        mostrarMensaje("Producto agregado al carrito ✅");
    });
};
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito));
};

const agregarProductoAlCarrito = (product) => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
        carrito.map((prod) => {
            if (prod.id === product.id) {
                prod.cantidad++;
            }
        });
    } else {
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
            descripcion: product.descripcion,
        });
    }

    carritoCounter();
    saveLocal();

    if (modalContainter.style.display === "flex") {
    pintarCarrito();
}
};

const mostrarMensaje = (mensaje) => {
  const msg = document.createElement("div");
  msg.className = "mensaje-agregado";
  msg.innerText = mensaje;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 2000);
};

window.addEventListener("load", () => {
    const sliderContainer = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    const totalSlides = slides.length;

    function moverCarrusel() {
        currentSlide++;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        sliderContainer.style.transition = "transform 1s ease-in-out";
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;

        if (currentSlide === totalSlides - 1) {
            setTimeout(() => {
                sliderContainer.style.transition = "none";
                sliderContainer.style.transform = `translateX(0vw)`;
                currentSlide = 0;
            }, 1000);
        }
    }

    setInterval(moverCarrusel, 4000);
});

const inputBuscador = document.getElementById("buscador");

function mostrarProductos(lista) {
    shopContent.innerHTML = ""; 

    lista.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.setAttribute("data-aos", "fade-up");   
        content.setAttribute("data-aos-duration", "3000");
        content.innerHTML =  ` 
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;

        shopContent.append(content);

        content.addEventListener("click", () => {
            mostrarDetalleProducto(product);
        });

        let comprar = document.createElement("button");
        comprar.innerText = "Añadir al Carrito";
        comprar.className = "comprar";

        content.append(comprar);

        comprar.addEventListener("click", (e) => {
            e.stopPropagation();
            agregarProductoAlCarrito(product);
            mostrarMensaje("Producto agregado al carrito ✅");
        });
    });
}

inputBuscador.addEventListener("input", () => {
    const valorBusqueda = inputBuscador.value.toLowerCase().trim();

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(valorBusqueda)
    );

    document.getElementById("productos").scrollIntoView({ behavior: "smooth" });

    if (productosFiltrados.length > 0) {
        mostrarProductos(productosFiltrados);
    } else {
        mostrarProductos([]);
        const mensaje = document.createElement("div");
        mensaje.className = "mensaje-no-encontrado";
        mensaje.innerText = "Producto no encontrado :(";
        shopContent.appendChild(mensaje);
    }
});

setInterval(moverCarrusel, 4000);
JSON.parse(localStorage.getItem("carrito"));
