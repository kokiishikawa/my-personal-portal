'use client';

import React from 'react';
import { CalendarDays } from 'lucide-react';
import { CalendarProps } from '@/types';

/**
 * カレンダーを表示するコンポーネント
 */
export default function Calendar({
	darkMode,
	currentMonth,
	calendarDays,
	isToday,
	goToPreviousMonth,
	goToNextMonth,
	goToToday,
}: CalendarProps) {
	return (
		<div
			className={`rounded-xl shadow-lg p-6 ${
				darkMode ? 'bg-gray-800' : 'bg-white'
			}`}
		>
			{/* カレンダーヘッダー */}
			<div className="flex items-center gap-2 mb-7">
				<CalendarDays className="text-blue-600" size={24} />
				<h2
					className={`text-xl font-bold ${
						darkMode ? 'text-white' : 'text-gray-800'
					}`}
				>
					カレンダー
				</h2>
			</div>

			<div className="flex items-center justify-between mb-4">
				<button
					onClick={goToPreviousMonth}
					className={`p-2 rounded-lg transition-colors ${
						darkMode
							? 'hover:bg-gray-700 text-gray-300'
							: 'hover:bg-gray-100 text-gray-600'
					}`}
				>
					&lt;
				</button>
				<button
					onClick={goToToday}
					className={`text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors ${
						darkMode ? 'text-gray-100' : 'text-gray-700'
					}`}
				>
					{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
				</button>
				<button
					onClick={goToNextMonth}
					className={`p-2 rounded-lg transition-colors ${
						darkMode
							? 'hover:bg-gray-700 text-gray-300'
							: 'hover:bg-gray-100 text-gray-600'
					}`}
				>
					&gt;
				</button>
			</div>

			<div className="grid grid-cols-7 gap-2" style={{ minHeight: '330px' }}>
				{['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
					<div
						key={i}
						className={`text-center font-semibold text-sm py-2 ${
							darkMode ? 'text-gray-300' : 'text-gray-600'
						}`}
					>
						{day}
					</div>
				))}
				{calendarDays.map((day, i) => (
					<div
						key={i}
						className={`text-center py-2 rounded-lg ${
							isToday(day)
								? 'bg-blue-500 text-white font-bold'
								: day
								? darkMode
									? 'hover:bg-gray-700 cursor-pointer text-gray-200'
									: 'hover:bg-gray-100 cursor-pointer'
								: ''
						}`}
					>
						{day || ''}
					</div>
				))}
			</div>
		</div>
	);
}
