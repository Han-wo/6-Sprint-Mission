export interface RootObject {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: string;
  content: string;
  title: string;
  id: number;
}

interface Writer {
  nickname: string;
  id: number;
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getArticleDetail(articleId: number): Promise<RootObject> {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
