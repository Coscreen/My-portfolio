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


// Redirection vers la page me quand j'appuie sur le bouton more about me

document.getElementById('redirect-btn-me').addEventListener('click', function() {
    window.location.href = './me.html';
} )

// ********************* Animations au scroll *********************

// Observer pour animer les éléments quand ils entrent dans le viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe 'animate-on-scroll'
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-item, .fun-project-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ********************* Animations des boutons *********************

// Ajouter un effet de ripple aux boutons
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Appliquer l'effet ripple aux boutons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.project-btn, .more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

// ********************* Animations spéciales pour les icônes *********************

// Animation aléatoire des icônes sociales
function randomIconAnimation() {
    const socialIcons = document.querySelectorAll('.social-links img, .social-links2 img');
    socialIcons.forEach((icon, index) => {
        // Animation aléatoire toutes les 8-15 secondes
        const randomDelay = Math.random() * 7000 + 8000; // Entre 8 et 15 secondes
        
        setTimeout(() => {
            icon.style.animation = 'bounce 0.6s ease, glow 0.6s ease';
            setTimeout(() => {
                icon.style.animation = 'glow 3s ease-in-out infinite';
                icon.style.animationDelay = `${index * 0.5}s`;
            }, 600);
        }, randomDelay);
    });
}

// Animation des icônes de projets au clic
function animateProjectIcon(icon) {
    icon.style.animation = 'wiggle 0.5s ease-in-out, bounce 0.6s ease';
    setTimeout(() => {
        icon.style.animation = 'float 5s ease-in-out infinite';
    }, 600);
}

// Animation de la photo au double-clic
function animatePhoto() {
    const photo = document.querySelector('.profile-image img');
    if (photo) {
        photo.style.animation = 'photoFloat 2s ease-in-out, wiggle 1s ease-in-out';
        setTimeout(() => {
            photo.style.animation = 'photoFloat 8s ease-in-out infinite';
        }, 2000);
    }
}

// Effet de particules au hover sur la photo
function createParticleEffect(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#48D3CE';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.animation = `particle-float ${Math.random() * 2 + 1}s ease-out forwards`;
        
        event.target.parentElement.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Démarrer les animations aléatoires des icônes
    setInterval(randomIconAnimation, 10000);
    
    // Ajouter l'animation aux icônes de projets
    const projectIcons = document.querySelectorAll('.project-icon, .project-icon2, .project-icon3');
    projectIcons.forEach(icon => {
        icon.addEventListener('click', () => animateProjectIcon(icon));
    });
    
    // Ajouter l'animation à la photo
    const photo = document.querySelector('.profile-image img');
    if (photo) {
        photo.addEventListener('dblclick', animatePhoto);
        photo.addEventListener('mousemove', createParticleEffect);
    }
});

