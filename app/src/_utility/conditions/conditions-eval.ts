// * Eval Counter Conditions content
// v1: Use eval to process conditions to Booleans
// v2: Singleton & cache
// TODO: 🌱 Implement better security, even if rendered server side (no access to window, etc.)

// 👷 Usage
//      import { conditionEval, runConditionsEvalTests } from '../_utility/conditions/conditions-eval';
//      console.log(runConditionsEvalTests());
//      const userResult = conditionEval.calculate(expression);
//      console.log(userResult);

// TODO: 🔍 To check
//    alternative DEPRECATED: https://github.com/donmccurdy/expression-eval

'use strict';

let instance;

class ConditionsEval {
  wordsWhiteList: Array<string> = ['in', 'not in'];
  wordsWhiteListRegExp: RegExp;
  conditionsEvalCache: object;

  constructor() {
    if (instance) {
      return instance;
    }

    // depression > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    // this.regExp = /(?:$|^| )(words|sentence)(?:$|^| )/g;
    // this.regExp = /\b(words|sentence)\b/g;
    // ~💩 HS, la regexp, pas le principe
    // TODO: Ne conserver que les mots entiers de la liste en dur
    this.wordsWhiteListRegExp = new RegExp(
      `\b(${this.wordsWhiteList.join('|')})\b`,
      'g',
    );

    this.conditionsEvalCache = {};

    // eslint-disable-next-line
    instance = this;
  }

  // 🗑️⚡️ Clear all conditions eval cache
  clearConditionsEvalCache() {
    this.conditionsEvalCache = {};
  }

  calculate(expression) {
    // ⚡️ Cache: if conditions eval already done for this expresion, return the stored result
    if (this.conditionsEvalCache.hasOwnProperty(expression)) {
      // console.log('⚡️ ConditionsEval from cache ⚡️');
      return this.conditionsEvalCache[expression];
    }

    // * 🔒️ Quick security
    // Force string type/conversion
    expression = expression.toString();
    // convert to lowercase
    expression = expression.toLowerCase();

    // Remove consecutive spaces
    expression = expression.replace(/\s+/g, ' ');
    // console.log(expression); console.log();

    // * Remove unwanted characters
    //  Keeping alpha-numeric & operators
    //    && ||
    //    == != < >
    //    \s keep spaces
    //    " for strings
    expression = expression.replace(/[^a-zA-Z0-9\s\&\|\=\!<>\"]/g, '');
    // console.log(expression); console.log();

    // TODO: 💩 Only keep safe words
    // expression = expression.replace(this.wordsWhiteListRegExp, '');
    // console.log(expression); console.log();

    //  * Evalutation result
    // Set to cache & send back
    try {
      const result = eval(expression);
      if (result === undefined) {
        const errorMsg = `🐛 Error: ConditionsEval > calculate() > result for '${expression}' couldn't be evaluated (returned undefined).`;
        console.error(errorMsg);
        this.conditionsEvalCache[expression] = errorMsg;
        return errorMsg;
      }
      this.conditionsEvalCache[expression] = result;
      return result;
    } catch (e) {
      let errorMsg = `🐛 Error: ConditionsEval > calculate() > result for '${expression}' proced an error.`;
      console.error(errorMsg);
      console.error(e);
      errorMsg += `\n${e}\n\nMore details in console.`;

      this.conditionsEvalCache[expression] = errorMsg;
      return errorMsg;
    }
  }
}
export const conditionEval = Object.freeze(new ConditionsEval()); // Create a singleton

// Tests
const tests = [
  // Boolean
  { expr: 'true == true', expected: true },
  { expr: 'true == false', expected: false },
  { expr: 'true == true', expected: true }, // 📌⚡️ Test cache
  { expr: 'true != true', expected: false },
  { expr: 'true != false', expected: true },

  // Numeric
  { expr: '1 == 1 ', expected: true },
  { expr: '1 == 2 ', expected: false },
  { expr: '1 != 2 ', expected: true },
  { expr: '1 != 1 ', expected: false },
  { expr: '1 > 2 ', expected: false },
  { expr: '2 > 1 ', expected: true },
  { expr: '1 > 1 ', expected: false },
  { expr: '1 >= 1 ', expected: true },
  { expr: '2 >= 1 ', expected: true },
  { expr: '1 >= 2 ', expected: false },
  { expr: '1 < 2 ', expected: true },
  { expr: '1 < 1 ', expected: false },
  { expr: '2 < 1 ', expected: false },
  { expr: '1 <= 1 ', expected: true },
  { expr: '1 <= 2 ', expected: true },
  { expr: '2 <= 1 ', expected: false },

  // String
  { expr: '"a" == "a"', expected: true },
  { expr: '"a" == "b"', expected: false },
  { expr: '"a" != "a"', expected: false },
  { expr: '"a" != "b"', expected: true },

  // Opérateurs logiques
  { expr: 'true && true', expected: true },
  { expr: 'true && false', expected: false },
  { expr: 'false && false', expected: false },
  { expr: 'true || true', expected: true },
  { expr: 'true || false', expected: true },
  { expr: 'false || false', expected: false },
];

export function runConditionsEvalTests() {
  // console.log('runConditionsEvalTests()');
  let displayResults = '';
  for (const { expr, expected } of tests) {
    const result = conditionEval.calculate(expr);
    displayResults += `${expr}\t: ${result}\n`;
    console.assert(
      result === expected,
      `${expr} should be ${expected}, but gives ${result}`,
    );
  }
  return displayResults;
}
