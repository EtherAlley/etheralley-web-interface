import Settings from './settings';

export type Result<T> = {
  data?: T;
  error?: ResultError;
};

export type ResultError = {
  status: number;
  message: string;
};

export const FetchCoreAPI = async <T>(
  resource: string,
  options: RequestInit = { method: 'GET' }
): Promise<Result<T>> => {
  const response = await fetch(`${Settings.PROFILES_API_URL}${resource}`, options);

  const textBody = await response.text();

  if (response.status < 200 || response.status >= 400) {
    return { error: { status: response.status, message: textBody } };
  }

  // if there is text in the response, we assume its valid json
  if (textBody) {
    try {
      const data = JSON.parse(textBody);
      return { data };
    } catch (ex) {
      return { error: { status: response.status, message: 'error parsing json' } };
    }
  }

  return {};
};
