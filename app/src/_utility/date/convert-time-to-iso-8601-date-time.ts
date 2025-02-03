// * "09:00:00Z" DateTime to GraphQL scalars "Time" compatibility
export function convertTimeToISO8601DateTime(time: Date): Date {
  return new Date(`1970-01-01 ${time} UTC`);
}
