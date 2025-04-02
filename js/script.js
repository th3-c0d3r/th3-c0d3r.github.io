// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const textArray = ["Hi there! I'm Karthikeyan M.", "Welcome to my profile :))", "Im a Backend developer mainly working in Java, Spring Boot.", "Feel free to explore and reachout to me"];
    const typingDelay = 65;
    const erasingDelay = 25;
    const initialTextDelay = 500;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            const delay = textArrayIndex === 0 ? initialTextDelay : newTextDelay;
            setTimeout(erase, delay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Modal functionality - Integrated here to fix the View details button issue
    // Get all buttons that open modals
    const modalButtons = document.querySelectorAll('.details-btn');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Add click event to each modal button
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            // Show the modal
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Add click event to each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            // Add closing animation class
            modal.classList.add('closing');
            modal.classList.remove('show');
            
            // Hide the modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
                // Re-enable scrolling on the body
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modal = event.target;
            
            // Add closing animation class
            modal.classList.add('closing');
            modal.classList.remove('show');
            
            // Hide the modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
                // Re-enable scrolling on the body
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                // Add closing animation class
                openModal.classList.add('closing');
                openModal.classList.remove('show');
                
                // Hide the modal after animation completes
                setTimeout(() => {
                    openModal.style.display = 'none';
                    openModal.classList.remove('closing');
                    // Re-enable scrolling on the body
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }
    });
    
    // Logo animation and scroll to top functionality
    const logo = document.querySelector('.logo h1');
    if (logo) {
        const originalText = logo.textContent;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        // Add click event for scroll to top
        logo.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        
        logo.addEventListener("mouseover", event => {
            let iteration = 0;
            
            clearInterval(logo.interval);
            
            logo.interval = setInterval(() => {
                logo.textContent = logo.textContent
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){ 
                    clearInterval(logo.interval);
                }
                
                iteration += 1/3;
            }, 30);
        });
    }
    
    // Smooth scrolling for navigation and CTA buttons
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle scroll to top for logo
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Handle scroll to section for other links
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const themeLabel = document.querySelector('.theme-label');
    const themeNotification = document.querySelector('.theme-notification');
    const notificationText = themeNotification ? themeNotification.querySelector('p') : null;
    const closeNotification = themeNotification ? themeNotification.querySelector('.close-notification') : null;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';

    // Theme switch event
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (notificationText) notificationText.textContent = '👀';
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (notificationText) notificationText.textContent = '🕶️';
        }
        
        // Show notification
        if (themeNotification) {
            themeNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                themeNotification.classList.remove('show');
            }, 3000);
        }
    });
    
    // Close notification when clicking the close button
    if (closeNotification) {
        closeNotification.addEventListener('click', () => {
            themeNotification.classList.remove('show');
        });
    }
});

// Add this code at the end of the DOMContentLoaded event listener
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav(); // Initial call to set active state


// Theme toggle functionality
const themeSwitch = document.getElementById('theme-switch');
const themeLabel = document.querySelector('.theme-label');
const themeNotification = document.querySelector('.theme-notification');
const notificationText = themeNotification ? themeNotification.querySelector('p') : null;
const closeNotification = themeNotification ? themeNotification.querySelector('.close-notification') : null;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference

// Apply saved theme
document.documentElement.setAttribute('data-theme', savedTheme);
themeSwitch.checked = savedTheme === 'dark';

// Theme switch event
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (notificationText) notificationText.textContent = '🌑';
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (notificationText) notificationText.textContent = '☀️';
    }
    
    // Show notification
    if (themeNotification) {
        themeNotification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            themeNotification.classList.remove('show');
        }, 3000);
    }
});

// Close notification when clicking the close button
if (closeNotification) {
    closeNotification.addEventListener('click', () => {
        themeNotification.classList.remove('show');
    });
}

function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav(); // Initial call to set active state


// Modal functionality is now integrated into the main DOMContentLoaded event listener at the top of this file