const music = document.getElementById("bg-music");
const startBtn = document.getElementById("start-btn");
const toggleBtn = document.getElementById("music-toggle");

startBtn.onclick = () => {
  music.volume = 0;
  music.play().then(() => {
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.8) {
        vol += 0.02;
        music.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);

    startBtn.style.display = "none";
    toggleBtn.style.display = "inline-block";

    // First big firework
    createFirework(window.innerWidth / 2, window.innerHeight / 2, 'heart');

    // Start auto fireworks
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;
      const shape = Math.random() > 0.7 ? 'heart' : 'circle';
      createFirework(x, y, shape);
    }, 1500);
  }).catch(e => {
    alert("Autoplay blocked. Please click the page first.");
    console.error(e);
  });
};

toggleBtn.onclick = () => {
  music.muted = !music.muted;
  toggleBtn.innerText = music.muted ? "🔈 Unmute" : "🔊 Mute";
};

// Change your anniversary date here
// Format: YYYY-MM-DD
// Example: 2023-07-14
// You can change the date to your own anniversary date.
const startDate = new Date("2023-07-14");
const today = new Date();

const timeDiff = today - startDate;
const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
document.getElementById("days-counter").innerText = `💑 We have been together for ${totalDays} days!`;

function getYMD(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

const ymd = getYMD(startDate, today);
document.getElementById("ymd-counter").innerText = `⏰ That's ${ymd.years} year(s), ${ymd.months} month(s), and ${ymd.days} day(s)!`;

const nextAnniversary = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
if (nextAnniversary < today) {
  nextAnniversary.setFullYear(today.getFullYear() + 1);
}
const daysUntil = Math.ceil((nextAnniversary - today) / (1000 * 60 * 60 * 24));
document.getElementById("next-anniversary").innerText = `🎉 Only ${daysUntil} day(s) until your next anniversary! 🎈`;
