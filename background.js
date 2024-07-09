// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.active) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["content.js"],
		});
	}
});
