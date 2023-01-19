import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;

    const latNum = parseFloat(latitude.toString());
    const lonNum = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      where: {
        latitude: {
          gte: latNum - 0.01,
          lte: latNum + 0.01,
        },
        longitude: {
          gte: lonNum - 0.01,
          lte: lonNum + 0.01,
        },
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
    res.json({
      ok: true,
      post: posts,
    });
  }
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
