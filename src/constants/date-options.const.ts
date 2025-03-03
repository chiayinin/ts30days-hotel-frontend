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
}
