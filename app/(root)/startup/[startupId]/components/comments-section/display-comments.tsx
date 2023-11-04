import { cn } from "@/lib/utils";
import { Comment, User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface Props {
  comments: (Comment & { user: User | null })[];
  className?: string;
}

const DisplayComments = ({ comments, className }: Props) => {
  return (
    <div className={cn("space-y-4", className)}>
      {comments.map((comment) => (
        <MessageDiv key={comment.id} comment={comment}></MessageDiv>
      ))}
    </div>
  );
};

const MessageDiv = ({
  comment,
}: {
  comment: Comment & { user: User | null };
}) => {
  dayjs.extend(relativeTime);
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-4">
        <div className="h-8 w-8 rounded-full bg-neutral-500" />
        <div className="flex items-center gap-x-2">
          <span className="text-base font-semibold">
            {comment.user?.username}
          </span>
          <div className="h-2 w-2 rounded-full bg-neutral-300" />
          <span className="text-sm font-normal text-muted-foreground">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="">
        <p className="font-normal text-neutral-700">{comment.message}</p>
      </div>
    </div>
  );
};

export default DisplayComments;
