import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import featherio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import SocketQuery from './query';
import SocketSubscriber from './subscriber';

/**
 * @module FeatherSocket
 */
class FeatherSocket {

    /**
     * @constructor
     * @public
     *
     * @param {Object} [storage] platform storage
     * @param {String} [host] Server ip address
     * @param {Number} [port] Server port number ( Default 3000 )
     * @param {String} [onFail] On reauth fails
     * @param {Function} [onLogin] On login success
     */
    constructor({ storage, host, port, onLogout, onLogin }) {
        if (!storage) {
            throw Error('Missing storage params ( localStorage / asyncStorage ).');
        }
        if (!host) {
            throw Error('Missing host params, host is required.');
        }
        if (!(host.startsWith('http://') || host.startsWith('https://'))) {
            throw Error('Host params must start with "http://" or "https://"');
        }

        const socketio = io(`${host}${port ? `:${port}` : ''}`, {
            transports: ['websocket'],
            forceNew: true,
            /* For fix react-native android doesn't handle timeouts */
            pingInterval: 10000,
            pingTimeout: 30000,
        });
        this.app = feathers();
        this.app.configure(featherio(socketio, { timeout: 30000 }));
        this.app.configure(auth({ path: 'authentication' }));
        this.storage = storage;
        this.cdn = this.app.service('storage');

        this.app.on('reauthentication-error', () => {
            this.tokenLogin(this.token).catch((err) => onLogout && onLogout(err));
        });

        this.get('token').then(
            (token) => {
                this.token = token;
                if (this.token) {
                    this.jwtLogin(this.token).then((res) => onLogin && onLogin(res)).catch((err) => onLogout && onLogout(err));
                } else if (onLogout) {
                    onLogout();
                }
            }
        );
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [name] name for store into storage
     * @param {String} [data] data for set into storage
     * @callback [cb]
     *
     * @returns {void}
     */
    async set(name, data) {
        const func = this.storage.setItem;
        if (func.constructor.name === 'AsyncFunction') {
            return await func.call(this.storage, name, data);
        }
        return func.call(this.storage, name, data);
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [name] get by name from storage
     * @async
     * @returns {void}
     */
    async get(name) {
        const res = this.storage.getItem(name);
        // return res instanceof Promise ? await res : res;
        return res instanceof Promise ? await res : res;
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [imageId] Image id
     * @async
     * @returns {Promise<Buffer>} base64
     */
    async image(imageId) {
        const buffer = await this.cdn.get(imageId);
        return `data:image/png;base64,${buffer}`;
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [name] Service name. Must same with server side.
     * @returns {SocketSubscriber}
     */
    subscribe(name) {
        return new SocketSubscriber(this.app.service(name));
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [name] Service name. Must same with server side.
     * @returns {SocketQuery}
     */
    query(name) {
        return new SocketQuery(this.app.service(name));
    }

    /**
     * @instance
     * @public
     *
     * @param {String} [t] user jwt token
     * @async
     * @returns {Promise<void>}
     */
    async jwtLogin(t) {
        await this.app.authenticate({
            strategy: 'custom',
            token: t,
        });
        await this.set('token', t);
    }

    /**
     * @instance
     * @public
     *
     * @async
     * @returns {null}
     */
    logout() {
        this.token = '';
        return this.set('token', this.token);
    }
}

export default FeatherSocket;
