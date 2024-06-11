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

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getArticleDetail(articleId: number): Promise<RootObject> {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
