let isRunning = false;
let connectionCount = 0;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendConnectionRequestsOnFirstPage() {
  console.log("Script running...");

  // Get all visible profiles on the first search results page
  const profiles = document.querySelectorAll(".reusable-search__result-container");
  console.log(`Found ${profiles.length} profiles on the first page`);

  // Loop through each profile on the first page and send connection requests
  for (let i = 0; i < profiles.length; i++) {
    if (!isRunning) {
      console.log("Stopping the connection process...");
      return; // Stop if the process has been interrupted
    }

    const profile = profiles[i];

    // Find the "Connect" button in the profile
    const connectButton = Array.from(profile.querySelectorAll("button")).find(button =>
      button.innerText.includes("Connect")
    );

    // Skip if there's a "Message" button (already connected)
    const messageButton = Array.from(profile.querySelectorAll("button")).find(button =>
      button.innerText.includes("Message")
    );

    if (connectButton && !messageButton) {
      console.log(`Sending connection request to profile ${i + 1}...`);
      connectButton.click();

      // Wait for the popup to appear (if any)
      await delay(1000); // Adjust this delay if the popup takes time to load
      const sendNowButton = document.querySelector("button[aria-label*='Send now']");

      // If a "Send now" button exists, click it
      if (sendNowButton) {
        console.log("Confirming connection request...");
        sendNowButton.click();
      }

      // After sending the request, wait before moving to the next profile
      console.log("Waiting before next request...");
      await delay(3000); // Fixed delay of 2 seconds

      // Increment connection count
      connectionCount++;

      // Send a message to the popup to update the count
      chrome.runtime.sendMessage({ action: 'updateCount', count: connectionCount });
    } else {
      console.log(`Skipping profile ${i + 1}...`);
    }
  }

  console.log("Finished sending connection requests on the first page.");
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    console.log("Starting the connection process...");
    isRunning = true;
    sendConnectionRequestsOnFirstPage();
  } else if (request.action === 'stop') {
    console.log("Stopping the connection process...");
    isRunning = false;
  }
});