// * 🧾 Date cleaner format, for debug
// Use:
//        const someDate = ...
//        console.log(`${someDate.toLocaleDateString(
//          'fr-FR',
//          dateOptions,
//        )}`);
export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const dateOptionsForLogs: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};
