'use client';

import { TodayScheduleProps } from '@/types';
import { formatDateTime } from '@/utils/dateUtils';
import { CalendarDays, Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

/**
 * カレンダーを表示するコンポーネント
 */
const ScheduleList = ({
	darkMode,
	todaySchedules,
	onScheduleModalOpen,
	deleteSchedule,
	onEditScheduleOpen,
}: TodayScheduleProps) => {
	const [viewMode, setViewMode] = useState<'today' | 'all'>('today');

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

	// 全ての予定を日付順にソート
	const allSchedulesSorted = [...todaySchedules].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	// 表示する予定を切り替え
	const displaySchedules =
		viewMode === 'today' ? todaySchedulesFiltered : allSchedulesSorted;

	return (
		<div className="mb-6">
			<div
				className={`shadow-lg rounded-xl p-6 ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				{/* 予定ヘッダー */}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<CalendarDays className="text-blue-600" size={24} />
						<h2
							className={`text-xl font-bold ${
								darkMode ? 'text-white' : 'text-gray-800'
							}`}
						>
							{viewMode === 'today' ? '今日の予定' : '全ての予定'}
						</h2>
					</div>

					{/* 表示切替ボタン */}
					<div className="flex gap-2">
						<button
							onClick={() => setViewMode('today')}
							className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
								viewMode === 'today'
									? darkMode
										? 'bg-blue-600 text-white'
										: 'bg-blue-500 text-white'
									: darkMode
									? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							今日
						</button>
						<button
							onClick={() => setViewMode('all')}
							className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
								viewMode === 'all'
									? darkMode
										? 'bg-blue-600 text-white'
										: 'bg-blue-500 text-white'
									: darkMode
									? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							全て
						</button>
					</div>
				</div>

				{/* 予定をmapで表示、予定がなかった場合はメッセージを表示 */}
				{displaySchedules.length > 0 ? (
					<div
						className="space-y-3 overflow-y-auto pr-2"
						style={{ maxHeight: '280px' }}
					>
						{displaySchedules.map((schedule) => {
							const scheduleDate = new Date(schedule.date);
							const today = new Date();
							const isToday =
								scheduleDate.getFullYear() === today.getFullYear() &&
								scheduleDate.getMonth() === today.getMonth() &&
								scheduleDate.getDate() === today.getDate();
							const isPast = scheduleDate < today && !isToday;

							return (
								<div
									key={schedule.id}
									className={`p-4 rounded-lg border transition-colors group ${
										darkMode
											? 'border-gray-700 hover:bg-gray-700'
											: 'border-gray-200 hover:bg-gray-50'
									} ${isPast ? 'opacity-60' : ''}`}
								>
									<div className="flex justify-between items-start mb-2">
										<div className="flex items-center gap-2">
											<h3
												className={`font-semibold text-lg ${
													darkMode ? 'text-white' : 'text-gray-800'
												}`}
											>
												{schedule.title}
											</h3>
											{isToday && (
												<span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
													今日
												</span>
											)}
										</div>
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
							);
						})}
					</div>
				) : (
					<div
						className={`p-4 text-center ${
							darkMode ? 'text-gray-400' : 'text-gray-500'
						}`}
					>
						{viewMode === 'today'
							? '今日の予定はありません。'
							: '予定がありません。'}
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
