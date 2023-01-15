import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";



async function handelr(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    res.status(200).end()

}

export default withHandler("POST", handelr);
