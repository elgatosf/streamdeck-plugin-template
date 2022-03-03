class ELGSDEventEmitter {
	eventList = new Map();

	on(name, fn) {
		if (!EventEmitter.eventList.has(name)) {
			EventEmitter.eventList.set(name, EventEmitter.pubSub());
		}

		return EventEmitter.eventList.get(name).sub(fn);
	}

	emit(name, data) {
		return EventEmitter.eventList.has(name) && EventEmitter.eventList.get(name).pub(data);
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
		return Object.freeze({pub, sub});
	}
}

const EventEmitter = new ELGSDEventEmitter();
