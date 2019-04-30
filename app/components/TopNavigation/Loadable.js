/**
 *
 * Asynchronously loads the component for TopNavigation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
