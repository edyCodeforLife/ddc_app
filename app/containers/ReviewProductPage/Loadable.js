/**
 *
 * Asynchronously loads the component for ReviewProductPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
