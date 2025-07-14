// Select the Open button and heart container
const openBtn = document.getElementById('openBtn');
const container = document.querySelector('.heart-container');
const music = document.getElementById('bgMusic'); // Main audio element

// Function to create heart bubble
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 3) + 's';
  container.appendChild(heart);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// When user clicks the ❤️ Open button
openBtn.addEventListener('click', () => {
  // 1. Hide the button
  openBtn.style.display = 'none';

  // 2. Show heart container
  container.style.display = 'block';

  // 3. Add background animation class
  document.body.classList.add('bg-active');

  // 4. Start creating heart bubbles
  setInterval(createHeart, 300);

  // 5. Try to play music
  music.play().catch((error) => {
    console.warn('Autoplay was blocked by the browser:', error);
    alert('🎵 Please click anywhere on the page to allow the music to play.');
  });
});
