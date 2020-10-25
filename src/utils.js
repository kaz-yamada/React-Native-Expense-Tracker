/**
 * Convert Date object to a string in YYYY-MM-DD format
 * @param {Date} date
 */
export const formatDate = (date) => date.toISOString().substr(0, 10);

/**
 * Convert Date object to a string in YYYY-MM format
 * @param {Date} date
 */
export const getMonthYear = (date) =>
  `${date.getFullYear()}-${date.toISOString().substr(5, 2)}`;

/**
 *
 * @param {string} dateString
 */
export const parseMonthYearToDate = (dateString) => {
  const year = parseInt(dateString.substr(0, 4));
  const month = parseInt(dateString.substr(5));

  return new Date(year, month);
};

/**
 * Get a string in YYYY-MM-DD HH:MM:SS format
 * @param {Date} date
 */
export const formatDateTime = (date) =>
  date.toISOString().substr(0, 19).replace("T", " ");

/**
 * Get all the months between the two passed parameteres
 * @param {String} startMonth
 * @param {String} endMonth
 */
export const getDateRange = (startMonth, endMonth, maxRange = 5) => {
  const startDate = parseMonthYearToDate(startMonth);
  const endDate = parseMonthYearToDate(endMonth);
  let count = 0;

  const dateArray = new Array();

  do {
    dateArray.push(getMonthYear(startDate));
    startDate.setMonth(startDate.getMonth() + 1);
    count++;
  } while (startDate <= endDate || count <= maxRange);

  return dateArray;
};

/**
 *
 * @param {*} startDate
 * @param {*} endDate
 */
export const getMonthRange = (startDate, endDate) => {
  const currentDate = new Date(startDate);
  const dateArr = new Array();

  do {
    dateArr.push(formatDate(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  } while (currentDate.getTime() >= endDate.getTime());

  return dateArr;
};
