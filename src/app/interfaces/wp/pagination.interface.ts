/**
 * 分頁物件實作介面
 *
 * @export
 * @interface WPpagination
 */
export interface WPpagination {
  total: number;
  totalpages: number;
  currentPage?: number;
  size?: number;
}
