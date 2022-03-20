import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';

export default async function handelr(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body.email);
    /* 
        클라이언트에서 header에 컨텐트타입:어플리케이션/제이슨을 하지 않고 
        req.body.email 을 했을경우 undefined 출력.
        why? req.body는 req의 내용의 인코딩을 기준으로 parse(인코딩)되기 때문
    */
    if (req.method !== 'POST') {
        res.status(401).end
    }
    res.status(200).end()
}