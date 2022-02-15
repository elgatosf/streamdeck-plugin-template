class EventHandler {
    static eventList = new Map();

    static on(name, fn) {
        if (!EventHandler.eventList.has(name)) {
            EventHandler.eventList.set(name, EventHandler.pubSub());
        }

        return EventHandler.eventList.get(name).sub(fn);
    }

    static remove(name) {
        this.eventList.delete(name)
    }

    static removeAll(name) {
        Array.from(this.eventList.keys()).filter(key => key.startsWith(name)).forEach(key => this.eventList.delete(key))
    }

    static has(name) {
        return EventHandler.eventList.has(name);
    }

    static emit(name, data) {
        return EventHandler.eventList.has(name) && EventHandler.eventList.get(name).pub(data);
    }

    static pubSub() {
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
