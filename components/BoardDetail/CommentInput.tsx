"use client";
import { useState, useEffect } from "react";
import styles from "@/components/BoardDetail/CommentInput.module.css";
import { BASE_URL } from "@/app/apis/getComments";

interface CommentInputProps {
  articleId: number;
}

export default function CommentInput({ articleId }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (response.ok) {
        setComment("");
      } else {
        console.error("댓글 작성 실패");
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          등록
        </button>
      </div>
    </form>
  );
}
