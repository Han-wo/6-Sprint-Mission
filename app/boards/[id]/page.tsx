import BoardDetail from "@/components/BoardDetail/BoardDetail";
import CommentInput from "@/components/BoardDetail/CommentInput";
import CommentsList from "@/components/BoardDetail/CommentsList";
import styles from "@/app/boards/[id]/Page.module.css";
import backIcon from "@/app/assets/images/ic_back.png";
import Link from "next/link";
import Image from "next/image";

interface BoardDetailProps {
  params: {
    id: string;
  };
}

export default function BoardDetailPage({ params }: BoardDetailProps) {
  const articleId = parseInt(params.id, 10);

  return (
    <div>
      <div className={styles.boardDetail}>
        <BoardDetail articleId={articleId} />
        <label className={styles.commentLabel}>댓글달기</label>
        <CommentInput articleId={articleId} />
        <CommentsList articleId={articleId} />
        <div className={styles.commentButtonContainer}>
          <Link href="/boards">
            <button className={styles.backButton}>
              <div className={styles.buttonText}>목록으로 돌아가기</div>
              <Image width={24} height={24} src={backIcon} alt="돌아가기" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
