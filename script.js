// Smooth scroll to top when clicking the portfolio logo
document.querySelector('nav a[href="#"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');
let currentImageIndex = 0;
let currentImages = [];

// Close modal when clicking the close button or outside the modal
function closeImageModal() {
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Open modal with project images
function openImageModal(images, startIndex = 0) {
    currentImages = images;
    currentImageIndex = startIndex;
    updateModalImage();
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

// Update modal image
function updateModalImage() {
    modalImage.src = currentImages[currentImageIndex];
    // Update navigation buttons visibility
    prevButton.classList.toggle('invisible', currentImageIndex === 0);
    nextButton.classList.toggle('invisible', currentImageIndex === currentImages.length - 1);
}

// Navigate through images
function nextImage() {
    if (currentImageIndex < currentImages.length - 1) {
        currentImageIndex++;
        updateModalImage();
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalImage();
    }
}

// Event listeners for modal
if (closeModal) closeModal.addEventListener('click', closeImageModal);
if (prevButton) prevButton.addEventListener('click', prevImage);
if (nextButton) nextButton.addEventListener('click', nextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeImageModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeImageModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// Initialize project image viewers
document.querySelectorAll('.project-image-viewer').forEach(viewer => {
    viewer.addEventListener('click', () => {
        const images = JSON.parse(viewer.dataset.images);
        openImageModal(images);
    });
});