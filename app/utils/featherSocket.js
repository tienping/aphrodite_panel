import Feather from 'feathersjs-sdk';
import globalScope from 'globalScope';
import featherSetting from 'configs/featherSetting';

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
        transport: featherSetting,
    });
    return object;
};

// example:
// await requester.query('service').find();
// await requester.query('service', 'other').find();

export default getFeatherSocket;
