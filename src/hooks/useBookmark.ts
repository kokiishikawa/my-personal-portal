import { Bookmark } from '@/types';
import { useEffect, useState } from 'react';

/**
 * ブックマークを管理するカスタムフック(Django API連携)
 *
 * @returns {Bookmark[]} Bookmark - ブックマーク一覧
 * @returns {boolean} loading - ローディング状態
 * @returns {string | null} error - エラーメッセージ
 * @returns {Function} addBookmark - ブックマーク追加
 * @returns {Function} editBookmark - ブックマーク修正
 * @returns {Function} deleteBookmark - ブックマーク削除
 * @returns {Function} refetch - ブックマーク一覧を再取得
 *
 */
export const useBookmark = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

	/**
	 * ブックマーク一覧を取得
	 */
	const fetchBookmark = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const date = await response.json();
			setBookmarks(date);
		} catch (error) {
			console.log('error');
			setError(
				error instanceof Error ? error.message : 'データの取得に失敗しました。'
			);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * ブックマークを追加
	 */
	const addBookmark = async (bookmark: {
		name: string;
		url: string;
		iconEmoji: string;
		color: string;
	}): Promise<Bookmark> => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: bookmark.name,
						url: bookmark.url,
						iconEmoji: bookmark.iconEmoji,
						color: bookmark.color,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const newBookmark = await response.json();
			setBookmarks((prev) => [newBookmark, ...prev]);
			return newBookmark;
		} catch (error) {
			console.error('Error adding bookmark:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * ブックマークを編集
	 */
	const editBookmark = async (
		bookmarkId: number,
		bookmark: {
			name: string;
			url: string;
			iconEmoji: string;
			color: string;
		}
	): Promise<Bookmark> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/${bookmarkId}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: bookmark.name,
						url: bookmark.url,
						iconEmoji: bookmark.iconEmoji,
						color: bookmark.color,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedBoookmark = await response.json();

			setBookmarks((prev) =>
				prev.map((bookmarks) =>
					bookmarks.id === bookmarkId ? updatedBoookmark : bookmarks
				)
			);

			return updatedBoookmark;
		} catch (error) {
			console.error('Error editing bookmark:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * ブックマークを削除
	 */
	const deleteBookmark = async (bookmarkId: number): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/${bookmarkId}/`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			setBookmarks((prev) =>
				prev.filter((bookmarks) => bookmarks.id !== bookmarkId)
			);
		} catch (error) {
			console.error('Error deleting bookmark:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// 初回読み込み
	useEffect(() => {
		fetchBookmark();
	}, []);

	return {
		addBookmark,
		editBookmark,
		deleteBookmark,
		bookmarks,
		refetch: fetchBookmark, // 手動で再取得
		//　状態
		loading,
		error,
	};
};
