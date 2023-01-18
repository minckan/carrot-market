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

  const post = client.post.findUnique({
    where: {
      id: +id.toString(),
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
