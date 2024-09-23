// Récupérer tous les boutons qui ouvrent les modals
const modalBtns = document.querySelectorAll('.project-btn');

// Fonction pour ouvrir un modal spécifique
function openModal(modalId) { 
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';

    // Initialiser le slider pour ce modal
    initializeSlider(modal);

    // Fermer le modal lorsque l'on clique sur la croix
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Fermer le modal lorsqu'on clique en dehors du contenu du modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Lier les boutons de projet avec leurs modals respectifs 
modalBtns.forEach(button => {
    button.addEventListener('click', function(e) {
        const modalId = this.getAttribute('data-modal');
        openModal(modalId);
    });
});

// ********************* Visionneur d'image (Slider) *********************

// Fonction pour initialiser le slider dans un modal spécifique
function initializeSlider(modal) {
    // Récupérer toutes les slides dans ce modal
    let slides = modal.querySelectorAll('.slide');
    let slideIndex = 1;

    // Afficher la première diapositive
    showSlides(slideIndex, slides);

    // Ajouter les événements pour les boutons "Précédent" et "Suivant" dans ce modal
    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');

    prevBtn.onclick = function() {
        plusSlides(-1, slides);
    };

    nextBtn.onclick = function() {
        plusSlides(1, slides);
    };

    // Fonction pour changer de diapositive
    function plusSlides(n, slides) {
        showSlides(slideIndex += n, slides);
    }

    // Fonction principale qui affiche les diapositives selon l'indice donné (n)
    function showSlides(n, slides) {
        if (n > slides.length) { 
            slideIndex = 1; // Si on dépasse la dernière diapositive, retourne à la première
        }

        if (n < 1) { 
            slideIndex = slides.length; // Si on est avant la première diapositive, affiche la dernière
        }

        // Masquer toutes les diapositives
        slides.forEach(slide => {
            slide.style.display = "none";
        });

        // Afficher la diapositive correspondante
        slides[slideIndex - 1].style.display = "block"; 
    }
}

// Optionnel : Fermer la modale lorsqu'on appuie sur la touche "Échap"
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});
