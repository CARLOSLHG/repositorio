// Inicializamos las variables necesarias
let images = [];          // Array donde se almacenarán las URLs de las imágenes
let currentIndex = 0;      // Índice actual de la imagen mostrada en el slider

// Función para cargar las imágenes desde el archivo JSON
async function fetchImages() {
    try {
        // Solicitamos el archivo images.json desde el mismo directorio
        const response = await fetch('images.json');
        
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        
        // Guardamos las URLs de las imágenes en el array 'images'
        images = data.images;

        // Verificamos que las imágenes se hayan cargado
        console.log("Images loaded:", images);

        // Mostramos la primera imagen del slider
        showImage();
    } catch (error) {
        // Si hay algún error, lo mostramos en la consola
        console.error("Error loading images:", error);
    }
}

// Función para mostrar la imagen actual en el slider
function showImage() {
    const imageElement = document.getElementById("slider-image");

    // Verificamos que haya imágenes cargadas antes de intentar mostrar una
    if (images.length > 0) {
        imageElement.src = images[currentIndex];
    } else {
        console.error("No images found to display.");
    }
}

// Función para mostrar la siguiente imagen
function nextImage() {
    // Actualizamos el índice de la imagen a la siguiente; si es el último, volvemos al inicio
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

// Función para mostrar la imagen anterior
function prevImage() {
    // Actualizamos el índice de la imagen a la anterior; si es la primera, volvemos al final
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

// Cargamos las imágenes cuando la página termine de cargar
window.onload = fetchImages;
