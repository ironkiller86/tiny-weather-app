/**
 *
 * @param {*} timestamp
 * @returns
 */
export const getLocalData = (timestamp, opt = { timeString: false }) => {
  const event = new Date(timestamp * 1000);
  if (!opt.timeString) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return capitalizeFirstLetter(event.toLocaleDateString("it-IT", options));
  } else {
    return event.toLocaleTimeString("it-IT");
  }
};
/*
 *
 * @param {*} string
 * @returns
 */
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
