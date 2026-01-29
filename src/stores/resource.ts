import { defineStore } from "pinia";
import { readonly, ref, watch } from "vue";
import { ResourceType, type ResourceLog } from "@/constants/resource";
import { IRRATIONAL_CONSUMPTION_REASONS } from "@/constants/texts";
import { STORAGE_KEY } from "@/constants/stroage";
import { removeStorage, setStorage } from "@/utils/storage";

export const useResourceStore = defineStore("resource", () => {
  const cash = ref<number>(404.5); // 现金
  const stamina = ref<number>(80); // 体力
  const spirit = ref<number>(90); // 精神值
  const creditScore = ref<number>(600); // 信用分
  const health = ref<number>(95); // 健康值

  const version = ref<number>(1); // 数据版本号
  const logs = ref<ResourceLog[]>([]); // 变更日志

  // 用于记录连续触发天数
  const counters = ref({
    lowCashDays: 0, // 现金<0 持续天数
    lowStaminaDays: 0, // 体力<30 持续天数
    highCashDays: 0, // (备用) 现金充足持续天数
  });

  // 用于动态修正数值 (如打工收入降低)
  const modifiers = ref({
    income: 1.0, // 收入系数
    staminaRecovery: 1.0, // 体力恢复系数
  });
  // 状态标记 (UI显示用)
  const flags = ref({
    isCreditCrisis: false, // 信用危机
    isNumb: false, // 麻木状态
    isOut: false, // 晕倒/住院
  });

  let saveTimer: any = null;

  const resourceMap = {
    [ResourceType.CASH]: cash,
    [ResourceType.STAMINA]: stamina,
    [ResourceType.SPIRIT]: spirit,
    [ResourceType.CREDIT_SCORE]: creditScore,
    [ResourceType.HEALTH]: health,
  };

  /**
   * 格式化资源值
   * @param type 资源类型
   * @param val 资源值
   * @returns 格式化后的资源值
   */
  const formatValue = (type: ResourceType, val: number): number => {
    if (type === ResourceType.CASH) {
      return Number(val.toFixed(2));
    } else {
      return Math.max(0, Math.round(val));
    }
  };

  /**
   * 生成日志
   * @param type 资源类型
   * @param changeVal 变化值
   * @param reason 版本号
   */
  const addLog = (type: ResourceType, changeVal: number, reason: string) => {
    logs.value.push({
      id: Date.now(),
      type,
      value: changeVal,
      reason,
      timestamp: Date.now(),
      version: version.value,
    });

    if (logs.value.length > 50) logs.value.shift();
  };

  /**
   * 增加资源
   * @param type 资源类型
   * @param value 增加的数值 (必须 > 0)
   * @param reason 来源
   */
  const addResource = (type: ResourceType, value: number, reason: string) => {
    if (value <= 0) {
      console.warn("增加资源的值必须大于0");
      return;
    }

    const targetRef = resourceMap[type];
    const originalVal = targetRef.value;

    let newVal = originalVal - value;
    newVal = formatValue(type, newVal);

    if (newVal !== originalVal) {
      targetRef.value = newVal;
      version.value++;
      addLog(type, value, reason);
    }
  };

  /**
   * 减少资源
   * @param type 资源类型
   * @param value 减少的数值 (必须 > 0)
   * @param reason 原因
   */
  const reduceResource = (
    type: ResourceType,
    value: number,
    reason: string
  ) => {
    if (value <= 0) {
      console.warn("减少资源的值必须大于0");
      return;
    }

    const targetRef = resourceMap[type];
    const originalVal = targetRef.value;

    let newVal = originalVal - value;
    newVal = formatValue(type, newVal);

    if (newVal !== originalVal) {
      targetRef.value = newVal;
      version.value++;
      addLog(type, -value, reason);
    }
  };

  /**
   * 获取当前资源值 (只读)
   */
  const getResource = (type: ResourceType): number => {
    return resourceMap[type].value;
  };

  /**
   * 保存数据到本地
   */
  const saveResource = () => {
    const data = {
      cash: cash.value,
      stamina: stamina.value,
      spirit: spirit.value,
      creditScore: creditScore.value,
      health: health.value,

      version: version.value,
      logs: logs.value,

      counters: counters.value,
      modifiers: modifiers.value,
      flags: flags.value,
    };

    setStorage(STORAGE_KEY, JSON.stringify(data));
  };

  /**
   * 重置数据
   */
  const resetData = () => {
    cash.value = 404.5;
    stamina.value = 80;
    spirit.value = 90;
    creditScore.value = 600;
    health.value = 95;

    counters.value = { lowCashDays: 0, lowStaminaDays: 0, highCashDays: 0 };
    modifiers.value = { income: 1.0, staminaRecovery: 1.0 };
    flags.value = { isCreditCrisis: false, isNumb: false, isOut: false };

    version.value = 1;
    logs.value = [];

    removeStorage(STORAGE_KEY);
  };

  // 初始化数据
  const initResource = () => {
    try {
      const value = uni.getStorageSync(STORAGE_KEY);
      if (value) {
        const data = JSON.parse(value);
        // 恢复数据
        cash.value = data.cash;
        stamina.value = data.stamina;
        spirit.value = data.spirit;
        creditScore.value = data.creditScore;
        health.value = data.health;

        version.value = data.version;
        logs.value = data.logs || [];

        if (data.counters) counters.value = data.counters;
        if (data.modifiers) modifiers.value = data.modifiers;
        if (data.flags) flags.value = data.flags;

        console.log("数据已恢复", data);
      }
    } catch (e) {
      console.error("读取存档失败", e);
    }
  };

  // 判断是否有存档数据
  const hasSaveData = () => {
    return version.value > 1 || logs.value.length > 0;
  };

  const dailyCheck = () => {
    console.log("=== 正在执行每日资源联动检查 ===");

    // 现金联动 规则: 现金 < 0 持续 3 天 -> 信用分 -5/天，收入打9折
    if (cash.value < 0) {
      counters.value.lowCashDays++;
      console.log(`[联动] 现金赤字持续 ${counters.value.lowCashDays} 天`);

      if (counters.value.lowCashDays >= 0) {
        reduceResource(ResourceType.CREDIT_SCORE, 5, "信用危机惩罚");
        modifiers.value.income = 0.9;
        flags.value.isCreditCrisis = true;
      }
    } else {
      // 恢复正常
      counters.value.lowCashDays = 0;
      modifiers.value.income = 1.0;
      flags.value.isCreditCrisis = false;
    }

    // 体力联动 规则: 体力 < 30 持续 3 天 -> 精神 -3
    if (stamina.value < 30) {
      counters.value.lowStaminaDays++;
      if (counters.value.lowStaminaDays > 0) {
        reduceResource(ResourceType.SPIRIT, 3, "长期劳累");
      }
    } else {
      counters.value.lowStaminaDays = 0;
    }

    // 规则: 精神 < 20 -> 非理性消费 (随机扣 $10-$30)
    if (stamina.value < 20) {
      const loss = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
      const reasons = IRRATIONAL_CONSUMPTION_REASONS;
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

      reduceResource(ResourceType.CASH, loss, randomReason);
      flags.value.isNumb = true;
    } else {
      flags.value.isNumb = false;
    }

    saveResource();
  };

  // 监听状态变化
  useResourceStore().$subscribe((_mutation, _state) => {
    if (saveTimer) {
      clearTimeout(saveTimer);
    }

    saveTimer = setTimeout(() => {
      saveResource();
    }, 1000);
  });

  return {
    cash: readonly(cash),
    stamina: readonly(stamina),
    spirit: readonly(spirit),
    creditScore: readonly(creditScore),
    health: readonly(health),
    formatValue,
    addLog,
    addResource,
    reduceResource,
    getResource,
    initResource,
    hasSaveData,
    dailyCheck,
    resetData,
  };
});
