import { AxiosError, AxiosInstance } from "axios";

type RefreshTokenResponse = {
  accessToken: string;
};

export const refreshAccessToken = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken");
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

    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
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

          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
          }

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
