// * Allow the use of BigInt in API calls
//    @see    https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1721402063
Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});
