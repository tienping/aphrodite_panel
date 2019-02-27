/**
 *
 * Asynchronously loads the component for GamiguidePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
