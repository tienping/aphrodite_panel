import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';

const initialiseApp = () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);
};

export default initialiseApp;
