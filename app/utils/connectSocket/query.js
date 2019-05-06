/**
 * @module SocketQuery
 */
class SocketQuery {
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
     * @async
     * @returns {Promise<Object>}
     */
    find(params) {
        return this.service.find(params);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {Promise<Object>}
     */
    create(data, params) {
        return this.service.create(data, params);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {Promise<Object>}
     */
    get(id, params) {
        return this.service.get(id, params);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {Promise<Object>}
     */
    update(id, data, params) {
        return this.service.update(id, data, params);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {Promise<Object>}
     */
    patch(id, data, params) {
        return this.service.patch(id, data, params);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {Promise<Object>}
     */
    remove(id, params) {
        return this.service.remove(id, params);
    }
}

export default SocketQuery;
