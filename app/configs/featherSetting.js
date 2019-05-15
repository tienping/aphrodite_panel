// import { create } from 'apisauce';
// import { FeatherRest, FeatherSocket } from 'feathersjs-sdk';
import { FeatherSocket } from 'feathersjs-sdk';

const featherSetting = {
    // default: new FeatherRest({
    //     host: 'http://aphrodite.alpha.hermo.my',
    //     type: 'axios',
    //     transport: create({
    //         // baseURL: apiString,
    //         // timeout: 30000,
    //     }).axiosInstance,
    // }),
    aphrodite: new FeatherSocket({
        host: 'http://aphrodite.alpha.hermo.my',
        // host: 'http://192.168.12.1:3002',
        storage: window.localStorage,
    }),
    ordo: new FeatherSocket({
        host: 'http://devapi.ordopos.com',
        storage: window.localStorage,
    }),
};

export default featherSetting;
