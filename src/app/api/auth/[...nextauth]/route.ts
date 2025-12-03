import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],

	callbacks: {
		async jwt({ token, account, user }) {
			// 初回ログイン時（Googleから戻ってきた時）
			if (account && user) {

				try {
					// Django APIを呼び出し
					const response = await fetch(
						`${process.env.API_BASE_URL}/auth/google/`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								id_token: account.id_token,
							}),
						}
					);

					if (!response.ok) {
						throw new Error(`Django API error: ${response.status}`);
					}

					const djangoData = await response.json();

					// Auth.js JWTにDjango JWTを保存
					return {
						...token,
						djangoAccessToken: djangoData.access,
						djangoRefreshToken: djangoData.refresh,
						djangoAccessTokenExpires: Date.now() + 15 * 60 * 1000, // 15分後
						djangoRefreshTokenExpires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7日
						userId: djangoData.user.id,
					};
				} catch (error) {
					console.error('Django API呼び出し失敗:', error);
					return token;
				}
			}

			// Refresh Token自体も期限切れかチェック
			if (Date.now() > (token.djangoRefreshTokenExpires as number)) {
				console.log('Refresh Token期限切れ - 再ログインが必要');
				return { ...token, error: 'RefreshTokenExpired' };
			}

			// 2回目以降（ページ遷移など）
			// トークンリフレッシュが必要かチェック
			if (Date.now() < (token.djangoAccessTokenExpires as number)) {
				// まだ有効
				return token;
			}

			// トークンリフレッシュ（オプション）
			console.log('トークンリフレッシュが必要');
			try {
				const response = await fetch(
					`${process.env.API_BASE_URL}/auth/refresh/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							refresh: token.djangoRefreshToken,
						}),
					}
				);

				if (response.ok) {
					const refreshed = await response.json();
					console.log('トークンリフレッシュ成功');

					return {
						...token,
						djangoAccessToken: refreshed.access,
						djangoRefreshToken: refreshed.refresh,
						djangoAccessTokenExpires: Date.now() + 15 * 60 * 1000,
					};
				}
			} catch (error) {
				console.error('トークンリフレッシュ失敗:', error);
			}

			return token;
		},

		async session({ session, token }) {
			// sessionオブジェクトにDjango JWTを追加
			return {
				...session,
				djangoAccessToken: token.djangoAccessToken,
				djangoRefreshToken: token.djangoRefreshToken,
				userId: token.userId,
			};
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
