import { Schedule } from '@/types';
import { useState, useEffect } from 'react';

/**
 * スケジュールとカレンダーを管理するカスタムフック(Django API連携)
 *
 * @returns {Object} スケジュール管理とカレンダー操作に関する状態と関数
 * @returns {Date} currentMonth - 現在表示中の月
 * @returns {Schedule[]} todaySchedules - スケジュール一覧
 * @returns {string} dateStr - 今日の日付文字列
 * @returns {string} dayOfWeek - 今日の曜日
 * @returns {(number | null)[]} calendarDays - カレンダーの日付配列
 * @returns {boolean} loading - ローディング状態
 * @returns {string | null} error - エラーメッセージ
 * @returns {Function} addSchedule - スケジュール追加
 * @returns {Function} editSchedule - スケジュール編集
 * @returns {Function} deleteSchedule - スケジュール削除
 * @returns {Function} goToPreviousMonth - 前月へ移動
 * @returns {Function} goToNextMonth - 次月へ移動
 * @returns {Function} goToToday - 今月へ移動
 * @returns {Function} isToday - 指定日が今日かチェック
 * @returns {Function} refetch - スケジュール一覧を再取得
 */
export const useSchedule = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 日付情報をstateで管理
	const [dateStr, setDateStr] = useState('');
	const [dayOfWeek, setDayOfWeek] = useState('');
	const [todayDate, setTodayDate] = useState<Date | null>(null);

	/**
	 * スケジュール一覧を取得
	 */
	const fetchSchedules = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules/`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setTodaySchedules(data);
		} catch (error) {
			console.error('Failed to fetch schedules:', error);
			setError(
				error instanceof Error ? error.message : 'データの取得に失敗しました'
			);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * スケジュールを追加
	 * @param {Object} schedule - スケジュールデータ
	 * @returns {Promise<Schedule>} 追加されたスケジュール
	 */
	const addSchedule = async (schedule: {
		title: string;
		memo?: string;
		location: string;
		date: string;
	}): Promise<Schedule> => {
		setLoading(true);
		setError(null);

		try {
			// ISO形式に変換
			const isoDate = new Date(schedule.date).toISOString();

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title: schedule.title,
						memo: schedule.memo,
						location: schedule.location,
						date: isoDate, // ISO形式で送信
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const newSchedule = await response.json();
			// 一覧の先頭に追加（新しいスケジュールが上に表示される）
			setTodaySchedules((prev) => [newSchedule, ...prev]);
			return newSchedule;
		} catch (error) {
			console.error('Failed to add schedule:', error);
			setError(
				error instanceof Error
					? error.message
					: 'スケジュールの追加に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * スケジュールを編集
	 * @param {number} scheduleId - スケジュールID
	 * @param {string} title - スケジュールのタイトル
	 * @param {string} memo - スケジュールのメモ
	 * @param {string} location - 場所
	 * @param {string} date - 日時（ISO形式）
	 * @returns {Promise<Schedule>} 更新されたスケジュール
	 */
	const editSchedule = async (
		scheduleId: number,
		title: string,
		memo: string,
		location: string,
		date: string
	): Promise<Schedule> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules/${scheduleId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						memo,
						location,
						date,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedSchedule = await response.json();

			// 一覧を更新
			setTodaySchedules((prev) =>
				prev.map((schedule) =>
					schedule.id === scheduleId ? updatedSchedule : schedule
				)
			);
			return updatedSchedule;
		} catch (error) {
			console.error('Failed to edit schedule:', error);
			setError(
				error instanceof Error
					? error.message
					: 'スケジュールの更新に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * スケジュールを削除
	 * @param {number} scheduleId - 削除するスケジュールのID
	 */
	const deleteSchedule = async (scheduleId: number): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules/${scheduleId}/`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 削除されたスケジュールを一覧から除外
			setTodaySchedules((prev) =>
				prev.filter((schedule) => schedule.id !== scheduleId)
			);
		} catch (error) {
			console.error('Failed to delete schedule:', error);
			setError(
				error instanceof Error
					? error.message
					: 'スケジュールの削除に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * カレンダーの日付配列を生成
	 * @returns {(number | null)[]} 日付の配列（null は空白セル）
	 */
	const generateCalendar = (): (number | null)[] => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const days: (number | null)[] = [];

		// 月初の空白セルを追加
		for (let i = 0; i < firstDay; i++) {
			days.push(null);
		}
		// 日付を追加
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}
		return days;
	};

	const calendarDays = generateCalendar();

	/**
	 * カレンダーを前月に移動
	 */
	const goToPreviousMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
		);
	};

	/**
	 * カレンダーを次月に移動
	 */
	const goToNextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
		);
	};

	/**
	 * カレンダーを今月に移動
	 */
	const goToToday = () => {
		setCurrentMonth(new Date());
	};

	/**
	 * 指定された日が今日かどうかをチェック
	 * @param {number | null} day - チェックする日
	 * @returns {boolean} 今日の場合 true
	 */
	const isToday = (day: number | null): boolean => {
		if (!day || !todayDate) return false;
		return (
			day === todayDate.getDate() &&
			currentMonth.getMonth() === todayDate.getMonth() &&
			currentMonth.getFullYear() === todayDate.getFullYear()
		);
	};

	// クライアントサイドで日付情報を設定
	useEffect(() => {
		const today = new Date();
		setTodayDate(today);
		setDateStr(
			`${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
		);

		const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
		setDayOfWeek(weekdays[today.getDay()]);
	}, []);

	// 初回読み込み
	useEffect(() => {
		fetchSchedules();
	}, []);

	return {
		// カレンダー関連
		currentMonth,
		dateStr,
		dayOfWeek,
		calendarDays,
		goToPreviousMonth,
		goToNextMonth,
		goToToday,
		isToday,
		// スケジュール関連
		todaySchedules,
		addSchedule,
		editSchedule,
		deleteSchedule,
		refetch: fetchSchedules, // 手動で再取得
		// 状態
		loading,
		error,
	};
};
