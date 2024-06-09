export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface RootObject {
  nextCursor: number;
  list: List[];
}

interface List {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export async function getComments(
  articleId: number,
  limit: number
): Promise<RootObject> {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments?limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}
