/**
 *
 * @param {*} timestamp
 * @returns
 */
export const getLocalData = (timestamp) => {
  const event = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return capitalizeFirstLetter(event.toLocaleDateString("it-IT", options));
};
/*
 *
 * @param {*} string
 * @returns
 */
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
