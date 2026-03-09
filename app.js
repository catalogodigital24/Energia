document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

async function cargarProductos() {
    try {
        // Agregamos un número aleatorio al final para evitar que el navegador guarde la versión vieja (caché)
        const respuesta = await fetch('productos.json?v=' + new Date().getTime());
        const productos = await respuesta.json();
        
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = ''; 

        productos.forEach(producto => {
            // Aquí agregamos la URL de la imagen al final del mensaje de WhatsApp
            const mensaje = `Hola, me interesa el producto: ${producto.nombre} por $${producto.precio}.\n\nReferencia visual: ${producto.imagen}`;
            const enlaceWa = `https://wa.me/${producto.whatsapp}?text=${encodeURIComponent(mensaje)}`;

            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <a href="${enlaceWa}" target="_blank" class="btn-whatsapp">💬 Consultar por WhatsApp</a>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
    }
}