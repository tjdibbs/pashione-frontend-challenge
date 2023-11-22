import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { config as appConfig } from "@lib/constants";
import { useAppSelector } from "@lib/redux/store";

export type responseType<T> = T;

export default function useFetch(fetchOnMount = false) {
  const [fetching, setFetching] = React.useState<boolean>(fetchOnMount);
  const token = useAppSelector((s) => s.session.token);

  const fetcher = React.useCallback(
    async <T>(config: AxiosRequestConfig): Promise<responseType<T>> => {
      setFetching(true);
      try {
        const response = await axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
          baseURL: appConfig.baseUrl,
          validateStatus: function (status) {
            return status <= 500; // Resolve only if the status code is less than 500
          },
        });
        const responseData = await response.data;

        return responseData;
      } catch (error: any) {
        console.error(error);
        return {
          error:
            error.message == "Network Error"
              ? "It seems you are offline, please check you internet connection and try again"
              : error.message,
          ...error.data,
        };
      } finally {
        setFetching(false);
      }
    },
    [token]
  );

  return {
    fetching,
    fetcher,
    setFetching,
  };
}
