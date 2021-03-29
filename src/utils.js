/**
 *
 * @param {*} timestamp
 * @returns
 */
export const getLocalData = (
  timestamp,
  opt = { timeString: false, dataFormat: false, precision: false }
) => {
  const event = new Date(timestamp * 1000);
  if (!opt.timeString) {
    if (!opt.dataFormat) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return capitalizeFirstLetter(event.toLocaleDateString("it-IT", options));
    } else {
      return new Intl.DateTimeFormat(["it", "IT"], {
        day: "2-digit",
        month: "2-digit",
      }).format(event);
    }
  } else {
    if (opt.precision) {
      return event.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return event.toLocaleTimeString("it-IT");
    }
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
