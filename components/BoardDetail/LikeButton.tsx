"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/components/BoardDetail/BoardDetail.module.css";

import heartImg from "@/app/assets/images/ic_heart.svg";
import heartfill from "@/app/assets/images/fillheart.png";
import { postLike, deleteLike } from "@/app/apis/postLike";

type Props = {
  articleId: number;
  initialLikeCount: number;
};

export default function LikeButton({ articleId, initialLikeCount }: Props) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    if (isLiked) {
      // 좋아요 취소
      try {
        await deleteLike(articleId);
        setLikeCount((prevCount) => prevCount - 1);
        setIsLiked(false);
      } catch (error) {
        console.error("Failed to delete like:", error);
      }
    } else {
      // 좋아요 추가
      const response = await postLike(articleId);
      if (response) {
        setLikeCount(response.likeCount);
        setIsLiked(response.isLiked);
      }
    }
  };

  return (
    <div className={styles.likeCount} onClick={handleLikeClick}>
      <Image
        src={isLiked ? heartfill : heartImg}
        alt="좋아요아이콘"
        width={24}
        height={24}
      />
      {likeCount}
    </div>
  );
}
