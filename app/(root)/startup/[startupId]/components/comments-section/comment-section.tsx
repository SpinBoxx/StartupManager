import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import AddCommentForm from "./add-comment-form";
import DisplayComments from "./display-comments";

interface Props {
  className?: string;
  startupId: number;
}

const CommentsSection = async ({ className, startupId }: Props) => {
  const comments = await prismadb.comment.findMany({
    where: {
      startupId,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className={className}>
      <Header
        data={{
          title: "Les commentaires",
          description: "Retrouve ici tous les commentaires liés à la startup.",
          nbItem: comments.length,
        }}
      />
      <AddCommentForm className="mt-4" startupId={startupId} />
      <DisplayComments comments={comments} />
    </div>
  );
};

export default CommentsSection;
