const videos = ["RYU_Car01.mp4", "KEN_Car01.mp4"];
const videoEl = document.getElementById("video");
const scoreEl = document.getElementById("score");
const playBtn = document.getElementById("playBtn");
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
  const randomScore = Math.floor(Math.random() * 9999);

  scoreEl.textContent = "0";
  videoEl.src = selected;
  videoEl.load();
  loadingEl.style.display = "block";

  // 等影片 metadata 讀取完才啟動動畫
  videoEl.onloadedmetadata = () => {
    const durationMs = videoEl.duration ? videoEl.duration * 1000 : 12000;
    animateScore(randomScore, durationMs);
    videoEl.play();
  };

  // 隱藏 loading 當影片開始播放
  videoEl.onplaying = () => {
    loadingEl.style.display = "none";
  };

  // 影片結束時，強制中斷動畫 + 顯示最終分數
  videoEl.onended = () => {
    clearInterval(intervalId); // 🛑 停止分數動畫
    scoreEl.textContent = randomScore.toLocaleString(); // ✅ 顯示正確最終分數
  };
});
