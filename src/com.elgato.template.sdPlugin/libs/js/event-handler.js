class ELGSDEventHandler {
	eventList = new Map();

	on(name, fn) {
		if (!EventHandler.eventList.has(name)) {
			EventHandler.eventList.set(name, EventHandler.pubSub());
		}

		return EventHandler.eventList.get(name).sub(fn);
	}

	remove(name) {
		this.eventList.delete(name);
	}

	removeAll(name) {
		Array.from(this.eventList.keys())
			.filter((key) => key.startsWith(name))
			.forEach((key) => this.eventList.delete(key));
	}

	has(name) {
		return EventHandler.eventList.has(name);
	}

	emit(name, data) {
		return EventHandler.eventList.has(name) && EventHandler.eventList.get(name).pub(data);
	}

	pubSub() {
		const subscribers = new Set();

		const sub = (fn) => {
			subscribers.add(fn);
			return () => {
				subscribers.delete(fn);
			};
		};

		const pub = (data) => subscribers.forEach((fn) => fn(data));
		return Object.freeze({ pub, sub });
	}
}

var EventHandler = new ELGSDEventHandler();
