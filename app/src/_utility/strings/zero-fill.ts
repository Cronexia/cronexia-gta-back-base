// * Takes a number, convert it to String and prepend zero's
// 👷 Turns 42 to "000000042"
// 🚨 Max stringLength is 20
export function zeroFill(number: number, stringLength: number = 10): string {
  if (stringLength > 20) {
    console.error(
      `app/src/_utility/strings/zeroFill.ts > Maximum stringLength for zeroFill is 20.`,
    );
    throw new Error(
      'app/src/_utility/strings/zeroFill.ts > Maximum stringLength for zeroFill is 20.',
    );
  }

  const zeroFilled = `00000000000000000000${number}`.slice(-stringLength);
  // console.log(zeroFilled);

  return zeroFilled;
}
