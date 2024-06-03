import CommentDetail from "@/components/BoardDetail/CommentsList";
import CommentInput from "@/components/BoardDetail/CommentInput";

interface BoardDetailProps {
  params: {
    id: string;
  };
}

export default function BoardDetail({ params }: BoardDetailProps) {
  const articleId = parseInt(params.id, 10);

  return (
    <div>
      <CommentInput articleId={articleId} />
      <CommentDetail articleId={articleId} />
    </div>
  );
}
