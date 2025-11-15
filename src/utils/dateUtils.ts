// フォーマット関数を定義
// 2025-11-09T12:34:56.789Z -> 2025月11月09日 12:34
export const formatDateTime = (dateTimeString: string): string => {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};

// datetime-local input用のフォーマット関数
// 2025-11-09T12:34:56.789Z -> 2025-11-09T12:34
export const formatDateTimeLocal = (dateTimeString: string): string => {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// 現在時刻をdatetime-local形式で取得
export const getCurrentDateTimeLocal = (): string => {
	return formatDateTimeLocal(new Date().toISOString());
};