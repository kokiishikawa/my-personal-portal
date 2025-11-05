import { EditTaskModalProps } from '@/types';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

/**
 * タスク編集モーダルコンポーネント
 * タイトルと詳細を編集できる
 */
const EditTaskModal = ({
	darkMode,
	tasks,
	editingTaskId,
	onEditTaskModalOpen,
	editTask,
}: EditTaskModalProps) => {

	const [title, setTitle] = useState('');
	const [detail, setDetail] = useState('');

	// 対象タスクを取得
	const targetTask = tasks.find((task) => task.id === editingTaskId);

	// targetTaskが変わったら値を更新
	useEffect(() => {
		if (targetTask) {
			setTitle(targetTask.title);
			setDetail(targetTask.detail || '');
		}
	}, [targetTask]);

	// タスクが見つからない場合は何も表示しない
	if (!targetTask) return null;

	return (
		<div
			onClick={() => onEditTaskModalOpen(false)}
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
						onClick={() => onEditTaskModalOpen(false)}
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
					placeholder="タスクタイトル"
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
					autoFocus
				/>

				{/* 詳細入力 */}
				<textarea
					value={detail}
					onChange={(e) => setDetail(e.target.value)}
					placeholder="詳細(任意)"
					rows={4}
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							: 'border-gray-300'
					}`}
				/>

				{/* アクションボタン */}
				<div className="flex gap-3">
					<button
						onClick={() => onEditTaskModalOpen(false)}
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
								editTask(editingTaskId, title, detail);
								onEditTaskModalOpen(false);
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
