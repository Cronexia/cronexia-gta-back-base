import { verifyResource } from './resource';
import { verifyPeriod } from './period';

// * 📌🐯 Verify Args and Throw if necessary

// No return, just throw if error
export function verifyResourceAndPeriod(resource, period, errorFrom) {
  verifyResource(resource, errorFrom);
  verifyPeriod(period, errorFrom);
}
