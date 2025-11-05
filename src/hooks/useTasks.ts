import { Task } from '@/types';
import { useState, useEffect } from 'react';

/**
 * タスクを管理するカスタムフック(Django API連携版)
 */
export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * タスク一覧を取得
	 */
	const fetchTasks = async () => {
		
	};

	/**
	 * タスクを追加
	 */
	const addTask = async () => {
		
	};

	/**
	 * タスクを編集
	 */
	const editTask = async () => {
	
	};

	/**
	 * タスクを削除
	 */
	const deleteTask = async () => {
	
	};

	/**
	 * タスクの完了状態を切り替え
	 */
	const toggleTask = async () => {

	};

	// 初回読み込み
	useEffect(() => {
		fetchTasks();
	}, []);

	return { tasks, loading, error, addTask, editTask, deleteTask, toggleTask };
};
