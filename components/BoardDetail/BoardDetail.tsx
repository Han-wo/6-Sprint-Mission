import styles from "@/components/BoardDetail/BoardDetail.module.css";
import { getArticleDetail, RootObject } from "@/app/apis/getArticleDetail";
import { formatDate } from "@/app/utils/formateDate";
import Image from "next/image";
import heartImg from "@/app/assets/images/ic_heart.svg";
import profileImg from "@/app/assets/images/ic_profile.png";
import KebabIcon from "@/app/assets/images/ic_kebab.png";

type Props = {
  articleId: number;
};

export default async function BoardDetail({ articleId }: Props) {
  const article: RootObject = await getArticleDetail(articleId);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{article.title}</div>
          <Image src={KebabIcon} alt="케밥아이콘" />
        </div>
        <div className={styles.tagWrapper}>
          <div className={styles.writerInfo}>
            <Image src={profileImg} alt="프로필아이콘" width={24} height={24} />
            <span className={styles.writer}>{article.writer.nickname}</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <div className={styles.likeCount}>
            <Image src={heartImg} alt="좋아요아이콘" width={24} height={24} />
            {article.likeCount}
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{article.content}</div>
        <div className={styles.imageWrapper}>
          {article.image && (
            <Image
              src={article.image}
              alt="Article Image"
              className={styles.image}
              width={72}
              height={72}
            />
          )}
        </div>
      </div>
    </div>
  );
}
