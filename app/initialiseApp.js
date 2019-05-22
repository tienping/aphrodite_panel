import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
import getFeatherInstance from 'utils/featherSocket';
import { NotificationManager } from 'react-notifications';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = async () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    if (!globalScope.feather) {
        globalScope.feather = getFeatherInstance();

        if (globalScope.token) {
            try {
                const authenticateReponses = await globalScope.feather.autoAuthenticate('aphrodite');
                if (authenticateReponses.user) {
                    globalScope.userData = authenticateReponses.user;
                    console.log('auto-authenticate passed', authenticateReponses.user);
                }
            } catch (error) {
                console.log('auto-authenticate failed', error);
                NotificationManager.error(JSON.stringify(error), 'Login Failed, Please try again', 5000);
            }
        }
    }
};

export default initialiseApp;
