document.addEventListener('DOMContentLoaded', () => {
  const intervalInput = document.getElementById('intervalInput');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const clearNowBtn = document.getElementById('clearNowBtn');

  // Load saved interval
  chrome.storage.sync.get(['interval'], (result) => {
    intervalInput.value = result.interval || 30;
  });

  // Save interval
  saveBtn.addEventListener('click', () => {
    const minutes = parseInt(intervalInput.value, 10);
    if (minutes >= 1) {
      chrome.storage.sync.set({ interval: minutes }, () => {
        // nothing else
      });
    }
  });

  // Reset to default
  resetBtn.addEventListener('click', () => {
    intervalInput.value = 30;
    chrome.storage.sync.set({ interval: 30 });
  });

  // Manual clear now
  clearNowBtn.addEventListener('click', () => {
    chrome.browsingData.remove({ since: 0 }, { history: true });
  });
});
