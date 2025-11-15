'use client';

import React, { useState } from 'react';
import { Bookmark } from '@/types';
import Header from '@/components/Header';
import BookmarkSidebar from '@/components/BookmarkSidebar';
import Calendar from '@/components/Calendar';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/modals/TaskModal';
import ScheduleModal from '@/components/modals/ScheduleModal';
import TodaySchedule from '@/components/ScheduleList';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTasks } from '@/hooks/useTasks';
import { useSchedule } from '@/hooks/useSchedule';
import EditTaskModal from '@/components/modals/EditTaskModal';
import EditScheduleModal from '@/components/modals/EditScheduleModal'

/**
 * ホームページコンポーネント
 * タスク管理、スケジュール管理、カレンダー表示を統合
 */
export default function HomePage() {
	// モーダルとメニューの開閉状態
	const [menuOpen, setMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
	const [editTaskModal, setEditTaskModal] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
	const [editScheduleModal, setEditScheduleModal] = useState(false);
	const [editingScheduleId, setEditingScheduleId] = useState<number | null>(
		null
	);

	// モーダル入力フォームの状態
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newSchedule, setNewSchedule] = useState({
		title: '',
		location: '',
		date: '',
	});

	// カスタムフックから各機能を取得
	const { darkMode, toggleDarkMode } = useDarkMode();
	const { toggleTask, deleteTask, tasks, addTask, editTask } = useTasks();
	const {
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
		editSchedule,
	} = useSchedule();

	// ブックマーク一覧(デモデータ)
	const bookmarks: Bookmark[] = [
		{
			name: 'AWS Console',
			url: 'https://console.aws.amazon.com',
			iconImage: '',
			color: 'bg-orange-500',
		},
		{
			name: 'GitHub',
			url: 'https://github.com',
			iconImage: '',
			color: 'bg-gray-800',
		},
		{
			name: 'YouTube',
			url: 'https://youtube.com',
			iconImage: '',
			color: 'bg-red-500',
		},
		{
			name: 'Udemy',
			url: 'https://udemy.com',
			iconImage: '',
			color: 'bg-purple-500',
		},
		{
			name: 'Qiita',
			url: 'https://qiita.com',
			iconImage: '',
			color: 'bg-green-500',
		},
		{
			name: 'NogizakaBlog',
			url: 'https://www.nogizaka46.com/s/n46/diary/MEMBER?ima=2328',
			iconImage: '',
			color: 'bg-fuchsia-500',
		},
		{
			name: 'SakurazakaBlog',
			url: 'https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000',
			iconImage: '🌸',
			color: 'bg-pink-500',
		},
	];

	return (
		<div
			className={`min-h-screen bg-gradient-to-br ${
				darkMode ? 'from-gray-900 to-gray-800' : 'from-white to-gray-100'
			}`}
		>
			{/* ヘッダー */}
			<Header
				darkMode={darkMode}
				onToggleDarkMode={toggleDarkMode}
				onToggleMenu={() => setMenuOpen(!menuOpen)}
				isMenuOpen={menuOpen}
			/>

			<main className="max-w-7xl mx-auto px-4 py-8">
				{/* 今日の日付表示 */}
				<div className="mb-6">
					<p
						className={`text-3xl font-semibold ${
							darkMode ? 'text-gray-100' : 'text-gray-700'
						}`}
					>
						{dateStr} ({dayOfWeek})
					</p>
				</div>

				{/* 今日の予定セクション */}
				<TodaySchedule
					darkMode={darkMode}
					todaySchedules={todaySchedules}
					onScheduleModalOpen={setScheduleModalOpen}
					deleteSchedule={deleteSchedule}
					onEditScheduleOpen={(id) => {
						setEditingScheduleId(id);
						setEditScheduleModal(true);
					}}
				/>

				{/* カレンダーとタスクリストのグリッド */}
				<div className="grid md:grid-cols-2 gap-6">
					<Calendar
						darkMode={darkMode}
						currentMonth={currentMonth}
						calendarDays={calendarDays}
						isToday={isToday}
						goToPreviousMonth={goToPreviousMonth}
						goToNextMonth={goToNextMonth}
						goToToday={goToToday}
					/>

					<TaskList
						darkMode={darkMode}
						tasks={tasks}
						toggleTask={toggleTask}
						deleteTask={deleteTask}
						onModalOpen={setModalOpen}
						onEditTaskOpen={(id) => {
							setEditingTaskId(id);
							setEditTaskModal(true);
						}}
					/>
				</div>
			</main>

			{/* ブックマークサイドバー */}
			<BookmarkSidebar
				darkMode={darkMode}
				bookmarks={bookmarks}
				onToggleMenu={() => setMenuOpen(!menuOpen)}
				isMenuOpen={menuOpen}
			/>

			{/* タスク追加モーダル */}
			{modalOpen && (
				<TaskModal
					darkMode={darkMode}
					newTaskTitle={newTaskTitle}
					setNewTaskTitle={setNewTaskTitle}
					onModalOpen={setModalOpen}
					onAddTask={addTask}
				/>
			)}

			{/* 予定追加モーダル */}
			{scheduleModalOpen && (
				<ScheduleModal
					darkMode={darkMode}
					newSchedule={newSchedule}
					setNewSchedule={setNewSchedule}
					onScheduleModalOpen={setScheduleModalOpen}
					onAddSchedule={addSchedule}
				/>
			)}

			{/* タスク編集モーダル */}
			{editTaskModal && editingTaskId !== null && (
				<EditTaskModal
					darkMode={darkMode}
					tasks={tasks}
					editingTaskId={editingTaskId}
					onEditTaskModalOpen={setEditTaskModal}
					editTask={editTask}
				/>
			)}

			{/* スケジュール編集モーダル */}
			{editScheduleModal && editingScheduleId !== null && (
				<EditScheduleModal
					darkMode={darkMode}
					schedules={todaySchedules}
					editingSheduleId={editingScheduleId}
					onEditSheduleModalOpen={setEditScheduleModal}
					editShedule={editSchedule}
				/>
			)}

			{/* サイドバー開閉時のオーバーレイ */}
			{menuOpen && (
				<div
					onClick={() => setMenuOpen(false)}
					className="fixed inset-0 bg-black/30 z-40"
				/>
			)}
		</div>
	);
}
