/**
 * 取得年份的選項
 */
export const getYearOptions = (): string[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 1911;

  return [...Array(currentYear - startYear + 1)].map((_, index) => (1911 + index).toString());
};

/**
 * 取得月份的選項
 */
export const getMonthOptions = (): string[] => {
  return [...Array(12)].map((_, index) => (index + 1).toString());
};

/**
 * 用年份跟月份來取得日期的選項
 *
 * @param year 年份
 * @param month 月份
 */
export const getDayOptions = (year: string, month: string): string[] => {
  const date = new Date(parseInt(year), parseInt(month), 0);

  return [...Array(date.getDate())].map((_, index) => (index + 1).toString());
};

/**
 * 時間戳轉日期格式
 * @param timestamp 時間戳
 * @returns EX: '2025/05/03'
 */
export const formatTimestamp = (timestamp: number | string): string => {
  // if(typeof(timestamp) !== 'number') timestamp = Number(timestamp)
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

/**
 * 取得入住天數
 * @param startDate 時間戳
 * @param endDate 時間戳
 * @returns EX: 2
 *
 */
export const getDiffDays = (startDate: string, endDate: string): number => {
  if (startDate && endDate) {
    const start = new Date(startDate); // 將數字轉換為 Date
    const end = new Date(endDate); // 將數字轉換為 Date
    const diffTime = end.getTime() - start.getTime(); // 現在可以使用 getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 計算天數
  } else {
    return 0; // 如果無效輸入，返回 0
  }
};
