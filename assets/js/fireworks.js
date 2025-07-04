const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.gravity = 0.05;
    this.alpha = 1;
    this.color = color;
    this.decay = Math.random() * 0.015 + 0.01;
    this.radius = 2;
  }

  update() {
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function randomColor() {
  const colors = ['#ff0043', '#14fc56', '#1e90ff', '#ffd700', '#ff00ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFirework(x, y, shape = 'circle') {
  const color = randomColor();
  const count = 100;

  for (let i = 0; i < count; i++) {
    let angle, speed, vx, vy;

    if (shape === 'heart') {
      let t = (i / count) * Math.PI * 2;
      let r = 16 * Math.pow(Math.sin(t), 3);
      let xOffset = r * Math.cos(t);
      let yOffset = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

      vx = xOffset * 0.3;
      vy = yOffset * 0.3;
    } else {
      angle = Math.random() * 2 * Math.PI;
      speed = Math.random() * 5 + 2;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed;
    }

    particles.push(new Particle(x, y, vx, vy, color));
  }
}

function animate() {
  // light pink transparent trail to match background color
  ctx.fillStyle = 'rgba(255, 230, 240, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
  const isHeart = Math.random() > 0.5;
  createFirework(e.clientX, e.clientY, isHeart ? 'heart' : 'circle');
});

animate();
