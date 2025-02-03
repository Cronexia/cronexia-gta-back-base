// * Returns true is the string is a valid phone number, false otherwise
//    https://stackoverflow.com/a/33561517/12026487
// Matches
//  1234567890
//  12 34 56 78 90
//  +31636363634
//  (123) 456-7890
//  +(123) 456-7890
//  +(123)-456-7890
//  +(123) - 456-7890
//  +(123) - 456-78-90
//  123-456-7890
//  123.456.7890
//  075-63546725
export function validatePhoneNumber(email: string): boolean {
  // Remove all spaces before test
  email = email.replace(/\s/g, '');

  // length tests
  if (email.length < 10 || email.length > 15) {
    return false;
  }

  const result: RegExpMatchArray | null = String(email)
    .toLowerCase()
    .match(
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    );

  if (result) {
    return true;
  }
  return false;
}
