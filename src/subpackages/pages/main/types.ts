// 状态条类型
export interface StatusBarItem {
  label: string;
  value: number; // 0-1
  currentStatus: string;
  color: string;
  statusText: string;
}
