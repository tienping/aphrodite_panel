// import { create } from 'apisauce';
// import { FeatherRest, FeatherSocket } from 'feathersjs-sdk';
import { FeatherSocket } from 'feathersjs-sdk';

const featherSetting = {
    aphrodite: new FeatherSocket({
        host: 'http://18.138.34.150:9040/', // ec2 instance
        // host: 'https://aphrodite.alpha.hermo.my',
        // host: 'http://192.168.12.1:3002',
        storage: window.localStorage,
        defaultParams: {},
        connect: () => {},
        disconnect: () => {},
    }),
};

export default featherSetting;
