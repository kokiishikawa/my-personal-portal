'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function LoginPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { darkMode, mounted } = useDarkMode();
	const isLoading = status === 'loading';

	// ログイン済みの場合はトップページにリダイレクト
	useEffect(() => {
		if (session) {
			router.push('/');
		}
	}, [session, router]);

	if (!mounted || isLoading) {
		return <div className="min-h-screen bg-gray-900" />;
	}

	return (
		<div
			className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
				darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-gray-100'
			}`}
		>
			<div
				className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				{/* ロゴ・タイトル */}
				<div className="text-center mb-8">
					<h1
						className={`text-4xl font-bold mb-2 ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						My Portal
					</h1>
					<p
						className={`text-sm ${
							darkMode ? 'text-gray-400' : 'text-gray-600'
						}`}
					>
						あなたの生産性を最大化するポータルサイト
					</p>
				</div>

				{/* 説明 */}
				<div className="mb-6">
					<h2
						className={`text-xl font-semibold mb-3 ${
							darkMode ? 'text-gray-100' : 'text-gray-700'
						}`}
					>
						ようこそ!
					</h2>
					<p
						className={`text-sm ${
							darkMode ? 'text-gray-300' : 'text-gray-600'
						}`}
					>
						タスク管理、スケジュール管理、ブックマークなど、
						あなたの日常をサポートする機能が揃っています。
					</p>
				</div>

				{/* ログインボタン */}
				<button
					onClick={() => signIn('google', { callbackUrl: '/' })}
					className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
						darkMode
							? 'bg-blue-600 hover:bg-blue-700 text-white'
							: 'bg-blue-500 hover:bg-blue-600 text-white'
					} shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Googleでログイン
				</button>

				{/* フッター */}
				<p
					className={`text-xs text-center mt-6 ${
						darkMode ? 'text-gray-500' : 'text-gray-500'
					}`}
				>
					ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
				</p>
			</div>
		</div>
	);
}
