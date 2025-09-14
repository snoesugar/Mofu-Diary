  // === 倒數計時 ===
  let minutes = 2;
  let seconds = 59;
  const timerEl = document.querySelector(".fw-bold.text-neutral-0.fs-6"); // 找到 02:59 的 <p>

  function updateTimer() {
    // 格式化成 mm:ss
    const minText = String(minutes).padStart(2, "0");
    const secText = String(seconds).padStart(2, "0");
    timerEl.textContent = `${minText}:${secText}`;
  }

  // 每秒執行一次
  const countdown = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdown);
        // 時間到 → 跳到下一頁
        window.location.href = "https://snoesugar.github.io/Mofu-Diary/breathing-exercises-3.html";
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);

  // === 長按偵測 ===
  let pressTimer;
  function startPress() {
    pressTimer = setTimeout(() => {
      // 長按超過 3 秒 → 跳到下一頁
      window.location.href = "breathing-exercises-3.html";
    }, 3000); // 3000 毫秒 = 3 秒
  }
  function cancelPress() {
    clearTimeout(pressTimer);
  }

  // 監聽整個畫面
  document.addEventListener("mousedown", startPress);
  document.addEventListener("mouseup", cancelPress);
  document.addEventListener("mouseleave", cancelPress);

  document.addEventListener("touchstart", startPress);
  document.addEventListener("touchend", cancelPress);