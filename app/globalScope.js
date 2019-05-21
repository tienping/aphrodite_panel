const globalScope = {
    token: '',
    isAdmin: false,
    api: process.env.API_URL,
    previousPage: '',
    selectionData: {},
    userData: null,
    feather: null, // refer initialiseApp.js
};

export default globalScope;

