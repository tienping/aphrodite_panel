/**
 *
 * Asynchronously loads the component for ButtonList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
