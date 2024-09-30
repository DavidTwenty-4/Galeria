let currentPage = 1;
const rows = document.querySelectorAll('.row');
const totalPages = Math.ceil(rows.length / 1);

function showPage(page) {
    const startIndex = (page - 1) * 1;
    const endIndex = startIndex + 1;

    rows.forEach((row, index) => {
        if (index >= startIndex && index < endIndex) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}

function updateNavButtons() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

document.querySelector('.prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateNavButtons();
    }
});

document.querySelector('.next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateNavButtons();
    }
});

function previewImage(event) {
    const image = event.target;
    const previewContainer = document.createElement('div');
    const previewImage = document.createElement('img');
    const closeButton = document.createElement('button');

    // Estilo del contenedor de previsualización
    previewContainer.style.position = 'fixed';
    previewContainer.style.top = '0';
    previewContainer.style.left = '0';
    previewContainer.style.width = '100%';
    previewContainer.style.height = '100%';
    previewContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    previewContainer.style.display = 'flex';
    previewContainer.style.justifyContent = 'center';
    previewContainer.style.alignItems = 'center';
    previewContainer.style.zIndex = '1000';

    // Estilo de la imagen de previsualización (tamaño original, sin zoom)
    previewImage.src = image.src;
    previewImage.style.width = 'auto';
    previewImage.style.height = 'auto';
    previewImage.style.maxWidth = '90%';  // Limitar el tamaño en la pantalla
    previewImage.style.maxHeight = '90%'; // Limitar el tamaño en la pantalla

    // Botón de cerrar
    closeButton.textContent = 'Cerrar';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.padding = '8px';
    closeButton.style.fontSize = '14px';
    closeButton.style.cursor = 'pointer';

    // Agregar la imagen y el botón al contenedor
    previewContainer.appendChild(previewImage);
    previewContainer.appendChild(closeButton);
    document.body.appendChild(previewContainer);

    // Cerrar al hacer clic en el botón
    closeButton.addEventListener('click', () => {
        previewContainer.remove();
    });

    // Cerrar al hacer clic fuera de la imagen
    previewContainer.addEventListener('click', (e) => {
        if (e.target === previewContainer) {
            previewContainer.remove();
        }
    });
}

// Agregar el evento de previsualización a todas las imágenes
const images = document.querySelectorAll('.image-container img');
images.forEach(image => {
    image.addEventListener('click', previewImage);
});

showPage(currentPage);
updateNavButtons();
