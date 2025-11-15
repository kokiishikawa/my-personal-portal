'use client';

import { HeaderProps } from '@/types';
import { Menu, Moon, Sun, X } from 'lucide-react';
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
