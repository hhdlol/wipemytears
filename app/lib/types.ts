import { Prisma } from "@prisma/client";

export type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        country: true;
        username: true;
      };
    };
  };
}>;

export type Notification = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: { country: true, username: true },
    },
    post: {
      select: { id: true, title: true },
    },
  };
}>;