document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

async function cargarProductos() {
    try {
        // En GitHub Pages, esto buscará el archivo en tu mismo repositorio
        const respuesta = await fetch('productos.json');
        const productos = await respuesta.json();
        
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = ''; // Limpiamos antes de renderizar

        productos.forEach(producto => {
            // Construimos el mensaje predeterminado para WhatsApp
            const mensaje = `Hola, me interesa el producto: ${producto.nombre} por $${producto.precio}.`;
            const enlaceWa = `https://wa.me/${producto.whatsapp}?text=${encodeURIComponent(mensaje)}`;

            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <a href="${enlaceWa}" target="_blank" class="btn-whatsapp">Comprar por WhatsApp</a>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
    }
}