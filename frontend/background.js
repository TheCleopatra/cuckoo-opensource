chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isAuthenticated: false, lastActiveTime: null });
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.local.set({ lastActiveTime: Date.now() });
});
