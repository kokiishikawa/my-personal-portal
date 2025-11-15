import { useEffect, useState } from 'react';

/**
 * ダークモードの状態を管理するカスタムフック
 * localStorageに設定を永続化する
 */
export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState(false);

	/**
	 * 初回読み込み時にlocalStorageから設定を復元
	 */
	useEffect(() => {
		const saved = localStorage.getItem('darkMode');
		if (saved === 'true') {
			setDarkMode(true);
		}
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

	return { darkMode, toggleDarkMode };
};
