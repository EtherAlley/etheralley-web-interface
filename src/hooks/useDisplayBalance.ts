import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export default function useDisplayBalance(balance: string, decimals: number): string {
  const intl = useIntl();
  const [displayBalance, setDisplayBalance] = useState('0');

  useEffect(() => {
    const shift = balance.length - decimals;
    let number = 0;
    if (shift >= 0) {
      number = Number.parseFloat(`${balance.slice(0, shift)}.${balance.slice(shift)}`);
    } else {
      let numString = '';
      for (let i = Math.abs(shift); i > 0; i--) {
        numString += '0';
      }
      number = Number.parseFloat(`${numString}.${balance}`);
    }
    const display = intl.formatNumber(number, { compactDisplay: 'short', notation: 'compact' });
    setDisplayBalance(display);
  }, [balance, decimals, intl]);

  return displayBalance;
}
