import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { config as appConfig, appealingMessage } from "@lib/constants";
import { useAppSelector } from "@lib/redux/store";
import { useNavigate } from "react-router";

export type responseType<T> = T;

export default function useFetch(fetchOnMount = false) {
  const [fetching, setFetching] = React.useState<boolean>(fetchOnMount);
  const token = useAppSelector((s) => s.session.token);
  const navigate = useNavigate();
  const abortControllers = React.useRef<{ controllers: AbortController[] }>({
    controllers: [],
  });

  // const signal = abortController.signal;

  const abortOngoingRequests = React.useCallback(() => {
    abortControllers.current.controllers.map((c) => c.abort());
    abortControllers.current.controllers = [];
  }, []);

  const fetcher = React.useCallback(
    async <T>(config: AxiosRequestConfig): Promise<responseType<T>> => {
      setFetching(true);

      abortOngoingRequests();

      const abortController = new AbortController();
      abortControllers.current.controllers.push(abortController);

      try {
        const response = await axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
          // timeout: 50000,
          signal: abortController.signal,
          baseURL: appConfig.baseUrl,
          validateStatus: function (status) {
            return status <= 500; // Resolve only if the status code is less than 500
          },
        });
        const responseData = await response.data;

        if (response.status == 401) {
          navigate("/login");
          // @ts-ignore
          return {
            error: responseData.message ?? "Session timeout",
            status: false,
          };
        } else if (response.status == 500) {
          // @ts-ignore
          return {
            error: appealingMessage,
            serverError: responseData.message,
            status: false,
          };
        }

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
    [abortOngoingRequests, navigate, token]
  );

  return {
    fetching,
    fetcher,
    setFetching,
  };
}
