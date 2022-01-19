import { useEffect, useState } from 'react';

export default function useDisplayBalance(balance: string, decimals: number): string {
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
    const display = new Intl.NumberFormat('en-US', { compactDisplay: 'short', notation: 'compact' }).format(number);
    setDisplayBalance(display);
  }, [balance, decimals]);

  return displayBalance;
}
