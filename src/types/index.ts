export interface Task {
	id: number;
	title: string;
	detail?: string;
	done: boolean;
}

export interface Schedule {
	id: number;
	title: string;
	memo?: string;
	location: string;
	date: string;
}

export interface Bookmark {
	id: number;
	name: string;
	url: string;
	iconEmoji?: string;
	color: string;
}

export interface BookmarkProps {
	darkMode: boolean;
	bookmarks: Bookmark[];
	onToggleMenu: () => void;
	isMenuOpen: boolean;
	onBookmarkModalOpne: (isOpen: boolean) => void;
	onEditBookmarkOpen?: (id: number) => void;
}

export interface HeaderProps {
	darkMode: boolean;
	onToggleDarkMode: () => void;
	onToggleMenu: () => void;
	isMenuOpen: boolean;
}

export interface CalendarProps {
	darkMode: boolean;
	currentMonth: Date;
	calendarDays: (number | null)[];
	isToday: (day: number | null) => boolean;
	goToPreviousMonth: () => void;
	goToNextMonth: () => void;
	goToToday: () => void;
}

export interface TaskListProps {
	darkMode: boolean;
	tasks: Task[];
	toggleTask: (taskId: number) => void;
	deleteTask: (id: number) => void;
	onModalOpen: (isOpen: boolean) => void;
	onEditTaskOpen?: (id: number) => void;
}

export interface TodyScheduleProps {
	darkMode: boolean;
	todaySchedules: Schedule[];
	onScheduleModalOpen: (isOpen: boolean) => void;
	deleteSchedule: (id: number) => void;
	onEditScheduleOpen?: (id: number) => void;
}

export interface TaskModalProps {
	darkMode: boolean;
	newTaskTitle: string;
	setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
	onModalOpen: (isOpen: boolean) => void;
	onAddTask: (title: string) => void;
}

export interface ScheduleModalProps {
	darkMode: boolean;
	newSchedule: {
		title: string;
		location: string;
		date: string;
	};
	setNewSchedule: React.Dispatch<
		React.SetStateAction<{
			title: string;
			location: string;
			date: string;
		}>
	>;
	onScheduleModalOpen: (isOpen: boolean) => void;
	onAddSchedule: (schedule: {
		title: string;
		location: string;
		date: string;
	}) => void;
}

export interface EditTaskModalProps {
	darkMode: boolean;
	tasks: Task[];
	editingTaskId: number;
	onEditTaskModalOpen: (isOpen: boolean) => void;
	editTask: (id: number, newTitle: string, newDetail: string) => void;
}

export interface EditScheduleModalProps {
	darkMode: boolean;
	schedules: Schedule[];
	editingSheduleId: number;
	onEditSheduleModalOpen: (isOpen: boolean) => void;
	editShedule: (
		id: number,
		newTitle: string,
		newMemo: string,
		newLocation: string,
		newDate: string
	) => void;
}

export interface BookmarkModalProps {
	darkMode: boolean;
	onBookmarkModalOpne: (isOpen: boolean) => void;
	newBookmark: {
		name: string;
		url: string;
		iconEmoji: string;
		color: string;
	};
	setNewBookmark: React.Dispatch<
		React.SetStateAction<{
			name: string;
			url: string;
			iconEmoji: string;
			color: string;
		}>
	>;
	onAddBookmark: (bookmark: {
		name: string;
		url: string;
		iconEmoji: string;
		color: string;
	}) => void;
}

export interface EditBookmarkModalProps {
	darkMode: boolean;
	bookmarks: Bookmark[];
	editingBookmarkId: number | null;
	onEditBookmarkModalOpen: (open: boolean) => void;
	editBookmark: (
		id: number,
		bookmarkData: {
			name: string;
			url: string;
			iconEmoji: string;
			color: string;
		}
	) => void;
}
