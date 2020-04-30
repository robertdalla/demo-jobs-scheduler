export const global_REST_timeout = 30000; // default REST requests timeout (in ms)

const today_date = new Date(); // date of today at local time
export const global_TODAY_DATE = {
  year: today_date.getFullYear(),
  month: today_date.getMonth() + 1, // note: 1 <= month <= 12
  day: today_date.getDate()
};
// console.log('global_TODAY_DATE = ', global_TODAY_DATE);

const folder_name = 'JobsScheduler'; // IMPORTANT: this is our reference that allows us to figure out the Sharepoint site path. Make sure the app is deployed under this name (document library name + addin name)
export const global_APP_DOMAIN_URL = window.location.origin; // the root address without routes and params (eg. https://mojosoup.sharepoint.com)

const dirty_APP_FULL_URL = document.location.href; // full 'dirty' current url (eg. https://teammojosoup.sharepoint.com/sites/dev/managerselfservice/ManagerSelfService/index.aspx)
export const global_APP_FULL_URL = dirty_APP_FULL_URL.substr(0, dirty_APP_FULL_URL.indexOf('index.aspx')) + 'index.aspx'; // full 'clean' current url (eg. https://teammojosoup.sharepoint.com/sites/dev/dfsiPortalDev/ProjectReporting/index.aspx)
// console.log('global_APP_FULL_URL = ' + global_APP_FULL_URL);

export const global_IS_LOCALDEV = (document.location.hostname === 'localhost') || (document.location.hostname === '127.0.0.1');
export const global_IS_MOJOSOUP = document.location.href.indexOf('teammojosoup') !== -1;

const SP_site = global_APP_FULL_URL.substr(0, global_APP_FULL_URL.indexOf('/' + folder_name)).replace(global_APP_DOMAIN_URL, '');
// console.log('Sharepoint site = ' + SP_site);

export const global_LIBRARY_URL = global_APP_DOMAIN_URL + SP_site;
export const global_API_URL = global_LIBRARY_URL + '/_api';
// console.log('global_API_URL = ' + global_API_URL);
