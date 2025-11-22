'use client';

import React from 'react';
import { BookmarkProps } from '@/types';
import { Edit, ExternalLink, Plus, X } from 'lucide-react';

const PRESET_COLORS = [
	'bg-blue-500',
	'bg-green-500',
	'bg-red-500',
	'bg-yellow-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-orange-500',
	'bg-teal-500',
	'bg-cyan-500',
];

/**
 * ブックマークサイドバーを表示するコンポーネント
 */
const BookmarkSidebar = ({
	darkMode,
	bookmarks,
	onToggleMenu,
	isMenuOpen,
	onBookmarkModalOpne,
	onEditBookmarkOpen,
}: BookmarkProps) => {
	return (
		<div
			className={`fixed top-0 right-0 h-full w-96 shadow-2xl transform transition-transform duration-300 ${
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

				{/* ブックマーク追加ボタン */}
				<button
					onClick={() => onBookmarkModalOpne(true)}
					className={`w-full mb-4 p-4 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${
						darkMode
							? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700 text-gray-300'
							: 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600'
					}`}
				>
					<Plus size={20} />
					<span className="font-semibold">ブックマークを追加</span>
				</button>

				{/* 登録されているブックマークをmapで表示 */}
				<div
					className="space-y-3 overflow-y-auto"
					style={{ maxHeight: 'calc(100vh - 200px)' }}
				>
					{bookmarks.map((bookmark, index) => (
						<div
							key={index}
							className={`relative flex items-center gap-3 p-4 rounded-lg transition-all group ${
								darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
							}`}
						>
							{/* アイコン */}
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${
									PRESET_COLORS.includes(bookmark.color) ? bookmark.color : ''
								}`}
								style={
									!PRESET_COLORS.includes(bookmark.color)
										? { backgroundColor: bookmark.color }
										: {}
								}
							>
								{bookmark.iconEmoji}
							</div>

							{/* サイト名（クリック可能） */}
							<a
								href={bookmark.url}
								target="_blank"
								rel="noopener noreferrer"
								title={bookmark.name}
								className={`flex-1 font-semibold group-hover:text-blue-600 transition-colors truncate ${
									darkMode ? 'text-gray-200' : 'text-gray-700'
								}`}
							>
								{bookmark.name}
							</a>

							{/* アクションボタン（ホバー時に表示） */}
							<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								{/* 編集ボタン */}
								{onEditBookmarkOpen && (
									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											onEditBookmarkOpen(bookmark.id);
										}}
										className={`p-2 rounded-lg transition-colors ${
											darkMode
												? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400'
												: 'hover:bg-gray-200 text-gray-500 hover:text-blue-500'
										}`}
										title="編集"
									>
										<Edit size={16} />
									</button>
								)}

								{/* 外部リンクボタン */}
								<a
									href={bookmark.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`p-2 rounded-lg transition-colors ${
										darkMode
											? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400'
											: 'hover:bg-gray-200 text-gray-500 hover:text-blue-500'
									}`}
									title="新しいタブで開く"
									onClick={(e) => e.stopPropagation()}
								>
									<ExternalLink size={16} />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BookmarkSidebar;
