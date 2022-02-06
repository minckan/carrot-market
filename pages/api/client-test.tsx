import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function handelr(
    req:NextApiRequest, res: NextApiResponse
) {
   await client.user.create({
        data: {
            email: 'hi@naver.com',
            name: '경원'
        }
    })
    res.json({
        ok: true
    })
}