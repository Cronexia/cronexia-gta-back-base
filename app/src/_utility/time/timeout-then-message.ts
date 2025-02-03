// * ⏳ Promise to wait a defined amout of milliseconds, then send back a string
//      https://stackoverflow.com/a/33292942/12026487
export function timeoutThenMessage(ms, message): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`timeoutThenMessage: ${message}`);
      return resolve(message);
    }, ms),
  );
}
