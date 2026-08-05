const posts = document.querySelectorAll('.post');
const links = document.querySelectorAll('.calendar-grid a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.calendar-grid a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
posts.forEach(p => observer.observe(p));
