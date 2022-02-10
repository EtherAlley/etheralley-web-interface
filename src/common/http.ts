import Settings from './settings';

export type RequestConfig = {
  resource: string;
  options?: RequestInit;
};

export const fetchAPI = async <T>(resource: string, options?: RequestInit): Promise<T> => {
  const response = await fetchInternal(resource, options);
  return response.json();
};

export const fetchAPINoResponse = async (resource: string, options?: RequestInit): Promise<void> => {
  await fetchInternal(resource, options);
  return;
};

const fetchInternal = async (resource: string, options: RequestInit = { method: 'GET' }): Promise<Response> => {
  const response = await fetch(`${Settings.CORE_API_URL}${resource}`, options);
  if (response.status < 200 || response.status >= 400) {
    throw new Error('invalid status code');
  }
  return response;
};
