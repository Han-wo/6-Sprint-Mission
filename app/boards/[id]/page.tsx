import BoardDetail from "@/components/BoardDetail/BoardDetail";
import CommentInput from "@/components/BoardDetail/CommentInput";
import CommentsList from "@/components/BoardDetail/CommentsList";
import styles from "@/app/boards/[id]/Page.module.css";

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
        <CommentInput articleId={articleId} />
        <CommentsList articleId={articleId} />
      </div>
    </div>
  );
}
