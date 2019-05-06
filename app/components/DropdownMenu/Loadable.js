/**
 *
 * Asynchronously loads the component for DropdownMenu
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
