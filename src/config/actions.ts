/**
 * 行动收益接口
 */
export interface ActionReward {
  label: string;
  value: number;
  type: "cash" | "spirit" | "health" | "energy"; // 资源类型：现金、精神、健康、体力
  color?: string;
}

/**
 * 行动消耗接口
 */
export interface ActionCost {
  value: number;
  type: "energy" | "cash" | "spirit" | "health"; // 资源类型：现金、精神、健康、体力
  color?: string;
}

/**
 * 行动定义接口
 */
export interface ActionDefinition {
  id: number;
  title: string; // 行动标题
  desc?: string; // 行动描述/副标题
  icon?: string; // 图标名称
  baseReward?: number; // 基础收益数值
  baseCost?: number; // 基础消耗数值
  type?: string; // 行动类型分类
  rewards?: ActionReward[]; // 详细收益列表
  costs?: ActionCost[]; // 详细消耗列表
}

export const ACTION_DEFINITIONS: Record<number, ActionDefinition> = {
  1: {
    id: 1,
    title: "工厂轮班",
    desc: "体力劳动",
    baseReward: 110,
    baseCost: 35,
    type: "muscle",
    icon: "work",
  },
  2: {
    id: 2,
    title: "便利店兼职",
    desc: "按时上下班",
    baseReward: 50,
    baseCost: 15,
    type: "easy",
    icon: "work",
  },
  3: {
    id: 3,
    title: "黑作坊帮工",
    desc: "雇主临时欠薪",
    baseReward: 0,
    baseCost: 20,
    type: "risk",
    icon: "work",
  },
  4: {
    id: 4,
    title: "黑作坊帮工",
    desc: "雇主临时欠薪",
    baseReward: 0,
    baseCost: 20,
    type: "risk",
    icon: "work",
  },
  5: {
    id: 5,
    title: "黑作坊帮工",
    desc: "雇主临时欠薪",
    baseReward: 0,
    baseCost: 20,
    type: "risk",
    icon: "work",
  },
  6: {
    id: 6,
    title: "黑作坊帮工",
    desc: "雇主临时欠薪",
    baseReward: 0,
    baseCost: 20,
    type: "risk",
    icon: "work",
  },
  99: { id: 99, title: "黑市交易" },
};
