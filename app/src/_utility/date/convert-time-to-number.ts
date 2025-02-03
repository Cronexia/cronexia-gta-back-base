// * ⏱️ > 🔢
// * En vue de l'utiliser dans une fonction de tri, plus rapide que comparaison de dates/heures
export function convertTimeToNumber(time) {
  const hours = time.slice(0, 2);
  // console.log('hours', hours);
  const minuts = time.slice(3, 5);
  // console.log('minuts', minuts);
  const seconds = time.slice(6, 8);
  // console.log('seconds', seconds);

  const toString = `${hours}${minuts}${seconds}`;
  // console.log('toString', toString);
  return Number(toString);
}
