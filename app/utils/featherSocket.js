import Feather, { FeatherRest, FeatherSocket } from 'feathersjs-sdk';
import globalScope from 'globalScope';
import { create } from 'apisauce';

const getFeatherSocket = () => {
    const object = new Feather({
        storage: window.localStorage,
        defaultHeaders: {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
                'token': globalScope.token,
            },
        },
        transport: {
            default: new FeatherRest({
                host: 'http://aphrodite.alpha.hermo.my',
                type: 'axios',
                transport: create({
                    // baseURL: apiString,
                    // timeout: 30000,
                }).axiosInstance,
            }),
            socket: new FeatherSocket({
                host: 'http://aphrodite.alpha.hermo.my',
            }),
        },
    });
    return object;
};

// example:
// await requester.query('service').find();
// await requester.query('service', 'other').find();

export default getFeatherSocket;
