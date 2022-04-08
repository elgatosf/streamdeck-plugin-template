/// <reference path="event-emitter.js" />
/// <reference path="constants.js" />

/**
 * @class StreamDeck
 * StreamDeck object containing all required code to establish
 * communication with SD-Software and the Property Inspector
 */
class ELGSDStreamDeck {
	port;
	uuid;
	messageType;
	actionInfo;
	websocket;
	language;
	localization;
	appInfo;
	on = EventEmitter.on;
	emit = EventEmitter.emit;

	constructor() {
		if (ELGSDStreamDeck.__instance) {
			return ELGSDStreamDeck.__instance;
		}

		ELGSDStreamDeck.__instance = this;
	}

	/**
	 * Connect to Stream Deck
	 * @param {string} port
	 * @param {string} uuid
	 * @param {string} messageType
	 * @param {string} appInfoString
	 * @param {string} actionString
	 */
	connect([port, uuid, messageType, appInfoString, actionString]) {
		this.port = port;
		this.uuid = uuid;
		this.messageType = messageType;
		this.actionInfo = actionString ? JSON.parse(actionString) : null;
		this.appInfo = JSON.parse(appInfoString);
		this.language = this.appInfo?.application?.language ?? null;

		if (this.websocket) {
			this.websocket.close();
			this.websocket = null;
		}

		this.websocket = new WebSocket('ws://127.0.0.1:' + this.port);

		this.websocket.onopen = () => {
			const json = {
				event: this.messageType,
				uuid: this.uuid,
			};

			this.websocket.send(JSON.stringify(json));

			this.emit(Events.connected, {
				connection: this.websocket,
				port: this.port,
				uuid: this.uuid,
				actionInfo: this.actionInfo,
				appInfo: this.appInfo,
				messageType: this.messageType,
			});
		};

		this.websocket.onerror = (evt) => {
			const error = `WEBOCKET ERROR: ${evt}, ${evt.data}, ${SocketErrors[evt?.code]}`;
			console.warn(error);
			this.logMessage(error);
		};

		this.websocket.onclose = (evt) => {
			console.warn('WEBOCKET CLOSED:', SocketErrors[evt?.code]);
		};

		this.websocket.onmessage = (evt) => {
			const data = evt?.data ? JSON.parse(evt.data) : null;
			const { action, event } = data;
			const message = action ? `${action}.${event}` : event;
			if (message && message !== '') this.emit(message, data);
		};
	}

	/**
	 * Write to log file
	 * @param {string} message
	 */
	logMessage(message) {
		if (!message) {
			throw 'A message is required for logMessage.';
		}

		try {
			if (this.websocket) {
				const json = {
					event: Events.logMessage,
					payload: {
						message: message,
					},
				};
				this.websocket.send(JSON.stringify(json));
			} else {
				console.error('Websocket not defined');
			}
		} catch (e) {
			console.error('Websocket not defined');
		}
	}

	/**
	 * Fetches the specified language json file
	 * @param {string} pathPrefix
	 * @returns {Promise<void>}
	 */
	async loadLocalization(pathPrefix) {
		if (!pathPrefix) {
			throw 'A path to localization json is required for loadLocalization.';
		}

		const manifest = await this.readJson(`${pathPrefix}${this.language}.json`);
		this.localization = manifest['Localization'] ?? null;

		if (this.messageType === Events.registerPropertyInspector && this.localization) {
			const elements = document.querySelectorAll(Constants.dataLocalize);

			elements.forEach((element) => {
				element.textContent = this.localization[element.textContent] ?? element.textContent;
			});
		}
	}

	/**
	 *
	 * @param {string} path
	 * @returns {Promise<any>} json
	 */
	async readJson(path) {
		if (!path) {
			throw 'A path is required to readJson.';
		}

		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.onerror = reject;
			req.overrideMimeType('application/json');
			req.open('GET', path, true);
			req.onreadystatechange = (response) => {
				if (req.readyState === 4) {
					const jsonString = response?.target?.response;
					if (jsonString) {
						resolve(JSON.parse(response?.target?.response));
					} else {
						reject();
					}
				}
			};

			req.send();
		});
	}

	/**
	 * Send JSON payload to StreamDeck
	 * @param {string} event
	 * @param {string} context
	 * @param {object} [payload]
	 */
	send(event, context, payload = {}) {
		const pl = Object.assign({}, { event: event, context: context }, payload);
		this.websocket && this.websocket.send(JSON.stringify(pl));
	}

	/**
	 * Request the actions's persistent data. StreamDeck does not return the data, but trigger the actions's didReceiveSettings event
	 * @param {string} [context]
	 */
	getSettings(context) {
		this.send(Events.getSettings, context ?? this.uuid);
	}

	/**
	 * Save the actions's persistent data.
	 * @param {object} payload
	 * @param [context]
	 */
	setSettings(payload, context) {
		this.send(Events.setSettings, this.uuid, {
			action: this?.actionInfo?.action,
			payload: payload || null,
			targetContext: context,
		});
	}

	/**
	 * Request the plugin's persistent data. StreamDeck does not return the data, but trigger the plugin/property inspectors didReceiveGlobalSettings event
	 */
	getGlobalSettings() {
		this.send(Events.getGlobalSettings, this.uuid);
	}

	/**
	 * Save the plugin's persistent data
	 * @param {object} payload
	 */
	setGlobalSettings(payload) {
		this.send(Events.setGlobalSettings, this.uuid, {
			payload: payload,
		});
	}

	/**
	 * Opens a URL in the default web browser
	 * @param {string} urlToOpen
	 */
	openUrl(urlToOpen) {
		if (!url) {
			throw 'A url is required for openUrl.';
		}

		this.send(Events.openUrl, this.uuid, {
			payload: {
				url: urlToOpen,
			},
		});
	}

	/**
	 * Send payload from the property inspector to the plugin
	 * @param {object} payload
	 * @param {string} [context]
	 */
	sendToPlugin(payload, context) {
		this.send(Events.sendToPlugin, this.uuid, {
			action: this?.actionInfo?.action,
			payload: payload || null,
			targetContext: context,
		});
	}

	/**
	 * Display alert triangle on actions key
	 * @param {string} context
	 */
	showAlert(context) {
		if (!context) {
			throw 'A context is required to showAlert on the key.';
		}

		this.send(Events.showAlert, context);
	}

	/**
	 * Display ok check mark on actions key
	 * @param {string} context
	 */
	showOk(context) {
		if (!context) {
			throw 'A context is required to showOk on the key.';
		}

		this.send(Events.showOk, context);
	}

	/**
	 * Set the state of the actions
	 * @param {object} payload
	 * @param {string} context
	 */
	setState(payload, context) {
		if (!payload) {
			throw 'A state is required when using setState.';
		}

		if (!context) {
			throw 'A context is required when using setState.';
		}

		this.send(Events.setState, context, {
			payload: {
				state: 1 - Number(payload === 0),
			},
		});
	}

	/**
	 * Set the title of the action's key
	 * @param {string} title
	 * @param {string} context
	 * @param [target]
	 */
	setTitle(title, context, target) {
		if (!title) {
			throw 'A title is required for setTitle.';
		}

		if (!context) {
			throw 'A key context is required for setTitle.';
		}

		this.send(Events.setTitle, context, {
			payload: {
				title: '' + title || '',
				target: target || Constants.hardwareAndSoftware,
			},
		});
	}

	/**
	 *
	 * @param {string} context
	 * @param {number} [target]
	 */
	clearTitle(context, target) {
		if (!context) {
			throw 'A key context is required to clearTitle.';
		}
		this.setTitle(null, context, target || Constants.hardwareAndSoftware);
	}

	/**
	 * Send payload to property inspector
	 * @param {string} actionUUID
	 * @param {object} payload
	 * @param {string} context
	 */
	sendToPropertyInspector(actionUUID, context, payload) {
		if (typeof actionUUID != 'string') {
			throw 'An action UUID is required to sendToPropertyInspector.';
		}

		if (typeof context != 'string') {
			throw 'A key context is required to sendToPropertyInspector.';
		}

		this.send(Events.sendToPropertyInspector, context, {
			action: actionUUID,
			payload: payload || null,
		});
	}

	/**
	 * Set the actions key image
	 * @param {string} img
	 * @param {string} context
	 * @param {number} [target]
	 */
	setImage(img, context, target) {
		if (!img) {
			throw 'An image is required for setImage.';
		}

		if (!context) {
			throw 'A key context is required for setImage.';
		}
		this.send(Events.setImage, context, {
			payload: {
				image: img || '',
				target: target || Constants.hardwareAndSoftware,
			},
		});
	}

	/**
	 * Switches to a readonly profile or returns to previous profile
	 * @param {string} device
	 * @param {string} [profile]
	 */
	switchToProfile(device, profile) {
		if (!device) {
			throw 'A device id is required for switchToProfile.';
		}

		if (!profile) {
			throw 'A profile name is required for switchToProfile';
		}

		this.send(Events.switchToProfile, this.uuid, { device: device, payload: { profile } });
	}

	/**
	 * Registers a callback function for when Stream Deck is connected
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onConnected(fn) {
		if (!fn) {
			throw 'A callback function for the connected event is required for onConnected.';
		}

		this.on(Events.connected, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for when Stream Deck sends data to the property inspector
	 * @param {string} actionUUID
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onSendToPropertyInspector(actionUUID, fn) {
		if (typeof actionUUID != 'string') {
			throw 'An action UUID string is required for onSendToPropertyInspector.';
		}

		if (!fn) {
			throw 'A callback function for the sendToPropertyInspector event is required for onSendToPropertyInspector.';
		}

		this.on(`${actionUUID}.${Events.sendToPropertyInspector}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the deviceDidConnect event, which fires when a device is plugged in
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onDeviceDidConnect(fn) {
		if (!fn) {
			throw 'A callback function for the deviceDidConnect event is required for onDeviceDidConnect.';
		}

		this.on(Events.deviceDidConnect, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the deviceDidDisconnect event, which fires when a device is unplugged
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onDeviceDidDisconnect(fn) {
		if (!fn) {
			throw 'A callback function for the deviceDidDisconnect event is required for onDeviceDidDisconnect.';
		}

		this.on(Events.deviceDidDisconnect, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the applicationDidLaunch event, which fires when the application starts
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onApplicationDidLaunch(fn) {
		if (!fn) {
			throw 'A callback function for the applicationDidLaunch event is required for onApplicationDidLaunch.';
		}

		this.on(Events.applicationDidLaunch, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the applicationDidTerminate event, which fires when the application exits
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onApplicationDidTerminate(fn) {
		if (!fn) {
			throw 'A callback function for the applicationDidTerminate event is required for onApplicationDidTerminate.';
		}

		this.on(Events.applicationDidTerminate, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the systemDidWakeUp event, which fires when the computer wakes
	 * @param {function} fn
	 * @returns ELGSDStreamDeck
	 */
	onSystemDidWakeUp(fn) {
		if (!fn) {
			throw 'A callback function for the systemDidWakeUp event is required for onSystemDidWakeUp.';
		}

		this.on(Events.systemDidWakeUp, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the didReceiveGlobalSettings event, which fires when calling getGlobalSettings
	 * @param {function} fn
	 */
	onDidReceiveGlobalSettings(fn) {
		if (!fn) {
			throw 'A callback function for the didReceiveGlobalSettings event is required for onDidReceiveGlobalSettings.';
		}

		this.on(Events.didReceiveGlobalSettings, (jsn) => fn(jsn));
		return this;
	}
}

const $SD = new ELGSDStreamDeck();

/**
 * connectElgatoStreamDeckSocket
 * This is the first function StreamDeck Software calls, when
 * establishing the connection to the plugin or the Property Inspector
 * @param {string} port - The socket's port to communicate with StreamDeck software.
 * @param {string} uuid - A unique identifier, which StreamDeck uses to communicate with the plugin
 * @param {string} messageType - Identifies, if the event is meant for the property inspector or the plugin.
 * @param {string} appInfoString - Information about the host (StreamDeck) application
 * @param {string} actionInfo - Context is an internal identifier used to communicate to the host application.
 */
function connectElgatoStreamDeckSocket() {
	$SD.connect(arguments);
}
