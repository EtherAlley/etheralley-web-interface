import { useEffect, useState } from 'react';

export default function useDisplayBalance(balance: string, decimals: number): string {
  const [displayBalance, setDisplayBalance] = useState('0');

  useEffect(() => {
    const shift = balance.length - decimals;
    const number = Number.parseFloat(`${balance.slice(0, shift)}.${balance.slice(shift)}`);
    const fixed = Number.isNaN(number) ? '0' : (Math.round(number * 100) / 100).toFixed(2);
    setDisplayBalance(fixed);
  }, [balance, decimals]);

  return displayBalance;
}
