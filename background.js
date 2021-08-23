//Listen for incoming messages from content script
browser.runtime.onMessage.addListener(notify);

function notify(message) {
	//TODO: Change to multi language support maybe?
	browser.notifications.create("new-mail-alert", {
		"type": "basic",
		"title": "ZEDAT-Webmail",
		"message": "Du hast (" + message.num + ") neue Nachrichten!"
	});

	//Clear notification after 5 seconds
	//TODO: Allow user to change this delay
	setTimeout(browser.notifications.clear("new-mail-alert"), 5000);
}