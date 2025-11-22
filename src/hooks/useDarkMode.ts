import { useEffect, useState } from 'react';

/**
 * ダークモードの状態を管理するカスタムフック
 * localStorageに設定を永続化する
 */
export const useDarkMode = () => {
	// 初期値をlocalStorageから直接読み込む（SSR対応）
	const [darkMode, setDarkMode] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('darkMode') === 'true';
		}
		return false;
	});

	const [mounted, setMounted] = useState(false);

	/**
	 * マウント完了を記録
	 */
	useEffect(() => {
		setMounted(true);
	}, []);

	/**
	 * ダークモードをオン/オフ切り替え
	 * 同時にlocalStorageにも保存
	 */
	const toggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.setItem('darkMode', String(newDarkMode));
	};

	return { darkMode, toggleDarkMode, mounted };
};
