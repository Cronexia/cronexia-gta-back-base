// * Returns true is the string is a valid email, false otherwise
//    https://stackoverflow.com/a/46181/12026487
export function validateEmail(email: string): boolean {
  const result: RegExpMatchArray | null = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  if (result) {
    return true;
  }
  return false;
}
