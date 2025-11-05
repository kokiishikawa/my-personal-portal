import { TaskModalProps } from '@/types';
import { X } from 'lucide-react';
import React from 'react';

/**
 * タスクを追加するモーダルコンポーネント
 * タスク名を入力してタスクを追加する
 */
const TaskModal = ({
	darkMode,
	newTaskTitle,
	setNewTaskTitle,
	onModalOpen,
	onAddTask,
}: TaskModalProps) => {
	return (
		<div
			onClick={() => onModalOpen(false)}
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
		>
			{/* タスクヘッダー */}
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
						新しいタスク
					</h3>
					<button
						onClick={() => onModalOpen(false)}
						className={`p-2 rounded-lg transition-colors ${
							darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
						}`}
					>
						<X size={24} />
					</button>
				</div>
				{/* 情報入力 */}
				<input
					type="text"
					value={newTaskTitle}
					onChange={(e) => setNewTaskTitle(e.target.value)}
					placeholder="タスクを入力..."
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
						onClick={() => {
							onModalOpen(false);
							setNewTaskTitle('');
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
							// タスクが入力されている場合のみ追加
							if (newTaskTitle.trim()) {
								onAddTask(newTaskTitle);
								setNewTaskTitle('');
								onModalOpen(false);
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

export default TaskModal;
