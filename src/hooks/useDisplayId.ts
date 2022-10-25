/**
 * shorten and normalize a long address or display id
 */
function useDisplayId(str: string | undefined) {
  if (!str) {
    return '';
  }

  const lower = str.toLowerCase();
  const substr = lower.includes('0x') ? lower.split('0x')[1] : lower;

  if (substr.length < 6) {
    return substr;
  }

  return substr.substring(0, 6);
}

export default useDisplayId;
