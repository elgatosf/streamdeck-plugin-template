/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	const myAction = new Action('com.elgato.template.action');

	myAction.onKeyUp(({ action, context, device, event, payload }) => {
		console.log('Your code goes here!');
	});
});
