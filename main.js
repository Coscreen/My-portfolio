const modalBtns = document.querySelectorAll('.project-btn');
const homeBtn = document.getElementById('home-btn');
const contactBtn = document.getElementById('contact-btn');
const contactSection = document.getElementById('contacts');
const projectBtn = document.getElementById('project-btn');
const projectSection = document.getElementById('projects');

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


//Défilement pour home et contact me

// Ajouter des événements de clic pour le bouton "Home"
homeBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut de l'ancre
    window.scrollTo({top : 0, behavior : 'smooth' });
});

// Ajouter des événements de clic pour le bouton "Contact me"

contactBtn.addEventListener('click', function(event) {
    event.preventDefault();
    contactSection.scrollIntoView({ behavior : 'smooth'});
});

// Ajouter des événements de clic pour le bouton "Projects"

projectBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // Calculer la position de la section et ajouter un décalage
    const offsetPosition = projectSection.getBoundingClientRect().top + window.scrollY - 99 ;
    window.scrollTo({ top : offsetPosition , behavior : 'smooth'});
});

