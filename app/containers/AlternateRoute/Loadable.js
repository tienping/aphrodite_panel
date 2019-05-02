/**
 *
 * Asynchronously loads the component for AlternateRoute
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
