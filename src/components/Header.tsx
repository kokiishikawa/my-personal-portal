'use client';

import { HeaderProps } from '@/types';
import { LogIn, LogOut, Menu, Moon, Sun, User, X } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

/**
 * ヘッダーを表示するコンポーネント
 */
const Header = ({
	darkMode,
	onToggleDarkMode,
	onToggleMenu,
	isMenuOpen,
}: HeaderProps) => {
	const { data: session, status } = useSession();
	const isLoading = status === 'loading';

	return (
		<header className={`shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<h1
						className={`text-2xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						My Portal
					</h1>
				</div>
				<div className="flex items-center gap-2">
					{/* ユーザー情報表示 */}
					{!isLoading && (
						<>
							{session ? (
								<div className="flex items-center gap-2">
									{/* ユーザー名表示 */}
									<div
										className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
											darkMode ? 'bg-gray-700' : 'bg-gray-100'
										}`}
									>
										<User
											size={18}
											className={darkMode ? 'text-gray-300' : 'text-gray-600'}
										/>
										<span
											className={`text-sm ${
												darkMode ? 'text-gray-300' : 'text-gray-700'
											}`}
										>
											{session.user?.name || session.user?.email}
										</span>
									</div>
									{/* ログアウトボタン */}
									<button
										onClick={() => signOut()}
										className={`p-2 rounded-lg transition-colors ${
											darkMode
												? 'hover:bg-gray-700 text-red-400'
												: 'hover:bg-gray-100 text-red-600'
										}`}
										title="ログアウト"
									>
										<LogOut size={20} />
									</button>
								</div>
							) : (
								/* ログインボタン */
								<button
									onClick={() => signIn('google')}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
										darkMode
											? 'bg-blue-600 hover:bg-blue-700 text-white'
											: 'bg-blue-500 hover:bg-blue-600 text-white'
									}`}
								>
									<LogIn size={18} />
									<span>ログイン</span>
								</button>
							)}
						</>
					)}
					{/* ダークモードアクションボタン */}
					<button
						onClick={onToggleDarkMode}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
						}`}
					>
						{darkMode ? (
							<Sun size={24} className="text-yellow-400" />
						) : (
							<Moon size={24} className="text-gray-600" />
						)}
					</button>
					{/* メニュー表示アクションボタン */}
					<button
						onClick={onToggleMenu}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
