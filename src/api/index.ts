export const fetchCoreAPI = async (
  resource: string,
  options: RequestInit = {
    method: 'GET',
  }
): Promise<Response> => {
  const response = await fetch(`${process.env.REACT_APP_CORE_API_FQDN}${resource}`, options);
  if (response.status < 200 || response.status >= 400) {
    throw new Error('invalid status code');
  }
  return response;
};
