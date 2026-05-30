// script.js - Interactive functionality for SwiftAid

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(faq => {
          faq.classList.remove('active');
          const icon = faq.querySelector('i');
          if(icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        });
        // Open clicked if not previously active
        if (!isActive) {
          item.classList.add('active');
          const icon = item.querySelector('i');
          if(icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          }
        }
      });
    }
  });

  // Simulated Notifications
  const notifications = [
    { title: "Emergency Update", text: "Ambulance dispatched to your location.", icon: "fa-ambulance" },
    { title: "System Alert", text: "Nearby hospital ICU beds updated.", icon: "fa-hospital" },
    { title: "Caregiver Sync", text: "Your emergency contacts have been notified.", icon: "fa-user-friends" }
  ];

  function createNotification() {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notif = notifications[Math.floor(Math.random() * notifications.length)];
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${notif.icon}"></i>
      </div>
      <div class="toast-content">
        <h5>${notif.title}</h5>
        <p>${notif.text}</p>
      </div>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }

  // Randomly show notifications if container exists
  if (document.getElementById('notification-container')) {
    setTimeout(createNotification, 3000); // 3 seconds after load
    setInterval(createNotification, 15000); // every 15 seconds
  }

  // Contact Form Logic
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        document.getElementById('successMessage').style.display = 'block';
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        setTimeout(() => {
          document.getElementById('successMessage').style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
