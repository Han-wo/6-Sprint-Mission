import { instance } from "./Axios";

export async function postComment(
  articleId: number,
  content: string,
  token: string
) {
  try {
    const response = await instance.post(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post comment:", error);
    throw error;
  }
}
