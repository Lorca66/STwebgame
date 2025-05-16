
const videos = ["RYU_Car01.mp4", "KEN_Car01.mp4"];
const videoEl = document.getElementById("video");
const scoreEl = document.getElementById("score");
const playBtn = document.getElementById("playBtn");
const placeholderEl = document.getElementById("video-placeholder");
const loadingEl = document.getElementById("loading");

let intervalId = null;

function animateScore(targetScore, duration) {
  clearInterval(intervalId);
  const startTime = Date.now();
  const startScore = 0;
  intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= duration) {
      clearInterval(intervalId);
      scoreEl.textContent = targetScore.toLocaleString();
    } else {
      const progress = elapsed / duration;
      const currentScore = Math.floor(startScore + progress * targetScore);
      scoreEl.textContent = currentScore.toLocaleString();
    }
  }, 30);
}

playBtn.addEventListener("click", () => {
  const selected = videos[Math.floor(Math.random() * videos.length)];
  const randomScore = Math.floor(Math.random() * 999999999);
  scoreEl.textContent = "0";
  videoEl.src = selected;
  loadingEl.style.display = "block";
  videoEl.play();
  placeholderEl.style.display = "none";
  videoEl.onplaying = () => { loadingEl.style.display = "none"; };
  animateScore(randomScore, videoEl.duration ? videoEl.duration * 1000 : 12000);

  videoEl.onended = () => {
    scoreEl.textContent = randomScore.toLocaleString();
  };
});
