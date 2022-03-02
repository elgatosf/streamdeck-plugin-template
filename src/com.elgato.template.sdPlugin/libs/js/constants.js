/**
 * Errors Receieved from WebSocket
 * @type {{"1000": string, "1011": string, "1010": string, "0": string, "1008": string, "1": string, "1007": string, "2": string, "1006": string, "3": string, "1005": string, "1004": string, "1015": string, "1003": string, "1002": string, "1001": string, "1009": string}}
 */
const SocketErrors = {
	0: 'The connection has not yet been established',
	1: 'The connection is established and communication is possible',
	2: 'The connection is going through the closing handshake',
	3: 'The connection has been closed or could not be opened',
	1000: 'Normal Closure. The purpose for which the connection was established has been fulfilled.',
	1001: 'Going Away. An endpoint is "going away", such as a server going down or a browser having navigated away from a page.',
	1002: 'Protocol error. An endpoint is terminating the connection due to a protocol error',
	1003: "Unsupported Data. An endpoint received a type of data it doesn't support.",
	1004: '--Reserved--. The specific meaning might be defined in the future.',
	1005: 'No Status. No status code was actually present.',
	1006: 'Abnormal Closure. The connection was closed abnormally, e.g., without sending or receiving a Close control frame',
	1007: 'Invalid frame payload data. The connection was closed, because the received data was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629]).',
	1008: 'Policy Violation. The connection was closed, because current message data "violates its policy". This reason is given either if there is no other suitable reason, or if there is a need to hide specific details about the policy.',
	1009: 'Message Too Big. Connection closed because the message is too big for it to process.',
	1010: "Mandatory Extension. Connection is terminated the connection because the server didn't negotiate one or more extensions in the WebSocket handshake.",
	1011: 'Internl Server Error. Connection closed because it encountered an unexpected condition that prevented it from fulfilling the request.',
	1015: "TLS Handshake. The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).",
};

/**
 * Events used for communicating with Stream Deck
 * @type {{sendToPlugin: string, deviceDidDisconnect: string, getSettings: string, deviceDidConnect: string, logMessage: string, keyUp: string, didReceiveGlobalSettings: string, showOk: string, didReceiveSettings: string, willAppear: string, applicationDidLaunch: string, setGlobalSettings: string, getGlobalSettings: string, applicationDidTerminate: string, willDisappear: string, propertyInspectorDidAppear: string, setTitle: string, titleParametersDidChange: string, registerPropertyInspector: string, connected: string, openUrl: string, setSettings: string, sendToPropertyInspector: string, registerPlugin: string, systemDidWakeUp: string, setState: string, propertyInspectorDidDisappear: string, keyDown: string, showAlert: string, setImage: string}}
 */
const Events = {
	didReceiveSettings: 'didReceiveSettings',
	didReceiveGlobalSettings: 'didReceiveGlobalSettings',
	keyDown: 'keyDown',
	keyUp: 'keyUp',
	willAppear: 'willAppear',
	willDisappear: 'willDisappear',
	titleParametersDidChange: 'titleParametersDidChange',
	deviceDidConnect: 'deviceDidConnect',
	deviceDidDisconnect: 'deviceDidDisconnect',
	applicationDidLaunch: 'applicationDidLaunch',
	applicationDidTerminate: 'applicationDidTerminate',
	systemDidWakeUp: 'systemDidWakeUp',
	propertyInspectorDidAppear: 'propertyInspectorDidAppear',
	propertyInspectorDidDisappear: 'propertyInspectorDidDisappear',
	sendToPlugin: 'sendToPlugin',
	sendToPropertyInspector: 'sendToPropertyInspector',
	connected: 'connected',
	setImage: 'setImage',
	setTitle: 'setTitle',
	setState: 'setState',
	showOk: 'showOk',
	showAlert: 'showAlert',
	openUrl: 'openUrl',
	setGlobalSettings: 'setGlobalSettings',
	getGlobalSettings: 'getGlobalSettings',
	setSettings: 'setSettings',
	getSettings: 'getSettings',
	registerPropertyInspector: 'registerPropertyInspector',
	registerPlugin: 'registerPlugin',
	logMessage: 'logMessage',
}

/**
 * Constants used for Stream Deck
 * @type {{softwareOnly: number, dataLocalize: string, hardwareAndSoftware: number, hardwareOnly: number}}
 */
const Constants = {
	dataLocalize: '[data-localize]',

	//TODOZ: Try the things that use this in stream-deck.js to see if we really need it?
	 hardwareAndSoftware : 0,
	 hardwareOnly : 1,
	 softwareOnly : 2,
}
