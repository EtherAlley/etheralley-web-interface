import Settings from '../common/settings';

export const fetchCoreAPI = async (
  resource: string,
  options: RequestInit = {
    method: 'GET',
  }
): Promise<Response> => {
  const response = await fetch(`${Settings.CORE_API_URL}${resource}`, options);
  if (response.status < 200 || response.status >= 400) {
    throw new Error('invalid status code');
  }
  return response;
};
