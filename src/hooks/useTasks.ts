import { Task } from '@/types';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * タスクを管理するカスタムフック(Django API連携)
 *
 * @returns {Object} タスク管理に関する状態と関数
 * @returns {Task[]} tasks - タスク一覧
 * @returns {boolean} loading - ローディング状態
 * @returns {string | null} error - エラーメッセージ
 * @returns {Function} addTask - タスク追加
 * @returns {Function} editTask - タスク編集
 * @returns {Function} deleteTask - タスク削除
 * @returns {Function} toggleTask - タスク完了状態切り替え
 * @returns {Function} refetch - タスク一覧を再取得
 */
export const useTasks = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * 認証ヘッダーを取得
	 */
	const getHeaders = () => {
		if (!session?.djangoAccessToken) {
			throw new Error('認証されていません');
		}
		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.djangoAccessToken}`,
		};
	};

	/**
	 * タスク一覧を取得
	 */
	const fetchTasks = async () => {
		// 認証状態をチェック
		if (status === 'unauthenticated') {
			router.push('/login');
			return;
		}

		if (status === 'loading' || !session?.djangoAccessToken) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/`,
				{
					headers: getHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				// throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error('Failed to fetch tasks:', error);
			setError(
				error instanceof Error ? error.message : 'データの取得に失敗しました'
			);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * タスクを追加
	 * @param {string} title - タスクのタイトル
	 * @returns {Promise<Task>} 追加されたタスク
	 */
	const addTask = async (title: string): Promise<Task> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/`,
				{
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify({
						title: title,
						detail: '',
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました。');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const newTask = await response.json();

			// 一覧の先頭に追加（新しいタスクが上に表示される）
			setTasks((prev) => [newTask, ...prev]);
			return newTask;
		} catch (error) {
			console.error('Failed to add task:', error);
			setError(
				error instanceof Error ? error.message : 'タスクの追加に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * タスクを編集
	 * @param {number} taskId - タスクID
	 * @param {string} title - タスクのタイトル
	 * @param {string} detail - タスクの詳細
	 * @returns {Promise<Task>} 更新されたタスク
	 */
	const editTask = async (
		taskId: number,
		title: string,
		detail: string
	): Promise<Task> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}/`,
				{
					method: 'PUT',
					headers: getHeaders(),
					body: JSON.stringify({
						title: title,
						detail: detail,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました。');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedTask = await response.json();

			setTasks((prev) =>
				prev.map((task) => (task.id === taskId ? updatedTask : task))
			);
			return updatedTask;
		} catch (error) {
			console.error('Failed to edit task:', error);
			setError(
				error instanceof Error ? error.message : 'タスクの更新に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * タスクを削除
	 * @param {number} taskId - 削除するタスクのID
	 */
	const deleteTask = async (taskId: number): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}/`,
				{
					method: 'DELETE',
					headers: getHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました。');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 削除されたタスクを一覧から除外
			setTasks((prev) => prev.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error('Failed to delete task:', error);
			setError(
				error instanceof Error ? error.message : 'タスクの削除に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * タスクの完了状態を切り替え
	 * @param {number} taskId - タスクID
	 * @returns {Promise<Task>} 更新されたタスク
	 */
	const toggleTask = async (taskId: number): Promise<Task | undefined> => {
		const task = tasks.find((t) => t.id === taskId);
		if (!task) {
			console.error('Task not found:', taskId);
			return;
		}

		// 楽観的更新（即座にUIを更新）
		const optimisticTask = { ...task, done: !task.done };
		setTasks((prev) => prev.map((t) => (t.id === taskId ? optimisticTask : t)));

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}/`,
				{
					method: 'PATCH',
					headers: getHeaders(),
					body: JSON.stringify({
						done: !task.done,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました。');
				}
				// エラー時は元の状態に戻す
				setTasks((prev) => prev.map((t) => (t.id === taskId ? task : t)));
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedTask = await response.json();

			// サーバーからの正確なデータで最終更新
			setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
			return updatedTask;
		} catch (error) {
			console.error('Failed to toggle task:', error);
			setError(
				error instanceof Error ? error.message : 'タスクの更新に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// 初回読み込み
	useEffect(() => {
		if (status === 'authenticated' && session?.djangoAccessToken) {
			fetchTasks();
		}
	}, [status, session?.djangoAccessToken]);

	return {
		tasks,
		loading,
		error,
		addTask,
		editTask,
		deleteTask,
		toggleTask,
		refetch: fetchTasks, // 手動で再取得できるようにエクスポート
	};
};
