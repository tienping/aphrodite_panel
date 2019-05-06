/**
 * @module SocketSubscriber
 */
class SocketSubscriber {
    /**
     * @constructor
     * @private
     *
     * @param {ServiceInstance} [socket] service instance
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [custom] listen to custom event ( defined at server side )
     * @param {String} [listener] listener event for firing when event invoke
     * @returns {Function}
     */
    on(custom, listener) {
        this.service.on(custom, listener);
        return this.unsubscribe(custom);
    }

    /**
     * @instance
     * @public
     *
     * @param {Listener} [listener] modified event listener
     * @returns {Function}
     */
    onChange(listener) {
        this.service.on('modified', listener);
        return this.unsubscribe('modified');
    }

    /**
     * @instance
     * @public
     *
     * @param {Listener} [listener] Created event listener
     * @returns {Function}
     */
    onCreate(listener) {
        this.service.on('created', listener);
        return this.unsubscribe('created');
    }

    /**
     * @instance
     * @public
     *
     * @param {Listener} [listener] Updated event listener
     * @returns {Function}
     */
    onUpdate(listener) {
        this.service.on('updated', listener);
        return this.unsubscribe('updated');
    }

    /**
     * @instance
     * @public
     *
     * @param {Listener} [listener] Deleted event listener
     * @returns {Function}
     */
    onDelete(listener) {
        this.service.on('deleted', listener);
        return this.unsubscribe('deleted');
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [type] Unsubscribe type '*' will remove all or specific type to disable listener
     * @returns {Function}
     */
    unsubscribe(type) {
        return () => type === '*' ? this.service.removeAllListeners(['created', 'updated', 'deleted']) : this.service.off(type);
    }
}

export default SocketSubscriber;
