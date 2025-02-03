// * Library of calculation functions
// v1: Original from Stack overflow / trincot / https://stackoverflow.com/a/47761792/12026487
// v2: Adapted to Typescript by me (max)
// v3: Better singleton & cache implementation

// 👷 Usage
//      import { calculation } from '../../../_utility/maths/calculation';
//      const expression = '5 + 3 / 2';
//      calculation.calculate(expression);

// TODO: 🔍 To check
//    alternative: https://github.com/silentmatt/expr-eval

'use strict';

let instance;

class Calculation {
  _symbols: any;
  calculationCache: object;

  constructor() {
    if (instance) {
      return instance;
    }

    this.calculationCache = {};

    this._symbols = {};
    this.defineOperator('!', this.factorial, 'postfix', 6);
    this.defineOperator('^', Math.pow, 'infix', 5, true);
    this.defineOperator('*', this.multiplication, 'infix', 4);
    this.defineOperator('/', this.division, 'infix', 4);
    this.defineOperator('+', this.last, 'prefix', 3);
    this.defineOperator('-', this.negation, 'prefix', 3);
    this.defineOperator('+', this.addition, 'infix', 2);
    this.defineOperator('-', this.subtraction, 'infix', 2);
    this.defineOperator(',', Array.of, 'infix', 1);
    this.defineOperator('(', this.last, 'prefix');
    this.defineOperator(')', null, 'postfix');
    this.defineOperator('min', Math.min);
    this.defineOperator('sqrt', Math.sqrt);
    this.defineOperator('pi', Math.PI); // A constant

    // eslint-disable-next-line
    instance = this;
  }

  // 🗑️⚡️ Clear all calculation cache
  clearCalculationCache() {
    this.calculationCache = {};
  }

  // * All the maths stuff
  // TODO: unbloat . . .
  // Method allowing to extend an instance with more operators and functions:
  defineOperator(
    symbol,
    f,
    notation = 'func',
    precedence = 0,
    rightToLeft = false,
  ) {
    // Store operators keyed by their symbol/name. Some symbols may represent
    // different usages: e.g. "-" can be unary or binary, so they are also
    // keyed by their notation (prefix, infix, postfix, func):
    if (notation === 'func') precedence = 0;
    this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
      [notation]: {
        symbol,
        f,
        notation,
        precedence,
        rightToLeft,
        argCount: 1 + (notation === 'infix' ? 1 : 0),
      },
      symbol,
      regSymbol:
        symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') +
        (/\w$/.test(symbol) ? '\\b' : ''), // add a break if it's a name
    });
  }
  last(...a) {
    return a[a.length - 1];
  }
  negation(a) {
    return -a;
  }
  addition(a, b) {
    return a + b;
  }
  subtraction(a, b) {
    return a - b;
  }
  multiplication(a, b) {
    return a * b;
  }
  division(a, b) {
    return a / b;
  }
  factorial(a) {
    if (a % 1 || !(+a >= 0)) return NaN;
    if (a > 170) return Infinity;
    let b = 1;
    while (a > 1) b *= a--;
    return b;
  }
  calculate(expression) {
    // ⚡️ Cache: if calculation already done for this expresion, return the stored result
    if (this.calculationCache.hasOwnProperty(expression)) {
      // console.log('⚡️ Calculation from cache ⚡️');
      return this.calculationCache[expression];
    }

    let match;
    const values = [],
      operators = [this._symbols['('].prefix],
      exec = () => {
        const op = operators.pop();
        values.push(op.f(...[].concat(...values.splice(-op.argCount))));
        return op.precedence;
      },
      error = (msg) => {
        const notation = match ? match.index : expression.length;
        const errorMsg = `${msg} at ${notation}:\n${expression}\n${' '.repeat(
          notation,
        )}^`;
        this.calculationCache[expression] = errorMsg;
        return errorMsg;
      },
      pattern = new RegExp(
        // Pattern for numbers
        '\\d+(?:\\.\\d+)?|' +
          // ...and patterns for individual operators/function names
          Object.values(this._symbols)
            // longer symbols should be listed first
            .sort((a, b) => b['symbol'].length - a['symbol'].length)
            .map((val) => val['regSymbol'])
            .join('|') +
          '|(\\S)',
        'g',
      );
    let afterValue = false;
    pattern.lastIndex = 0; // Reset regular expression object
    do {
      match = pattern.exec(expression);
      // eslint-disable-next-line
      let [token, bad] = match || [')', undefined];
      // Replace constant names (like PI) with corresponding value
      if (typeof this._symbols[token]?.func?.f === 'number')
        token = this._symbols[token].func?.f;
      const notNumber = this._symbols[token],
        notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
        notAfterValue = !notNumber || (!notNumber.postfix && !notNumber.infix);
      // Check for syntax errors:
      if (bad || (afterValue ? notAfterValue : notNewValue)) {
        const errorMsg = 'Syntax error';
        this.calculationCache[expression] = errorMsg;
        return error('Syntax error');
      }
      if (afterValue) {
        // We either have an infix or postfix operator (they should be mutually exclusive)
        const curr = notNumber.postfix || notNumber.infix;
        do {
          const prev = operators[operators.length - 1];
          if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0)
            break;
          // Apply previous operator, since it has precedence over current one
        } while (exec()); // Exit loop after executing an opening parenthesis or function
        afterValue = curr.notation === 'postfix';
        if (curr.symbol !== ')') {
          operators.push(curr);
          // Postfix always has precedence over any operator that follows after it
          if (afterValue) exec();
        }
      } else if (notNumber) {
        // prefix operator or function
        operators.push(notNumber.prefix || notNumber.func);
        if (notNumber.func) {
          // Require an opening parenthesis
          match = pattern.exec(expression);
          if (!match || match[0] !== '(') {
            const errorMsg = 'Function needs parentheses';
            this.calculationCache[expression] = errorMsg;
            return error(errorMsg);
          }
        }
      } else {
        // number
        values.push(+token);
        afterValue = true;
      }
    } while (match && operators.length);

    // Last set of checks & return calculation results
    if (operators.length) {
      const errorMsg = 'Missing closing parenthesis';
      this.calculationCache[expression] = errorMsg;
      return error(errorMsg);
    } else {
      if (match) {
        const errorMsg = 'Too many closing parentheses';
        this.calculationCache[expression] = errorMsg;
        return error(errorMsg);
      } else {
        const result = values.pop(); // All done!
        this.calculationCache[expression] = result;
        return result; // All done!
      }
    }
  }
}
export const calculation = Object.freeze(new Calculation()); // Create a singleton

// Tests
const tests = [
  { expr: '1+2', expected: 3 },
  { expr: '1+2*3', expected: 7 },
  { expr: '1+2*3^2', expected: 19 },
  { expr: '1+2*2^3^2', expected: 1025 },
  { expr: '-3!', expected: -6 },
  { expr: '12---11+1-3', expected: -1 },
  { expr: 'min(2,1,3)', expected: 1 },
  { expr: '(2,1,3)', expected: 3 },
  { expr: '4-min(sqrt(2+2*7),9,5)', expected: 0 },
  { expr: '2,3,10', expected: 10 },
  { expr: 'pi*2', expected: Math.PI * 2 },
];

export function runTests() {
  for (const { expr, expected } of tests) {
    const result = calculation.calculate(expr);
    console.assert(
      result === expected,
      `${expr} should be ${expected}, but gives ${result}`,
    );
  }
}
