chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn Auto Connect Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
  // Send message to content script to start sending connection requests
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});