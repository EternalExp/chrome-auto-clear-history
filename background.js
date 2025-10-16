const ALARM_NAME = 'autoClearHistory';

// Function to schedule alarm based on stored interval
function scheduleAlarm() {
  chrome.storage.sync.get(['interval'], (result) => {
    const minutes = result.interval || 30;
    chrome.alarms.create(ALARM_NAME, { periodInMinutes: minutes });
  });
}

// Clear all history
function clearHistory() {
  chrome.browsingData.remove({ since: 0 }, { history: true });
}

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) clearHistory();
});

// Listen for interval changes to reschedule
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.interval) scheduleAlarm();
});

// Startup
chrome.runtime.onStartup.addListener(() => {
  setTimeout(clearHistory, 3000); // delay 3 seconds
  scheduleAlarm();
});

// Installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['interval'], (result) => {
    if (!result.interval) chrome.storage.sync.set({ interval: 30 });
    scheduleAlarm();
  });
});
