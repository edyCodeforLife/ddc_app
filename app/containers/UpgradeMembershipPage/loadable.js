/**
 *
 * Asynchronously loads the component for ReviewTDSPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
