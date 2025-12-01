import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware() {
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: '/login',
		},
	}
);

// 保護するページを指定
export const config = {
	matcher: [
		/*
		 * 以下を除くすべてのパスにマッチ:
		 * - /login (ログインページ)
		 * - /api/auth/* (認証API)
		 * - /_next/* (Next.jsの内部ファイル)
		 * - /favicon.ico, /robots.txt など静的ファイル
		 */
		'/((?!login|api/auth|_next/static|_next/image|favicon.ico|robots.txt).*)',
	],
};
