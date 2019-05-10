const globalScope = {
    token: '',
    isAdmin: false,
    api: process.env.API_URL,
    previousPage: '',
    selectionData: {},
    socket: null, // refer initialiseApp.js
};

export default globalScope;

