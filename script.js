
const videos = ["RYU_Car01.mp4", "KEN_Car01.mp4"];
const videoEl = document.getElementById("video");
const scoreEl = document.getElementById("score");
const playBtn = document.getElementById("playBtn");
const loadingEl = document.getElementById("loading");
const placeholderEl = document.getElementById("video-placeholder");

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
  const randomScore = Math.floor(Math.random() * 10000); // ✅ 限制最大 9999

  scoreEl.textContent = "0";
  videoEl.src = selected;
  videoEl.load();
  loadingEl.style.display = "block";
  placeholderEl.style.display = "none";

  videoEl.onloadedmetadata = () => {
    const durationMs = videoEl.duration ? videoEl.duration * 1000 : 5000;
    animateScore(randomScore, durationMs);
    videoEl.play().catch((err) => {
      console.error("影片播放失敗：", err);
    });
  };

  videoEl.onplaying = () => {
    loadingEl.style.display = "none";
  };

  videoEl.onended = () => {
    clearInterval(intervalId); // ✅ 停止動畫
    scoreEl.textContent = randomScore.toLocaleString(); // ✅ 顯示最終分數
  };
});
