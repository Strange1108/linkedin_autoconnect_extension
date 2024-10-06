document.getElementById('start').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });

  // Send message to start the connection process
  chrome.tabs.sendMessage(tab.id, { action: 'start' });
});

document.getElementById('stop').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to stop the connection process
  chrome.tabs.sendMessage(tab.id, { action: 'stop' });
});

// Listen for messages from the content script to update the connection count
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateCount') {
    document.getElementById('connectionCount').textContent = `Connection Count: ${request.count}`;
  }
});