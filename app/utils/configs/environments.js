/**
 * https://daveceddia.com/multiple-environments-with-react/
 */

let APP_CONFIG;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'www.dusdusan.com' || hostname === 'dusdusan.com') {
  // Production
  APP_CONFIG = {
    DEBUG_MODE: false,
    API_ROOT: 'https://apigateway.dusdusan.com/',
    URL_MASTER_PUBLIC_PATH: 'https://servicegateway.dusdusan.com/',
    GTM_ID: 'GTM-P5MMF92',
    PLUGIN_FACEBOOK_ID: 222387225214993,
  };
} else if ( 
  hostname === 'appstaging.dusdusan.com' ||
  hostname === 'demo.dusdusan.com'
) {
  // Staging
  APP_CONFIG = {
    DEBUG_MODE: true,
    API_ROOT: 'https://apigwstaging.dusdusan.com/',
    URL_MASTER_PUBLIC_PATH: 'https://servicegwstaging.dusdusan.com/',
    GTM_ID: 'GTM-KL2J4XZ',
    PLUGIN_FACEBOOK_ID: 222387225214993,
  };
} else {
  // Development
  APP_CONFIG = {
    DEBUG_MODE: true,
    // API_ROOT: 'https://apigateway.dusdusan.com/',
    // URL_MASTER_PUBLIC_PATH: 'https://servicegateway.dusdusan.com/',
    API_ROOT: 'https://apigwdev.dusdusan.com/',
    URL_MASTER_PUBLIC_PATH: 'https://apigwdev.dusdusan.com/',
    GTM_ID: 'GTM-KL2J4XZ',
    PLUGIN_FACEBOOK_ID: 681681662171153,
  };
}

export default APP_CONFIG;
