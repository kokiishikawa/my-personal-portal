'use client';

import { TaskListProps } from '@/types';
import { CheckSquare, Trash2, Edit } from 'lucide-react';

/**
 * タスクを表示するコンポーネント
 */
const TaskList = ({
	darkMode,
	tasks,
	toggleTask,
	deleteTask,
	onModalOpen,
	onEditTaskOpen,
}: TaskListProps) => {
	return (
		<div
			className={`rounded-xl shadow-lg p-6 ${
				darkMode ? 'bg-gray-800' : 'bg-white'
			}`}
		>
			{/* タスクヘッダー */}
			<div className="flex items-center gap-2 mb-4">
				<CheckSquare className="text-green-600" size={24} />
				<h2
					className={`text-xl font-bold ${
						darkMode ? 'text-white' : 'text-gray-800'
					}`}
				>
					タスク
				</h2>
			</div>
			{/* タスクをmapで表示する */}
			{tasks.length > 0 ? (
				<div
					className="space-y-3 overflow-y-auto pr-2"
					style={{ maxHeight: '330px' }}
				>
					{tasks
						.sort((a, b) => Number(a.done) - Number(b.done))
						.map((task) => (
							<div
								key={task.id}
								className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-500 group ${
									task.done ? 'opacity-30' : 'opacity-100'
								} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
							>
								<input
									type="checkbox"
									checked={task.done}
									onChange={() => toggleTask(task.id)}
									className="w-5 h-5 rounded cursor-pointer"
								/>
								<span
									onClick={() => toggleTask(task.id)}
									className={`flex-1 transition-all duration-300 ${
										task.done
											? darkMode
												? 'line-through text-gray-500'
												: 'line-through text-gray-400'
											: darkMode
											? 'text-gray-200'
											: 'text-gray-700'
									}`}
								>
									{task.title}
								</span>

								{/* 編集ボタン */}
								{onEditTaskOpen && (
									<button
										onClick={(e) => {
											e.stopPropagation();
											onEditTaskOpen(task.id);
										}}
										className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
											darkMode
												? 'hover:bg-gray-600 text-blue-400'
												: 'hover:bg-gray-200 text-blue-500'
										}`}
									>
										<Edit size={18} />
									</button>
								)}

								{/* 削除ボタン */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										deleteTask(task.id);
									}}
									className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
										darkMode
											? 'hover:bg-gray-600 text-red-400'
											: 'hover:bg-gray-200 text-red-500'
									}`}
								>
									<Trash2 size={18} />
								</button>
							</div>
						))}
				</div>
			) : (
				<div
					className={`p-4 text-center ${
						darkMode ? 'text-gray-400' : 'text-gray-500'
					}`}
				>
					タスクはありません。
				</div>
			)}

			<button
				onClick={() => onModalOpen(true)}
				className={`mt-4 w-full py-2 border-2 border-dashed rounded-lg transition-colors ${
					darkMode
						? 'border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400'
						: 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500'
				}`}
			>
				+ タスクを追加
			</button>
		</div>
	);
};

export default TaskList;
