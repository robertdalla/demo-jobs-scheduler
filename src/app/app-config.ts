const today_date = new Date(); // date of today at local time
export const global_TODAY_DATE = {
  year: today_date.getFullYear(),
  month: today_date.getMonth() + 1, // note: 1 <= month <= 12
  day: today_date.getDate()
};
// console.log('global_TODAY_DATE = ', global_TODAY_DATE);

export const global_IS_LOCALDEV = (document.location.hostname === 'localhost') || (document.location.hostname === '127.0.0.1');
