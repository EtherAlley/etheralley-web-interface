import { useEffect, useState } from 'react';

function useHexToRgb(hex: string): string {
  const [rgb, setRgb] = useState<string>('');

  useEffect(() => {
    const val = hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_: string, r: string, g: string, b: string) => '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16))
      .join(',');
    if (val) {
      setRgb(val);
    }
  }, [hex]);

  return rgb;
}

export default useHexToRgb;
