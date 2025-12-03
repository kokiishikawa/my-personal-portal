'use client';

import { ScheduleModalProps } from '@/types';
import { X } from 'lucide-react';
import React from 'react';

/**
 * 予定を追加するモーダルコンポーネント
 * タイトル、場所、日時を入力して新しい予定を追加する
 */
const ScheduleModal = ({
	darkMode,
	newSchedule,
	setNewSchedule,
	onScheduleModalOpen,
	onAddSchedule,
}: ScheduleModalProps) => {
	return (
		<div
			onClick={() => onScheduleModalOpen(false)}
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
						新しい予定
					</h3>
					<button
						onClick={() => onScheduleModalOpen(false)}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						<X size={24} />
					</button>
				</div>
				{/* 情報入力 */}
				<div className="space-y-3 mb-4">
					<input
						type="text"
						value={newSchedule.title}
						onChange={(e) =>
							setNewSchedule({ ...newSchedule, title: e.target.value })
						}
						placeholder="予定のタイトル..."
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								: 'border-gray-300'
						}`}
					/>
					<input
						type="text"
						value={newSchedule.location}
						onChange={(e) =>
							setNewSchedule({ ...newSchedule, location: e.target.value })
						}
						placeholder="場所..."
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								: 'border-gray-300'
						}`}
					/>
					<input
						type="datetime-local"
						value={newSchedule.date}
						onChange={(e) =>
							setNewSchedule({ ...newSchedule, date: e.target.value })
						}
						placeholder="時間..."
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								: 'border-gray-300'
						}`}
					/>
				</div>
				{/* アクションボタン */}
				<div className="flex gap-3">
					<button
						onClick={() => {
							onScheduleModalOpen(false);
							setNewSchedule({ title: '', location: '', date: '' });
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
								newSchedule.title.trim() &&
								newSchedule.location.trim() &&
								newSchedule.date.trim()
							) {
								onAddSchedule(newSchedule);
								setNewSchedule({ title: '', location: '', date: '' });
								onScheduleModalOpen(false);
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

export default ScheduleModal;
