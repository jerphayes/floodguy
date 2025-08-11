// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Video unmute functionality
const mainVideo = document.getElementById('main-video');
const unmuteBtn = document.getElementById('unmute-btn');

if (mainVideo && unmuteBtn) {
    unmuteBtn.addEventListener('click', function() {
        if (mainVideo.muted) {
            mainVideo.muted = false;
            unmuteBtn.textContent = '🔇 Mute';
            mainVideo.play();
        } else {
            mainVideo.muted = true;
            unmuteBtn.textContent = '🔊 Unmute';
        }
    });
}

// Form submission handling
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Create email body
        const emailBody = `
New Flood Insurance Quote Request:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property Address: ${data.address}
Property Type: ${data['property-type']}

Please contact this customer for their flood insurance quote.
        `.trim();
        
        // Create mailto link
        const subject = encodeURIComponent('New Flood Insurance Quote Request');
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
    });
}

function showSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
        ">
            ✅ Quote request submitted! We'll contact you soon.
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.video-section, .quote-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Auto-play main video when in view
const mainVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            mainVideo.play();
        } else {
            mainVideo.pause();
        }
    });
}, { threshold: 0.5 });

if (mainVideo) {
    mainVideoObserver.observe(mainVideo);
}