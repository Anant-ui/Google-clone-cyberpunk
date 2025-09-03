// === Typing Effect ===
const input = document.getElementById('searchInput');
const phrases = ["Search the future...", "Find the unknown...", "Glitch into Google...", "Hacking reality..."];
let currentPhrase = 0;
let currentChar = 0;

function typeEffect() {
  if (currentChar < phrases[currentPhrase].length) {
    input.setAttribute("placeholder", phrases[currentPhrase].substring(0, currentChar + 1));
    currentChar++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => eraseEffect(), 2000);
  }
}

function eraseEffect() {
  if (currentChar > 0) {
    input.setAttribute("placeholder", phrases[currentPhrase].substring(0, currentChar - 1));
    currentChar--;
    setTimeout(eraseEffect, 50);
  } else {
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  }
}

typeEffect();

// === Search on Enter ===
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = input.value.trim();
    if (query) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }
});

// === I'm Feeling Lucky Easter Egg ===
const luckyButton = document.querySelectorAll("button")[1];
luckyButton.addEventListener("click", () => {
  const messages = [
    "Transporting you to the Matrix...",
    "Opening a portal to Mars...",
    "Searching the multiverse...",
    "Initiating deep web search..."
  ];
  alert(messages[Math.floor(Math.random() * messages.length)]);
});

// === Canvas Particles ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const particleCount = 100;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// === Magnetic Button Hover Effect ===
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// === Cursor Orb & Trail ===
const orb = document.querySelector(".cursor-orb");
let orbX = window.innerWidth / 2;
let orbY = window.innerHeight / 2;
let mouseX = orbX;
let mouseY = orbY;

// Track mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Create a trail clone
  createTrail(mouseX, mouseY);
});

// Animate orb movement toward cursor
function animateOrb() {
  orbX += (mouseX - orbX) * 0.1;
  orbY += (mouseY - orbY) * 0.1;

  orb.style.transform = `translate(${orbX}px, ${orbY}px)`;

  requestAnimationFrame(animateOrb);
}

animateOrb();

// Create a fading trail orb
function createTrail(x, y) {
  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;

  document.body.appendChild(trail);

  // Remove after animation completes
  setTimeout(() => {
    trail.remove();
  }, 600); // match animation duration
}
