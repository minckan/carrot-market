import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

// API route에서 session을 받아오기 위한 function
export function withAPISession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

// 페이지를 렌더링 할때 Next.js의 SSR에서 session을 받아오는 function
