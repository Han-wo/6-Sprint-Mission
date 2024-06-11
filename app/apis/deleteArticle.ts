import { instance } from "./Axios";

export const deleteArticle = async (articleId: number): Promise<void> => {
  try {
    await instance.delete(`/articles/${articleId}`);
  } catch (error) {
    console.error("Failed to delete the article:", error);
    throw error;
  }
};
