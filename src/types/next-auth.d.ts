import 'next-auth';

declare module 'next-auth' {
	interface Session {
		djangoAccessToken?: string;
		djangoRefreshToken?: string;
		userId?: number;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		djangoAccessToken?: string;
		djangoRefreshToken?: string;
		djangoAccessTokenExpires?: number;
		userId?: number;
	}
}
