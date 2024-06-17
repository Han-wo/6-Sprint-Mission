import { instance } from "./Axios";

interface RootObject {
  id: number;
  title: string;
  content: string;
  image: null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  isLiked: boolean;
}

interface Writer {
  id: number;
  nickname: string;
}

export const postLike = async (
  articleId: number
): Promise<RootObject | undefined> => {
  try {
    const response = await instance.post<RootObject>(
      `/articles/${articleId}/like`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to like the post:", error);
    return undefined;
  }
};

export const deleteLike = async (
  articleId: number
): Promise<RootObject | undefined> => {
  try {
    const response = await instance.delete<RootObject>(
      `/articles/${articleId}/like`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to unlike the post:", error);
    return undefined;
  }
};
