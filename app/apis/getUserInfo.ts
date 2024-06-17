import { instance } from "./Axios";

interface UserInfo {
  id: number;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await instance.get<UserInfo>("/users/me");
    return response.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    throw error;
  }
};
