import { useEffect, useState } from 'react';
import Decimal from 'decimal.js';

Decimal.set({ precision: 99, rounding: Decimal.ROUND_HALF_UP });

const significantExponents: { [x: string]: number } = {
  K: 3,
  M: 6,
  B: 9,
  t: 12,
  q: 15,
  Q: 18,
  s: 21,
  S: 24,
  o: 27,
  n: 30,
  d: 33,
  U: 36,
  D: 39,
  T: 42,
  Qt: 45,
  Qd: 48,
  Sd: 51,
  St: 54,
  O: 57,
  N: 60,
  v: 63,
  c: 66,
  Dv: 69,
  Tv: 72,
  Qv: 75,
};

const sortedSignificantExponents = Object.entries(significantExponents).sort(([, a], [, b]) => b - a);

const zero = new Decimal(0);
const ten = new Decimal(10);
const minimum = new Decimal(0.0001);

/**
 * Turn a big integer and decimals into a short display format
 */
function useDisplayNumber(value: string | undefined, decimals: number | undefined): string {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const { infix, prefix, suffix } = formatValue(value, decimals);
    setDisplayValue(`${prefix} ${Number.parseFloat(infix)}${suffix}`); // infix is a safe size to parse
  }, [value, decimals]);

  return displayValue;
}

function formatValue(
  value: string | undefined,
  decimals: number | undefined
): { prefix: string; suffix: string; infix: string } {
  if (!value || !decimals) {
    return { prefix: '', infix: 'nil', suffix: '' };
  }

  const val = new Decimal(value);

  if (val.equals(zero)) {
    return { prefix: '', infix: '0', suffix: '' };
  }

  const quotient = val.div(ten.pow(decimals));
  for (const [key, exponent] of sortedSignificantExponents) {
    if (quotient.greaterThanOrEqualTo(ten.pow(exponent))) {
      return { prefix: '', infix: quotient.div(ten.pow(exponent)).toFixed(2), suffix: key };
    }
  }

  // the number is less than 1000 below this line

  if (quotient.lessThan(minimum)) {
    return { prefix: '<', infix: minimum.toString(), suffix: '' };
  }

  const decimalPlaces = quotient.lessThan(ten) ? 4 : 2;
  return { prefix: '', infix: quotient.toFixed(decimalPlaces), suffix: '' };
}

export default useDisplayNumber;
