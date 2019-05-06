import FeatherSocket from 'utils/connectSocket';

const globalScope = {
    token: '',
    isAdmin: false,
    api: process.env.API_URL,
    previousPage: '',
    selectionData: {},
    socket: new FeatherSocket({
        storage: window.localStorage,
        host: 'http://aphrodite.alpha.hermo.my',
        // port: 3002,
        onLogin: () => {},
        onLogout: () => {},
    }),
};

export default globalScope;

