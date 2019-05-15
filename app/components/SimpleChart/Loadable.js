/**
 *
 * Asynchronously loads the component for SimpleChart
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
