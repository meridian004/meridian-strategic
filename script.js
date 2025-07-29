/* Meridian Strategic JS */

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('nav ul');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      navToggle.classList.toggle('open');
    });
  }

  // Scroll reveal animations
  const animatedElements = document.querySelectorAll('.animate');
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };
  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  animatedElements.forEach(el => observer.observe(el));

  // Counter animations for the Impact section
  const counterElements = document.querySelectorAll('.impact-number');
  if (counterElements.length) {
    const counterObserverOptions = {
      root: null,
      threshold: 0.5,
    };
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'), 10);
          let current = 0;
          // Determine step based on target size for smoother animation
          const step = Math.ceil(target / 80);
          const update = () => {
            current += step;
            if (current >= target) {
              current = target;
              element.textContent = target;
            } else {
              element.textContent = current;
              requestAnimationFrame(update);
            }
          };
          update();
          observer.unobserve(element);
        }
      });
    };
    const counterObserver = new IntersectionObserver(animateCounters, counterObserverOptions);
    counterElements.forEach(el => counterObserver.observe(el));
  }
});