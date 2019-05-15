import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
import getFeatherInstance from 'utils/featherSocket';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = async () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    if (!globalScope.feather) {
        globalScope.feather = getFeatherInstance();

        if (globalScope.token) {
            await globalScope.feather.autoAuthenticate('aphrodite');
        }
    }
};

export default initialiseApp;
