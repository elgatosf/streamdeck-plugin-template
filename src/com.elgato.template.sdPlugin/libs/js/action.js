/// <reference path="constants.js" />

/**
 * @class Action
 * A Stream Deck plugin action, where you can register callback functions for different events
 */
class ELGSDAction {
	UUID;
	#on = EventEmitter.on;

	constructor(UUID) {
		this.UUID = UUID;
	}

	/**
	 * Registers a callback function for the didReceiveSettings event, which fires when calling getSettings
	 * @param {*} fn
	 */
	onDidReceiveSettings(fn) {
		this.#on(`${this.UUID}.${DID_RECEIVE_SETTINGS}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the didReceiveGlobalSettings event, which fires when calling getGlobalSettings
	 * @param {*} fn
	 */
	onDidReceiveGlobalSettings(fn) {
		this.#on(DID_RECEIVE_GLOBAL_SETTINGS, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the keyDown event, which fires when pressing a key down
	 * @param {*} fn
	 */
	onKeyDown(fn) {
		this.#on(`${this.UUID}.${KEY_DOWN}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the keyUp event, which fires when releasing a key
	 * @param {*} fn
	 */
	onKeyUp(fn) {
		this.#on(`${this.UUID}.${KEY_UP}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the willAppear event, which fires when an action appears on the canvas
	 * @param {*} fn
	 */
	onWillAppear(fn) {
		this.#on(`${this.UUID}.${WILL_APPEAR}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the willAppear event, which fires when an action disappears on the canvas
	 * @param {*} fn
	 */
	onWillDisappear(fn) {
		this.#on(`${this.UUID}.${WILL_DISAPPEAR}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the titleParametersDidChange event, which fires when a user changes the key title
	 * @param {*} fn
	 */
	onTitleParametersDidChange(fn) {
		this.#on(`${this.UUID}.${TITLE_PARAMETERS_DID_CHANGE}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the propertyInspectorDidAppear event, which fires when the property inspector is displayed
	 * @param {*} fn
	 */
	onPropertyInspectorDidAppear(fn) {
		this.#on(`${this.UUID}.${PROPERTY_INSPECTOR_DID_APPEAR}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the propertyInspectorDidDisappear event, which fires when the property inspector is closed
	 * @param {*} fn
	 */
	onPropertyInspectorDidDisappear(fn) {
		this.#on(`${this.UUID}.${PROPERTY_INSPECTOR_DID_DISAPPEAR}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the sendToPlugin event, which fires when the property inspector uses the sendToPlugin api
	 * @param {*} fn
	 */
	onSendToPlugin(fn) {
		this.#on(`${this.UUID}.${SEND_TO_PLUGIN}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the sendToPropertyInspector event, which fires when the plugin uses the sendToPropertyInspector api
	 * @param {*} fn
	 */
	onSendToPropertyInspector(fn) {
		this.#on(`${this.UUID}.${SEND_TO_PROPERTY_INSPECTOR}`, (jsn) => fn(jsn));
		return this;
	}
}

var Action = ELGSDAction;
