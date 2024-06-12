import { AxiosError, AxiosInstance } from "axios";

type RefreshTokenResponse = {
  accessToken: string;
};

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

export const refreshAccessToken = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error: any) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            return Promise.reject(error);
          }

          const response = await instance.post<RefreshTokenResponse>(
            "/auth/refresh-token",
            {
              refreshToken,
            }
          );
          const { accessToken } = response.data;

          setAccessToken(accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          if (refreshError instanceof AxiosError) {
            console.error(
              "액세스 토큰 갱신 실패 (Axios error):",
              refreshError.message
            );
          } else {
            console.error(
              "액세스 토큰 갱신 실패 (Unknown error):",
              refreshError
            );
          }
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};
