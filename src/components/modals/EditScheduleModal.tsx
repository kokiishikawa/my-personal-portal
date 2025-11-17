'use client';

import { EditScheduleModalProps } from '@/types';
import { formatDateTimeLocal } from '@/utils/dateUtils';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

/**
 * スケジュール編集モーダルコンポーネント
 * タイトル、場所、時間、詳細を編集できる
 */
const EditTaskModal = ({
	darkMode,
	schedules,
	editingSheduleId,
	onEditSheduleModalOpen,
	editShedule,
}: EditScheduleModalProps) => {
	const [title, setTitle] = useState('');
	const [memo, setMemo] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState('');

	// 対象タスクを取得
	const targetSchedule = schedules.find(
		(schedule) => schedule.id === editingSheduleId
	);

	// targetTaskが変わったら値を更新
	useEffect(() => {
		if (targetSchedule) {
			setTitle(targetSchedule.title);
			setMemo(targetSchedule.memo || '');
			setLocation(targetSchedule.location || '');

			if (targetSchedule.date) {
				setDate(formatDateTimeLocal(targetSchedule.date));
			} else {
				setDate('');
			}
		}
	}, [targetSchedule]);

	// タスクが見つからない場合は何も表示しない
	if (!targetSchedule) return null;

	return (
		<div
			onClick={() => onEditSheduleModalOpen(false)}
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				{/* ヘッダー */}
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						タスクの編集
					</h3>
					<button
						onClick={() => onEditSheduleModalOpen(false)}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						<X size={24} />
					</button>
				</div>

				{/* タイトル入力 */}
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="予定のタイトル..."
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
					autoFocus
				/>

				{/* 詳細入力 */}
				<textarea
					value={memo}
					onChange={(e) => setMemo(e.target.value)}
					placeholder="メモ(任意)"
					rows={4}
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
				/>

				<input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="場所場所..."
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
					autoFocus
				/>

				<input
					type="datetime-local"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					placeholder="時間..."
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
					autoFocus
				/>

				{/* アクションボタン */}
				<div className="flex gap-3">
					<button
						onClick={() => onEditSheduleModalOpen(false)}
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
							if (title.trim()) {
								editShedule(editingSheduleId, title, memo, location, date);
								onEditSheduleModalOpen(false);
							}
						}}
						className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						保存
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditTaskModal;
