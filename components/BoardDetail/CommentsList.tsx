import styles from "@/components/BoardDetail/CommentList.module.css";
import { getComments } from "@/app/apis/getComments";
import emptyCommentImg from "@/app/assets/images/Img_reply_empty.png";
import { formatTimes } from "@/app/utils/fotmatTime";
import KebabIcon from "@/app/assets/images/ic_kebab.png";
import ProfileImg from "@/app/assets/images/ic_profile.png";
import Image from "next/image";

interface Props {
  articleId: number;
}

export default async function CommentDetail({ articleId }: Props) {
  const { list: comments } = await getComments(articleId, 5);

  return (
    <div className={styles.commentsCard}>
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className={styles.contentWrapper}>
                <div className={styles.content}>{comment.content}</div>
                <Image src={KebabIcon} alt="케밥아이콘" />
              </div>
              <div className={styles.WriterInfoWrapper}>
                <Image
                  src={ProfileImg}
                  alt="프로필아이콘"
                  width={32}
                  height={32}
                />
                <div className={styles.writerInfo}>
                  <span className={styles.nickname}>
                    {comment.writer.nickname}
                  </span>
                  <span className={styles.updatedAt}>
                    {formatTimes(comment.updatedAt)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.notcomments}>
          <Image
            src={emptyCommentImg}
            alt="댓글이 없습니다."
            width={140}
            height={140}
          />
          <div className={styles.noCommnets}>아직 댓글이 없어요.</div>
          <div className={styles.noCommnets}>지금 댓글을 달어보세요</div>
        </div>
      )}
    </div>
  );
}
