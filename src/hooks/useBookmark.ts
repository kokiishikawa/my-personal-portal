import { Bookmark } from '@/types';

export const useBookmark = () => {
	/**
	 * ブックマークを追加
	 * TODO: バックエンドAPIと連携する
	 */
	const addBookmark = async (bookmark: {
		name: string;
		url: string;
		iconEmoji: string;
		color: string;
	}): Promise<Bookmark> => {
		try {
			console.log('=== Adding Bookmark ===');
			console.log('Data:', bookmark);

			// TODO: API呼び出し
		
			// 仮のレスポンス（バックエンドからIDが付与される想定）
			const newBookmark: Bookmark = {
				id: Date.now(), // 仮ID（実際はバックエンドから返される）
				...bookmark,
			};

			console.log('Created Bookmark:', newBookmark);
			console.log('=======================\n');

			return newBookmark;
		} catch (error) {
			console.error('Error adding bookmark:', error);
			throw error;
		}
	};

	/**
	 * ブックマークを編集
	 * TODO: バックエンドAPIと連携する
	 */
	const editBookmark = async (
		id: number,
		bookmarkData: {
			name: string;
			url: string;
			iconEmoji: string;
			color: string;
		}
	): Promise<Bookmark> => {
		try {
			console.log('=== Editing Bookmark ===');
			console.log('Bookmark ID:', id);
			console.log('Updated Data:', bookmarkData);

			// TODO: API呼び出し

			// 仮のレスポンス
			const updatedBookmark: Bookmark = {
				id,
				...bookmarkData,
			};

			console.log('Updated Bookmark:', updatedBookmark);
			console.log('========================\n');

			return updatedBookmark;
		} catch (error) {
			console.error('Error editing bookmark:', error);
			throw error;
		}
	};

	/**
	 * ブックマークを削除
	 * TODO: バックエンドAPIと連携する
	 */
	const deleteBookmark = async (id: number): Promise<void> => {
		try {
			console.log('=== Deleting Bookmark ===');
			console.log('Bookmark ID:', id);

			// TODO: API呼び出し
			console.log('Bookmark deleted successfully');
			console.log('=========================\n');
		} catch (error) {
			console.error('Error deleting bookmark:', error);
			throw error;
		}
	};

	return {
		addBookmark,
		editBookmark,
		deleteBookmark,
	};
};
