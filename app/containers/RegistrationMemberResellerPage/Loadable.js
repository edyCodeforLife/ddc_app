/**
 *
 * Asynchronously loads the component for RegistrationMemberResellerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
