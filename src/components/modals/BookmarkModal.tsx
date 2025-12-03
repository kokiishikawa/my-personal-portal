'use client';

import { BookmarkModalProps } from '@/types';
import { X, Check, Smile } from 'lucide-react';
import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

/**
 * ブックマーク登録モーダルコンポーネント
 * 名前、URL、絵文字、カラーを追加する
 */
const BookmarkModal = ({
	darkMode,
	newBookmark,
	setNewBookmark,
	onBookmarkModalOpne,
	onAddBookmark,
}: BookmarkModalProps) => {
	const [selectedColor, setSelectedColor] = useState('bg-blue-500');
	const [customColor, setCustomColor] = useState('#3B82F6');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const colors = [
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

	const handleCustomColorChange = (hexColor: string) => {
		setCustomColor(hexColor);
		setSelectedColor('custom');
	};

	const onEmojiClick = (emojiData: EmojiClickData) => {
		setNewBookmark({ ...newBookmark, iconEmoji: emojiData.emoji });
		setShowEmojiPicker(false);
	};

	return (
		<div
			onClick={() => onBookmarkModalOpne(false)}
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
		>
			{/* モーダルヘッダー */}
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						新しいブックマーク
					</h3>
					<button
						onClick={() => onBookmarkModalOpne(false)}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						<X size={24} />
					</button>
				</div>

				{/* 情報入力 */}
				<div className="space-y-3 mb-4">
					{/* サイト名 */}
					<input
						type="text"
						value={newBookmark.name}
						onChange={(e) =>
							setNewBookmark({ ...newBookmark, name: e.target.value })
						}
						placeholder="サイト名を入力..."
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								: 'border-gray-300'
						}`}
					/>

					{/* URL */}
					<input
						type="url"
						value={newBookmark.url}
						onChange={(e) =>
							setNewBookmark({ ...newBookmark, url: e.target.value })
						}
						placeholder="URLを入力... (https://example.com)"
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								: 'border-gray-300'
						}`}
					/>

					{/* アイコン（絵文字ピッカー付き） */}
					<div className="relative">
						<div className="flex gap-2">
							<input
								type="text"
								value={newBookmark.iconEmoji}
								onChange={(e) =>
									setNewBookmark({ ...newBookmark, iconEmoji: e.target.value })
								}
								placeholder="🔖"
								maxLength={2}
								className={`flex-1 px-4 py-2 border rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									darkMode
										? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
										: 'border-gray-300'
								}`}
							/>
							<button
								type="button"
								onClick={() => setShowEmojiPicker(!showEmojiPicker)}
								className={`px-4 py-2 border rounded-lg transition-colors ${
									darkMode
										? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
										: 'border-gray-300 hover:bg-gray-50'
								}`}
							>
								<Smile size={24} />
							</button>
						</div>

						{/* 絵文字ピッカー */}
						{showEmojiPicker && (
							<div className="absolute top-full mt-2 z-10">
								<EmojiPicker
									onEmojiClick={onEmojiClick}
									theme={darkMode ? Theme.DARK : Theme.LIGHT}
									width={300}
									height={400}
								/>
							</div>
						)}
					</div>

					{/* カラー選択 */}
					<div>
						<label
							className={`block mb-2 text-sm font-medium ${
								darkMode ? 'text-gray-300' : 'text-gray-700'
							}`}
						>
							背景色
						</label>
						<div className="grid grid-cols-5 gap-2 mb-3">
							{colors.map((color) => (
								<button
									key={color}
									type="button"
									onClick={() => {
										setSelectedColor(color);
										setNewBookmark({ ...newBookmark, color: color });
									}}
									className={`w-full h-10 rounded-lg ${color} hover:opacity-80 transition-all relative ${
										selectedColor === color
											? 'ring-2 ring-offset-2 ring-gray-400'
											: ''
									}`}
								>
									{selectedColor === color && (
										<Check
											size={20}
											className="absolute inset-0 m-auto text-white drop-shadow-lg"
										/>
									)}
								</button>
							))}
						</div>

						{/* カスタムカラーピッカー */}
						<div className="flex items-center gap-3">
							<label
								className={`text-sm ${
									darkMode ? 'text-gray-300' : 'text-gray-700'
								}`}
							>
								カスタムカラー:
							</label>
							<div className="flex items-center gap-2 flex-1">
								<input
									type="color"
									value={customColor}
									onChange={(e) => handleCustomColorChange(e.target.value)}
									className="w-12 h-10 rounded-lg cursor-pointer"
									style={{ border: 'none', padding: 0 }}
								/>
								<button
									type="button"
									onClick={() => {
										setSelectedColor('custom');
										setNewBookmark({ ...newBookmark, color: customColor });
									}}
									style={{ backgroundColor: customColor }}
									className={`h-10 rounded-lg hover:opacity-80 transition-all relative flex-1 ${
										selectedColor === 'custom' ? 'ring-2 ring-gray-400' : ''
									}`}
								>
									{selectedColor === 'custom' && (
										<Check
											size={20}
											className="absolute inset-0 m-auto text-white drop-shadow-lg"
										/>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* アクションボタン */}
				<div className="flex gap-3">
					<button
						onClick={() => {
							onBookmarkModalOpne(false);
							setNewBookmark({ name: '', url: '', iconEmoji: '', color: '' });
							setSelectedColor('bg-blue-500');
							setCustomColor('#3B82F6');
							setShowEmojiPicker(false);
						}}
						className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
							darkMode
								? 'border-gray-600 text-gray-300 hover:bg-gray-700'
								: 'border-gray-300 text-gray-700 hover:bg-gray-50'
						}`}
					>
						キャンセル
					</button>
					<button
						onClick={() => {
							// 全ての入力が埋まっている場合のみ追加
							if (
								newBookmark.name.trim() &&
								newBookmark.url.trim() &&
								newBookmark.color.trim()
							) {
								onAddBookmark(newBookmark);
								setNewBookmark({ name: '', url: '', iconEmoji: '', color: '' });
								setSelectedColor('bg-blue-500');
								setCustomColor('#3B82F6');
								setShowEmojiPicker(false);
								onBookmarkModalOpne(false);
							}
						}}
						className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						追加
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookmarkModal;
