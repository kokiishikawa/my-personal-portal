import { TodyScheduleProps } from '@/types';
import { formatDateTime } from '@/utils/dateUtils';
import { CalendarDays, Edit, Trash2 } from 'lucide-react';
import React from 'react';

/**
 * カレンダーを表示するコンポーネント
 */
const ScheduleList = ({
	darkMode,
	todaySchedules,
	onScheduleModalOpen,
	deleteSchedule,
	onEditScheduleOpen,
}: TodyScheduleProps) => {
	// 当日の予定のみ取得して時間が早い順にソート
	const todaySchedulesFiltered = todaySchedules
		.filter((schedule) => {
			const scheduleDate = new Date(schedule.date);
			const today = new Date();
			return (
				scheduleDate.getFullYear() === today.getFullYear() &&
				scheduleDate.getMonth() === today.getMonth() &&
				scheduleDate.getDate() === today.getDate()
			);
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className="mb-6">
			<div
				className={`shadow-lg rounded-xl p-6 ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				{/* 予定ヘッダー */}
				<div className="flex items-center gap-2 mb-4">
					<CalendarDays className="text-blue-600" size={24} />
					<h2
						className={`text-xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-800'
						}`}
					>
						今日の予定
					</h2>
				</div>
				{/* 予定をmapで表示、予定がなかった場合はメッセージを表示 */}
				{todaySchedulesFiltered.length > 0 ? (
					<div
						className="space-y-3 overflow-y-auto pr-2"
						style={{ maxHeight: '280px' }}
					>
						{todaySchedulesFiltered.map((schedule) => (
							<div
								key={schedule.id}
								className={`p-4 rounded-lg border transition-colors group ${
									darkMode
										? 'border-gray-700 hover:bg-gray-700'
										: 'border-gray-200 hover:bg-gray-50'
								}`}
							>
								<div className="flex justify-between items-start mb-2">
									<h3
										className={`font-semibold text-lg ${
											darkMode ? 'text-white' : 'text-gray-800'
										}`}
									>
										{schedule.title}
									</h3>
									<div className="flex gap-1">
										{/* 編集ボタン */}
										{onEditScheduleOpen && (
											<button
												onClick={(e) => {
													e.stopPropagation();
													onEditScheduleOpen(schedule.id);
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
											onClick={() => deleteSchedule(schedule.id)}
											className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
												darkMode
													? 'hover:bg-gray-600 text-red-400'
													: 'hover:bg-gray-200 text-red-500'
											}`}
										>
											<Trash2 size={18} />
										</button>
									</div>
								</div>
								<div
									className={`flex flex-col gap-1 text-sm ${
										darkMode ? 'text-gray-300' : 'text-gray-600'
									}`}
								>
									<div className="flex items-center gap-2">
										<span className="font-medium">📍</span>
										<span>{schedule.location}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="font-medium">🕐</span>
										<span>{formatDateTime(schedule.date)}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						className={`p-4 text-center ${
							darkMode ? 'text-gray-400' : 'text-gray-500'
						}`}
					>
						今日の予定はありません。
					</div>
				)}

				{/* 予定を追加するモーダル表示アクション */}
				<button
					onClick={() => onScheduleModalOpen(true)}
					className={`mt-4 w-full py-2 border-2 border-dashed rounded-lg transition-colors ${
						darkMode
							? 'border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400'
							: 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500'
					}`}
				>
					+ 予定を追加
				</button>
			</div>
		</div>
	);
};

export default ScheduleList;
