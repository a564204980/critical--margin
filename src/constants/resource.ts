// 资源类型枚举
export enum ResourceType {
  CASH = "cash", // 现金
  STAMINA = "stamina", // 体力
  SPIRIT = "spirit", // 精神值
  CREDIT_SCORE = "creditScore", // 信用分
  HEALTH = "health", // 健康值
}

// Buff类型枚举
export enum BuffType {
  EMERGENCY_SAVING = "emergencySaving", // 应急储蓄（现金≥500持续7天）
  POSITIVE_MIND = "positiveMind", // 积极心态（精神≥80持续7天）
  HEALTHY_BODY = "healthyBody", // 健康体质（健康≥90持续7天）
}

// 崩溃状态枚举
export enum CrashState {
  CREDIT_CRISIS = "creditCrisis", // 现金崩溃：信用危机
  STAMINA_FAINt = "staminaFaint", // 体力崩溃：晕倒
  SPIRIT_NUMB = "spiritNumb", // 精神崩溃：麻木状态
  CREDIT_COLLAPSE = "creditCollapse", // 信用分崩溃：信用崩溃
  HEALTH_DEATH = "healthDeath", // 健康崩溃：致命感染（游戏结束）
}

// 资源基础配置接口
export interface ResourceConfig {
  initial: number; // 初始值
  max: number; // 最大值
  crashThreshold: number; // 崩溃阈值
  precision: number; // 精度：0=整数，2=保留2位小数
}

// 变更日志的结构接口
export interface ResourceLog {
  id: number; // 日志ID
  type: ResourceType; // 资源类型
  value: number; // 变化值
  reason: string; // 变化原因
  timestamp: number; // 变化时间
  version: number; // 版本号
}
