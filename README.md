# LinkedIn Auto Connect Chrome Extension

This Chrome extension automates the process of sending connection requests to profiles listed in LinkedIn search results. It scans the search results and clicks the **Connect** button for each profile while avoiding profiles that are already connected (i.e., those with the **Message** button).

## Features

- Automatically sends connection requests to profiles in LinkedIn search results.
- Skips profiles that are already connected.
- Displays the count of sent connection requests.
- Allows users to start and stop the connection process from a popup interface.

## Prerequisites

- Google Chrome Browser
- LinkedIn Account (logged in)

## Installation & Setup

### Step 1: Download the Extension

Download this repository as a .zip file and extract it, or clone the repository using:

```bash
git clone <repository-url>
```

### Step 2: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** by toggling the switch on the top-right corner.
3. Click on the **Load unpacked** button.
4. Select the folder where you downloaded/cloned this repository.
5. The extension will now be added to Chrome, and you'll see the LinkedIn Auto Connect icon in the toolbar.

### Step 3: Open LinkedIn and Start Using the Extension

1. Open LinkedIn and navigate to the search results page where you want to send connection requests.
2. Click the LinkedIn Auto Connect extension icon in the Chrome toolbar.
3. In the popup, you will see two buttons:
   - **Start Connecting**: Initiates the process of sending connection requests.
   - **Stop Connecting**: Stops the process at any time.
4. The popup will display the total number of connection requests sent.

## How the Extension Works

### content.js
- **Functionality**: This script runs on LinkedIn pages and looks for profiles in the search results. It:
  - Sends connection requests by clicking the Connect button.
  - Waits for a short delay between actions to avoid detection.
  - Updates the connection count displayed in the popup.

### background.js
- **Functionality**: Handles the lifecycle events of the extension, including:
  - Listening for action clicks to execute the content script.
  - Managing the extension’s background processes.

### popup.html & popup.js
- **Functionality**: Provides a user interface for the extension in the Chrome toolbar, which includes:
  - Buttons to start and stop the connection process.
  - Display of the number of requests sent.

## Permissions

The following permissions are requested in the `manifest.json` file:

- **activeTab**: Allows the extension to interact with the currently active tab.
- **scripting**: Enables the extension to execute the content script on LinkedIn pages.
- **tabs**: Grants access to manage and communicate with browser tabs.

## How to Modify

If you want to adjust delays or add additional features, you can modify the `content.js` file. For example:
- Change the delay between sending requests by modifying the line:
  ```javascript
  await delay(3000);
