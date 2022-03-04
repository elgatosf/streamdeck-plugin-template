/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	// TODO: Remove this test logging code and replace with simple action
	console.log({ object: 'stream-deck', event: 'onConnected' });
})
	.onDeviceDidConnect(() => {
		console.log({ object: 'stream-deck', event: 'onDeviceDidConnect' });
	})
	.onDeviceDidDisconnect(() => {
		console.log({ object: 'stream-deck', event: 'onDeviceDidDisconnect' });
	})
	.onApplicationDidLaunch(() => {
		console.log({ object: 'stream-deck', event: 'onApplicationDidLaunch' });
	})
	.onApplicationDidTerminate(() => {
		console.log({ object: 'stream-deck', event: 'onApplicationDidTerminate' });
	})
	.onSystemDidWakeUp(() => {
		console.log({ object: 'stream-deck', event: 'onSystemDidWakeUp' });
	});

new Action('com.elgato.template.action')
	.onDidReceiveGlobalSettings(() => {
		console.log({ object: 'action', event: 'onDidReceiveGlobalSettings' });
	})
	.onDidReceiveSettings(() => {
		console.log({ object: 'action', event: 'onDidReceiveSettings' });
	})
	.onKeyDown(() => {
		console.log({ object: 'action', event: 'onKeyDown' });
	})
	.onKeyUp(() => {
		console.log({ object: 'action', event: 'onKeyUp' });
	})
	.onWillAppear(() => {
		console.log({ object: 'action', event: 'onWillAppear' });
	})
	.onWillDisappear(() => {
		console.log({ object: 'action', event: 'onWillDisappear' });
	})
	.onTitleParametersDidChange(() => {
		console.log({ object: 'action', event: 'onTitleParametersDidChange' });
	})
	.onPropertyInspectorDidAppear(() => {
		console.log({ object: 'action', event: 'onPropertyInspectorDidAppear' });
	})
	.onPropertyInspectorDidDisappear(() => {
		console.log({ object: 'action', event: 'onPropertyInspectorDidDisappear' });
	})
	.onSendToPlugin(() => {
		console.log({ object: 'action', event: 'onSendToPlugin' });
	});
