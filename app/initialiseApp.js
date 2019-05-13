import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
import getFeatherInstance from 'utils/featherSocket';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    // alertMsg();
    globalScope.feather = getFeatherInstance();
};

export default initialiseApp;
