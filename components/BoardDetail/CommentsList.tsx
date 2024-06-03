"use client";
import styles from "@/components/BoardDetail/CommentList.module.css";
import { useState, useEffect } from "react";
import { getComments } from "@/app/apis/getComments";
import { formatDate } from "@/app/utils/formateDate";

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

interface Props {
  articleId: number;
}

export default function CommentDetail({ articleId }: Props) {
  const [comments, setComments] = useState<RootObject | undefined>(undefined);

  useEffect(() => {
    getComments(articleId, 5).then((data) => {
      setComments(data);
    });
  }, [articleId]);

  return (
    <div className={styles.commentsCard}>
      {comments && comments.list ? (
        comments.list.length > 0 ? (
          <ul>
            {comments.list.map((comment) => (
              <li key={comment.id}>
                <div className={styles.content}>{comment.content}</div>
                <div>
                  <span className={styles.nickname}>
                    {comment.writer.nickname}
                  </span>
                  <span className={styles.updatedAt}>
                    {formatDate(comment.updatedAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )
      ) : (
        <p>댓글을 불러오는 중입니다...</p>
      )}
    </div>
  );
}
