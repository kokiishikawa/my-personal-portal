import { Bookmark } from '@/types';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
	const { data: session, status } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

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
	 * ブックマーク一覧を取得
	 */
	const fetchBookmark = async () => {
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
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/`,
				{
					headers: getHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました');
				}
				// throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const list = Array.isArray(data) ? data : data.results ?? [];
			setBookmarks(list);
		} catch (error) {
			console.error('ブックマーク取得エラー:', error);
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
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/`,
				{
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify({
						name: bookmark.name,
						url: bookmark.url,
						iconEmoji: bookmark.iconEmoji,
						color: bookmark.color,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const newBookmark = await response.json();
			setBookmarks((prev) => [newBookmark, ...prev]);
			return newBookmark;
		} catch (error) {
			console.error('ブックマーク追加エラー:', error);
			setError(
				error instanceof Error
					? error.message
					: 'ブックマークの追加に失敗しました'
			);
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
					headers: getHeaders(),
					body: JSON.stringify({
						name: bookmark.name,
						url: bookmark.url,
						iconEmoji: bookmark.iconEmoji,
						color: bookmark.color,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedBookmark = await response.json();

			setBookmarks((prev) =>
				prev.map((bookmark) =>
					bookmark.id === bookmarkId ? updatedBookmark : bookmark
				)
			);

			return updatedBookmark;
		} catch (error) {
			console.error('ブックマーク編集エラー:', error);
			setError(
				error instanceof Error
					? error.message
					: 'ブックマークの編集に失敗しました'
			);
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
					headers: getHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					throw new Error('認証に失敗しました');
				}
				const errorData = await response.json();
				console.error('API Error:', errorData);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			setBookmarks((prev) =>
				prev.filter((bookmark) => bookmark.id !== bookmarkId)
			);
		} catch (error) {
			console.error('ブックマーク削除エラー:', error);
			setError(
				error instanceof Error
					? error.message
					: 'ブックマークの削除に失敗しました'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// 初回読み込み（認証完了後）
	useEffect(() => {
		if (status === 'authenticated' && session?.djangoAccessToken) {
			fetchBookmark();
		}
	}, [status, session?.djangoAccessToken]);

	return {
		addBookmark,
		editBookmark,
		deleteBookmark,
		bookmarks,
		refetch: fetchBookmark, // 手動で再取得
		// 状態
		loading,
		error,
	};
};
