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
    body: { answer },
    session: { user },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    res.status(404).end();
  }
  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      answer: answer,
    },
  });

  res.json({ ok: true, answer: newAnswer });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler: handler,
  })
);
