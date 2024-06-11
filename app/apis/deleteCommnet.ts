import { instance } from "./Axios";

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await instance.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Failed to delete the comment:", error);
    throw error;
  }
};
