/**
 *
 * Asynchronously loads the component for SimpleLineChart
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
