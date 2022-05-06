/**
 *
 * Asynchronously loads the component for PaymentConfirmationPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
