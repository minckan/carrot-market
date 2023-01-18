import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include: {
        user: true,
      },
    });
    res.json({
      ok: true,
      post: posts,
    });
  }
  if (req.method === "POST") {
    const {
      body: { question },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      post,
    });
  }
}

export default withAPISession(
  withHandler({
    methods: ["POST", "GET"],
    handler: handler,
  })
);
