import { ApiResponse } from '../../types/api';

export default function handleError<T>(e: unknown): ApiResponse<T> {
  let message = 'Unknown error';
  if (
    e &&
    typeof e === 'object' &&
    'response' in e &&
    e.response &&
    typeof e.response === 'object' &&
    'data' in e.response &&
    e.response.data &&
    typeof e.response.data === 'object' &&
    'message' in e.response.data &&
    typeof e.response.data.message === 'string'
  ) {
    message = e.response.data.message;
  } else if (
    e &&
    typeof e === 'object' &&
    'message' in e &&
    typeof e.message === 'string' &&
    'config' in e &&
    e.config &&
    typeof e.config === 'object' &&
    'url' in e.config &&
    typeof e.config.url === 'string'
  ) {
    message = `${e.message}\nURL: ${e.config.url}`;
  } else if (
    e &&
    typeof e === 'object' &&
    'message' in e &&
    typeof e.message === 'string'
  ) {
    message = e.message;
  }

  return {
    result: false,
    message,
  };
}
