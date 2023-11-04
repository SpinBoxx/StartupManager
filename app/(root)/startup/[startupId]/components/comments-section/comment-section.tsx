import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import AddCommentForm from "./add-comment-form";
import DisplayComments from "./display-comments";
import { Separator } from "@/components/ui/separator";

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
    include: {
      user: true,
    },
  });

  return (
    <div className={className}>
      <Header
        data={{
          title: "Les commentaires",
          nbItem: comments.length,
        }}
      />
      <AddCommentForm className="mt-4" startupId={startupId} />
      <Separator className="my-6" />
      <DisplayComments className="mt-4" comments={comments} />
    </div>
  );
};

export default CommentsSection;
