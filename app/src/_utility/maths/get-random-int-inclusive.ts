// * 🔀🔢 Get a random int number between [min & max] inclusive
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
