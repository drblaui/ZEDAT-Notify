var unread = 0;
//Update and announce once every 5 Minutes
//TODO: Allow user to change this delay
setInterval(() => {
	clickUpdate();
	updateUnread();
}, 300000);


function getCurrentUnread() {
	//Yes this is hardcoded, yes this will break once the webmail interface changes (as if that ever will happen)
	var messageElement = window.frames[1].document.getElementsByTagName("table")[3].getElementsByTagName("small")[0].getElementsByTagName("font")[0].textContent;
	var currUnread = messageElement.replace("(", "").split("/")[0];
	return currUnread;
}

function updateUnread() {
	if(getCurrentUnread() != unread) {
		unread = getCurrentUnread();
		if(unread != 0) {
			//Update Title
			var titleArray = document.title.split(") ");
			var title = (titleArray.length > 1) ? titleArray[1] : titleArray[0];
			document.title = "(" + unread + ") " + title;

			//Notify background to send Notification
			browser.runtime.sendMessage({"num": unread});
		}
		else {
			document.title = "ZEDAT-Webmail";
		}
	} 
}

function clickUpdate() {
	//CLICKEVENT constructs a new Event that simulates a click
	const CLICKEVENT = new MouseEvent("click", {"view": window, "bubbles": true, "cancelable": false});

	//Fire event on button
	var updateButton = window.frames[1].document.getElementsByTagName("Table")[2].getElementsByTagName("a")[0];
	updateButton.dispatchEvent(CLICKEVENT);
}
