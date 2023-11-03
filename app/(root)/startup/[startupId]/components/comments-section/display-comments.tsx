import { Comment } from "@prisma/client";

interface Props {
  comments: Comment[];
}

const DisplayComments = ({ comments }: Props) => {
  return (
    <div>
      {comments.map((comment) => (
        <p>{comment.message}</p>
      ))}
    </div>
  );
};

export default DisplayComments;
