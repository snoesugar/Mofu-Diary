document.querySelectorAll('.selectable').forEach(item => {
  item.addEventListener('click', () => {
    // 找到遮罩層
    const overlay = item.querySelector('.overlay');
    
    // 如果遮罩隱藏或不存在，才切換邊框
    if (!overlay || overlay.style.display === 'none' || overlay.classList.contains('invisible')) {
      item.classList.toggle('selected');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // 取得參考元素
  const lvNumberEl = document.getElementById('lv-number');
  const lvNextEl = document.querySelector('#lv-next .next-lv');
  const modalLv = document.querySelector('.modal-lv'); // 若你有 modal 裡要同步 lv 的元素

  // 目前等級（維護一個變數，方便其他 handler 讀）
  let currentLv = parseInt(lvNumberEl.dataset.lv, 10) || 1;

  // 取得所有場景（確保 HTML 的可解鎖區塊都有 class="selectable"）
  const selectables = Array.from(document.querySelectorAll('.selectable'));

  // ---------- 初始化：只做一次的事件綁定 ----------
  selectables.forEach(item => {
    // 讀取元素
    const overlayMask = item.querySelector('.overlay-mask');
    const unlockTextWrapper = item.querySelector('.unlock-text'); // 外層容器
    const unlockBtn = item.querySelector('.unlock-btn'); // button 本身（可能開 modal）
    const requireLv = parseInt(item.dataset.requireLv || 0, 10); // 默認 0 => 直接解鎖

    // 確保初始屬性存在
    if (!item.dataset.fullyUnlocked) item.dataset.fullyUnlocked = 'false';

    // Overlay 點擊處理器（只在等級已達成時，才會觸發「永久解鎖」）
    if (overlayMask) {
      overlayMask.addEventListener('click', (e) => {
        // 如果已經 fully unlocked，則剛好 overlay 應該是隱藏，不會到這裡
        // 只有當 currentLv >= requireLv 時，overlay 才會是可點的黃色遮罩
        if (currentLv >= requireLv && item.dataset.fullyUnlocked !== 'true') {
          setFullyUnlocked(item);
        }
      });
    }

    // unlock button 點擊（通常同時會開啟 modal，這裡我們也標記為 fully unlocked）
    if (unlockBtn) {
      unlockBtn.addEventListener('click', (e) => {
        // 如果你想要在按鈕打開 modal 之後才解鎖，可以在 modal 的 close 事件處理
        // 這裡我們簡單處理：按 unlockBtn 就視為使用者要解鎖（同時會開 modal）
        if (currentLv >= requireLv && item.dataset.fullyUnlocked !== 'true') {
          setFullyUnlocked(item);
        }
      });
    }
    item.addEventListener('click', () => {
      const overlay = item.querySelector('.overlay');
      // 只有解鎖後才能選
      if (!overlay || overlay.style.display === 'none' || overlay.classList.contains('invisible')) {
        // 清掉全部紅框
        selectables.forEach(el => el.classList.remove('selected'));
        // 給自己加上紅框
        item.classList.add('selected');
      }
    });
  });

  // ---------- 更新所有場景 UI 的函式（可在等級變動時呼叫） ----------
  function updateAllUI() {
    // 更新 LV 文字（外部顯示）
    lvNumberEl.textContent = `LV.${currentLv}`;
    if (lvNextEl) lvNextEl.textContent = currentLv + 1;
    if (modalLv) modalLv.textContent = `LV.${currentLv}`;

    // 針對每個場景決定顯示狀態
    selectables.forEach(item => {
      const requireLv = parseInt(item.dataset.requireLv || 0, 10);
      const lockContent = item.querySelector('.lock-content');
      const unlockTextWrapper = item.querySelector('.unlock-text');
      const overlayMask = item.querySelector('.overlay-mask');

      // 如果使用者已手動永久解鎖（點過），就保持隱藏狀態
      if (item.dataset.fullyUnlocked === 'true') {
        if (lockContent) lockContent.style.setProperty('display', 'none', 'important');
        if (unlockTextWrapper) unlockTextWrapper.style.display = 'none';
        if (overlayMask) overlayMask.style.display = 'none';
        return; // 跳過下面的顯示邏輯
      }

      // 還沒被使用者「永久解鎖」，依等級決定要不要顯示黃色解鎖 UI
      if (currentLv >= requireLv) {
        // 等級足夠 → 顯示黃色遮罩 & 解鎖按鈕，鎖圖隱藏
        if (lockContent) lockContent.style.setProperty('display', 'none', 'important');
        if (unlockTextWrapper) unlockTextWrapper.style.display = 'block';
        if (overlayMask) {
          overlayMask.classList.add('unlocked');
          overlayMask.style.display = 'block';
        }
      } else {
        // 等級不足 → 顯示黑色遮罩 & 鎖圖，隱藏解鎖按鈕
        if (lockContent) lockContent.style.display = 'flex';
        if (unlockTextWrapper) unlockTextWrapper.style.display = 'none';
        if (overlayMask) {
          overlayMask.classList.remove('unlocked');
          overlayMask.style.display = 'block';
        }
      }
    });
  }

  // ---------- 將場景標記為「使用者已完成永久解鎖」 ----------
  function setFullyUnlocked(item) {
    // 設定旗標（可用於下次 updateAllUI 時跳過）
    item.dataset.fullyUnlocked = 'true';

    // 隱藏 UI 元素（也可加動畫）
    const lockContent = item.querySelector('.lock-content');
    const unlockTextWrapper = item.querySelector('.unlock-text');
    const overlayMask = item.querySelector('.overlay-mask');

    if (lockContent) lockContent.style.setProperty('display', 'none', 'important');
    if (unlockTextWrapper) unlockTextWrapper.style.display = 'none';
    if (overlayMask) overlayMask.style.display = 'none';

    // 你可以在這裡做額外操作，例如：
    // - 發送 API 儲存使用者已解鎖（如果需要跨頁面保留）
    // - 顯示 toast 訊息
  }

  // ---------- LV 按鈕（或 LV 元素）點擊增加等級的處理 ----------
  //（你的行為：點 lvNumber 就加一級並檢查解鎖）
  lvNumberEl.addEventListener('click', () => {
    currentLv = currentLv + 1;
    lvNumberEl.dataset.lv = currentLv;
    updateAllUI();
    // 如果你想，這裡可以在到達某些等級時自動開 modal → 例如：
    // if (currentLv === 3) bootstrap.Modal.getOrCreateInstance('#unlock1').show();
  });

  // 初始執行一次（頁面載入就顯示正確的狀態）
  updateAllUI();
});
