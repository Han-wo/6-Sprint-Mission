import { instance } from "./Axios";

export interface RootObject {
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

export async function getArticleDetail(articleId: number): Promise<RootObject> {
  try {
    const res = await instance.get(`/articles/${articleId}`, {
      headers: {
        Authorization: undefined,
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
}
