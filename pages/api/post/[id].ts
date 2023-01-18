import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avater: true,
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });

  res.json({ ok: true, post });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  })
);
