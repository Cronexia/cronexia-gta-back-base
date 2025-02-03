// * Quick class with optionnal props test

// JS Classes       / https://www.typescriptlang.org/docs/handbook/classes.html
// Optional params  / https://www.drewtown.dev/post/optional-function-parameters-with-default-values-via-javascripts-object-spreading/
//                  / https://medium.com/@kubiak.maciej/optional-spreading-in-js-f6891b6a3f04
class QuickClassWithOptionnalPropsTest {
  mandatory: string; // ✨ unique
  optional?: string = null;

  constructor(mandatory: string, optionalParams?: { optional: string }) {
    this.mandatory = mandatory;

    const optionalDefaults = {
      optional: null,
      // Default overload thourgh deconstruction
      ...optionalParams,
    };

    this.optional = optionalDefaults.optional;
  }

  toString() {
    return `mandatory '${this.mandatory}'${
      this.optional ? `, optional '${this.optional}'` : '' // display only if filled
    }`;
  }
}

export const onlyMandatory = new QuickClassWithOptionnalPropsTest(
  'only mandatory',
);
export const wOptParams = new QuickClassWithOptionnalPropsTest('mandatory', {
  optional: 'wOptParams',
});

// Test optionnal Params typing
// export const wOptParams = new QuickClassWithOptionnalPropsTest();
