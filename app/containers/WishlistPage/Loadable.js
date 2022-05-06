/**
 *
 * Asynchronously loads the component for WishlistPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
