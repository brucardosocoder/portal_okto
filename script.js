// Animação de scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Atualiza a URL sem recarregar a página
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Animação de aparecimento dos elementos ao rolar
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .blog-card, .contact-item, .form-group');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Adiciona estilos iniciais para a animação
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .blog-card, .contact-item, .form-group');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Dispara a animação uma vez ao carregar
    setTimeout(animateOnScroll, 300);
    
    // Configura o observer para animar ao rolar
    window.addEventListener('scroll', animateOnScroll);
});

// Validação do formulário
const contactForm = document.querySelector('.appointment-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        const phoneInput = this.querySelector('#phone');
        
        if (!nameInput.value.trim()) {
            alert('Por favor, insira seu nome');
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
            alert('Por favor, insira um e-mail válido');
            emailInput.focus();
            return;
        }
        
        if (!phoneInput.value.trim()) {
            alert('Por favor, insira seu telefone');
            phoneInput.focus();
            return;
        }
        
        // Simulação de envio
        alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}