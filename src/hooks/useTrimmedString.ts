function useTrimmedString(address: string) {
  if (address.length < 10) {
    return address;
  }

  return address.replace(address.substring(6, address.length - 4), '...');
}

export default useTrimmedString;
