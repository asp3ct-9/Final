// Typing Animation
const typedText = document.getElementById("typed");
const words = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Java", "Python"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 150, deletingSpeed = 100, pauseBetweenWords = 1200;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, pauseBetweenWords);
      return;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();

// Theme Toggle Script
const toggle = document.getElementById('toggle-theme');
const themeLink = document.getElementById('theme-style');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark.css') {
  themeLink.href = 'dark.css';
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    themeLink.href = 'dark.css';
    localStorage.setItem('theme', 'dark.css');
  } else {
    themeLink.href = 'light.css';
    localStorage.setItem('theme', 'light.css');
  }
});

// Achievement Section Animation
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circles = entry.target.querySelectorAll(".circle");
      circles.forEach(circle => {
        const progress = circle.querySelector(".progress");
        const number = circle.querySelector(".number");
        const target = +circle.getAttribute("data-target");
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        progress.style.strokeDasharray = `${circumference}`;
        progress.style.strokeDashoffset = `${circumference}`;
        const offset = circumference * (1 - target / 100);
        progress.style.strokeDashoffset = offset;

        let count = 0;
        const step = Math.ceil(target / 60);
        const update = () => {
          if (count < target) {
            count += step;
            number.textContent = count > target ? target : count;
            requestAnimationFrame(update);
          } else {
            number.textContent = target;
          }
        };
        update();
      });

      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const section = document.querySelector('.achievements-section');
if (section) observer.observe(section);

// Gallery Fullscreen Click
document.querySelectorAll('.media').forEach(media => {
  media.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (media.requestFullscreen) {
        media.requestFullscreen();
      } else if (media.webkitRequestFullscreen) {
        media.webkitRequestFullscreen();
      } else if (media.msRequestFullscreen) {
        media.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
});
