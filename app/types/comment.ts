export interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export interface List {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}
