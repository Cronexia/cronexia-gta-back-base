// * ⏳ Function wait for X millisecs
export function delay(ms) {
  new Promise((res) => setTimeout(res, ms));
}
