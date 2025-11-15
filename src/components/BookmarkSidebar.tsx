'use client';

import React from 'react';
import { BookmarkProps } from '@/types';
import { ExternalLink, X } from 'lucide-react';

/**
 * ブックマークサイドバーを表示するコンポーネント
 */
const BookmarkSidebar = ({
	darkMode,
	bookmarks,
	onToggleMenu,
	isMenuOpen,
}: BookmarkProps) => {
	return (
		<div
			className={`fixed top-0 right-0 h-full w-80 shadow-2xl transform transition-transform duration-300 ${
				isMenuOpen ? 'translate-x-0' : 'translate-x-full'
			} z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
		>
			{/* ブックマークヘッダー */}
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h2
						className={`text-2xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						よく使うサイト
					</h2>
					<button
						onClick={onToggleMenu}
						className={`p-2 rounded-lg ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						<X size={24} />
					</button>
				</div>
				{/* 登録されているブックマークをmapで表示 */}
				<div className="space-y-3">
					{bookmarks.map((bookmark, index) => (
						<a
							key={index}
							href={bookmark.url}
							target="_blank"
							rel="noopener noreferrer"
							className={`flex items-center gap-3 p-4 rounded-lg transition-colors group ${
								darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
							}`}
						>
							<div
								className={`w-12 h-12 ${bookmark.color} rounded-lg flex items-center justify-center text-2xl`}
							>
								{bookmark.iconImage}
							</div>
							<span
								className={`flex-1 font-semibold group-hover:text-blue-600 ${
									darkMode ? 'text-gray-200' : 'text-gray-700'
								}`}
							>
								{bookmark.name}
							</span>
							<ExternalLink
								size={18}
								className="text-gray-400 group-hover:text-blue-600"
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default BookmarkSidebar;
