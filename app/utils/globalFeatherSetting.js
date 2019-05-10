// import { create } from 'apisauce';
// import { FeatherRest, FeatherSocket } from 'feathersjs-sdk';
import { FeatherSocket } from 'feathersjs-sdk';

const globalFeatherSetting = {
    // default: new FeatherRest({
    //     host: 'http://aphrodite.alpha.hermo.my',
    //     type: 'axios',
    //     transport: create({
    //         // baseURL: apiString,
    //         // timeout: 30000,
    //     }).axiosInstance,
    // }),
    // socket: new FeatherSocket({
    //     host: 'http://aphrodite.alpha.hermo.my',
    // }),
    socket2: new FeatherSocket({
        host: 'http://devapi.ordopos.com',
    }),

};

export default globalFeatherSetting;
