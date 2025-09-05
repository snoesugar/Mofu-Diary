    // 倒數計時
    let countdownNum = 3; // 初始數字
    const countdownEl = document.getElementById("countdown");

    const timer = setInterval(() => {
    countdownNum--; // 每次減 1
    countdownEl.textContent = countdownNum; // 更新畫面

    if (countdownNum <= 0) {
        clearInterval(timer); // 停止計時器
        window.location.href = "breathing-exercises-2.html"; // 跳轉到下一頁
    }
    }, 1000); // 每 1 秒執行一次