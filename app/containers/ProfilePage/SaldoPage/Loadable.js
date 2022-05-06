/**
 *
 * Asynchronously loads the component for SaldoPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
