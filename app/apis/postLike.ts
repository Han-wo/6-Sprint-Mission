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

export const postLike = async (articleId: number, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/articles/${articleId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Failed to like the post:", error);
  }
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
