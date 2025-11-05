import { Schedule } from '@/types';
import { useState, useEffect } from 'react';

/**
 * スケジュールとカレンダーを管理するカスタムフック(Django API連携版)
 */
export const useSchedule = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 今日の日付情報
	const today = new Date();
	const dateStr = `${today.getFullYear()}年${
		today.getMonth() + 1
	}月${today.getDate()}日`;
	const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
	const dayOfWeek = weekdays[today.getDay()];

	/**
	 * 予定一覧を取得
	 */
	const fetchSchedules = async () => {
		
	};

	/**
	 * 予定を追加
	 */
	const addSchedule = async () => {
		
	};

	/**
	 * 予定を削除
	 */
	const deleteSchedule = async () => {
		
	};

	/**
	 * カレンダーの日付配列を生成
	 */
	const generateCalendar = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const days: (number | null)[] = [];

		for (let i = 0; i < firstDay; i++) {
			days.push(null);
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}
		return days;
	};

	const calendarDays = generateCalendar();

	const goToPreviousMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
		);
	};

	const goToNextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
		);
	};

	const goToToday = () => {
		setCurrentMonth(new Date());
	};

	const isToday = (day: number | null): boolean => {
		if (!day) return false;
		const today = new Date();
		return (
			day === today.getDate() &&
			currentMonth.getMonth() === today.getMonth() &&
			currentMonth.getFullYear() === today.getFullYear()
		);
	};

	// 初回読み込み
	useEffect(() => {
		fetchSchedules();
	}, []);

	return {
		currentMonth,
		todaySchedules,
		dateStr,
		dayOfWeek,
		calendarDays,
		goToPreviousMonth,
		goToNextMonth,
		goToToday,
		isToday,
		deleteSchedule,
		addSchedule,
		loading,
		error,
	};
};
