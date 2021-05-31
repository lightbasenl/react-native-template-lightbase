import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

import { QueryClient } from 'react-query';
import Bugsnag from '@bugsnag/react-native';

export const errorReporting = (error: AxiosError) => {
  // Log all api errors
  if (error?.response) {
    const url = error.response?.config.url || '';
    let grouping = '';
    if (!__DEV__) {
      Bugsnag.notify(error, (report) => {
        report.errors[0].errorClass = `[${error.response?.status} ${error.response?.config.method}] - ${url}`;
        report.groupingHash = grouping || report.errors[0].errorClass;
        report.addMetadata('api', {
          type: 'error',
          data: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      });
    }
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      notifyOnChangeProps: 'tracked',
      // @ts-expect-error - Axios error type
      onError: errorReporting,
    },
    mutations: {
      // @ts-expect-error - Axios error type
      onError: errorReporting,
      throwOnError: true,
    },
  },
});

export const api = axios.create({
  baseURL: Config.API_URL,
});

export const authApi = axios.create({
  baseURL: Config.AUTH_URL,
});
