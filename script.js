const videos = ["RYU_Car01.mp4", "KEN_Car01.mp4"];
const videoEl = document.getElementById("video");
const scoreEl = document.getElementById("score");
const playBtn = document.getElementById("playBtn");

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
  videoEl.play();

  // 確保 duration 有值（影片尚未加載時為 NaN）
  let durationMs = 12000;
  videoEl.onloadedmetadata = () => {
    durationMs = videoEl.duration ? videoEl.duration * 1000 : 12000;
    animateScore(randomScore, durationMs);
  };

  videoEl.onended = () => {
    clearInterval(intervalId); // ✅ 關閉動畫
    scoreEl.textContent = randomScore.toLocaleString(); // ✅ 顯示正確終值
  };
});
