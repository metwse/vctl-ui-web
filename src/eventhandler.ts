//! unknown is preferred over any.
type Listener<T extends Array<any>> = (...args: T) => void;


export class EventEmitter<EventMap extends Record<string, Array<any>>> {
    private eventListeners: {
        [K in keyof EventMap]?: Set<Listener<EventMap[K]>>;
    } = {}

    on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        listeners.add(listener);
        this.eventListeners[eventName] = listeners;
    }

    emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        for (const listener of listeners){
            listener(...args);
        }
    }

    //! The idiomatic method name for removing event listeners is
    // `removeEventListener`.
    off<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
        const listeners = this.eventListeners[eventName];
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0){
                delete this.eventListeners[eventName];
            }
        }
}}

//! Confusing naming convention. An instance of a class should not use
// PascalCase.
//! Defining an event handler inside the Session class would more idiomatic.
export const EventHandler = new EventEmitter()
