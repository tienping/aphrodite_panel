import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
import getFeatherInstance from 'utils/featherSocket';
import { NotificationManager } from 'react-notifications';
import { create } from 'apisauce';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = async () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    globalScope.axios = create({
        baseURL: globalScope.api,
        headers: {
            'hertoken': globalScope.token,
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
        //     // 'api-version': '1.0.0',
        //     // 'app-version': DeviceInfo.getVersion(),
        //     // 'app-os-name': 'Platform.OS',
        //     // 'app-os-version': DeviceInfo.getSystemVersion(),
        },
        // timeout: 30000,
    });

    if (!globalScope.feather) {
        globalScope.feather = getFeatherInstance();

        if (globalScope.token) {
            try {
                const authenticateReponses = await globalScope.feather.autoAuthenticate('aphrodite');
                if (authenticateReponses.user) {
                    globalScope.userData = authenticateReponses.user;
                    globalScope.userData = {
                        merchants: [{
                            id: 3,
                        }],
                    };
                    console.log('auto-authenticate passed', authenticateReponses.user);
                }
            } catch (error) {
                console.log('auto-authenticate failed', error);
                NotificationManager.error(JSON.stringify(error), 'Login Failed, Please try again', 5000);
            }
        }
    }

    if (!globalScope.token) {
        globalScope.previewMode = getCookie(process.env.PREVIEW_KEY) === 'true';
        if (globalScope.previewMode) {
            globalScope.token = 'preview-mode';
            globalScope.isAdmin = 'preview-mode';
            globalScope.userData = {
                merchants: [{
                    id: 'mock',
                }],
            };
        }
    }
};

export default initialiseApp;
