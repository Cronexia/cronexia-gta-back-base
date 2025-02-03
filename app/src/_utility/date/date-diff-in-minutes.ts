// * Compare 2 dates and return the result in minutes.
import { isDate } from '../types/is-date';

export function dateDiffInMinutes(
  dateStart: Date,
  dateEnd: Date,
): number | false {
  if (!isDate(dateStart)) {
    console.error('dateStart must be a Date.');
    return false;
  }
  if (!isDate(dateEnd)) {
    console.error('dateEnd must be a Date.');
    return false;
  }

  // TODO: 🌱 Check if dateEnd > dateStart or return absolute value ?
  const differenceInMilliseconds = dateEnd.getTime() - dateStart.getTime();
  const differenceInMinutes = differenceInMilliseconds / 1000 / 60;

  return differenceInMinutes;
}
