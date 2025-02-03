// * ⏳ Promise to wait a defined amout of milliseconds
//      https://stackoverflow.com/a/33292942/12026487
export function timeout(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
