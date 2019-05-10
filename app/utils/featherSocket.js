import Feather from 'feathersjs-sdk';
import globalScope from 'globalScope';
import globalFeatherSetting from 'utils/globalFeatherSetting';

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
        transport: globalFeatherSetting,
    });
    return object;
};

// example:
// await requester.query('service').find();
// await requester.query('service', 'other').find();

export default getFeatherSocket;
