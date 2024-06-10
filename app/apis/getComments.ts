export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface RootObject {
  nextCursor: number;
  list: List[];
}

export interface List {
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
  limit: number,
  cursor?: number
): Promise<RootObject> {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());

  if (cursor) {
    queryParams.append("cursor", cursor.toString());
  }

  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments?${queryParams.toString()}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}
