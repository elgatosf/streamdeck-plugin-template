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
	 * @param {function} fn
	 */
	onDidReceiveSettings(fn) {
		this.#on(`${this.UUID}.${Events.didReceiveSettings}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the didReceiveGlobalSettings event, which fires when calling getGlobalSettings
	 * @param {function} fn
	 */
	onDidReceiveGlobalSettings(fn) {
		this.#on(Events.didReceiveGlobalSettings, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the keyDown event, which fires when pressing a key down
	 * @param {function} fn
	 */
	onKeyDown(fn) {
		this.#on(`${this.UUID}.${Events.keyDown}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the keyUp event, which fires when releasing a key
	 * @param {function} fn
	 */
	onKeyUp(fn) {
		this.#on(`${this.UUID}.${Events.keyUp}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the willAppear event, which fires when an action appears on the canvas
	 * @param {function} fn
	 */
	onWillAppear(fn) {
		this.#on(`${this.UUID}.${Events.willAppear}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the willAppear event, which fires when an action disappears on the canvas
	 * @param {function} fn
	 */
	onWillDisappear(fn) {
		this.#on(`${this.UUID}.${Events.willDisappear}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the titleParametersDidChange event, which fires when a user changes the key title
	 * @param {function} fn
	 */
	onTitleParametersDidChange(fn) {
		this.#on(`${this.UUID}.${Events.titleParametersDidChange}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the propertyInspectorDidAppear event, which fires when the property inspector is displayed
	 * @param {function} fn
	 */
	onPropertyInspectorDidAppear(fn) {
		this.#on(`${this.UUID}.${Events.propertyInspectorDidAppear}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the propertyInspectorDidDisappear event, which fires when the property inspector is closed
	 * @param {function} fn
	 */
	onPropertyInspectorDidDisappear(fn) {
		this.#on(`${this.UUID}.${Events.propertyInspectorDidDisappear}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the sendToPlugin event, which fires when the property inspector uses the sendToPlugin api
	 * @param {function} fn
	 */
	onSendToPlugin(fn) {
		this.#on(`${this.UUID}.${Events.sendToPlugin}`, (jsn) => fn(jsn));
		return this;
	}

	/**
	 * Registers a callback function for the sendToPropertyInspector event, which fires when the plugin uses the sendToPropertyInspector api
	 * @param {function} fn
	 */
	onSendToPropertyInspector(fn) {
		this.#on(`${this.UUID}.${Events.sendToPropertyInspector}`, (jsn) => fn(jsn));
		return this;
	}
}

const Action = ELGSDAction;
