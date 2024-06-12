import styles from "@/components/BoardDetail/BoardDetail.module.css";
import { getArticleDetail, RootObject } from "@/app/apis/getArticleDetail";
import { formatDate } from "@/app/utils/formateDate";
import Image from "next/image";
import profileImg from "@/app/assets/images/ic_profile.png";
import LikeButton from "./LikeButton";
import DropdownMenu from "@/components/DropDown";

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
          <DropdownMenu articleId={articleId} />
        </div>
        <div className={styles.tagWrapper}>
          <div className={styles.writerInfo}>
            <Image src={profileImg} alt="프로필아이콘" width={24} height={24} />
            <span className={styles.writer}>{article.writer.nickname}</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <LikeButton
            articleId={article.id}
            initialLikeCount={article.likeCount}
          />
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
