import { defineStore } from "pinia";
import { readonly, ref, watch } from "vue";
import { ResourceType, type ResourceLog } from "@/constants/resource";

export const useResourceStore = defineStore("resource", () => {
  const cash = ref<number>(404.5); // 现金
  const stamina = ref<number>(100); // 体力
  const spirit = ref<number>(100); // 精神值
  const creditScore = ref<number>(610); // 信用分
  const health = ref<number>(100); // 健康值

  const version = ref<number>(1); // 数据版本号
  const logs = ref<ResourceLog[]>([]); // 变更日志

  const STORAGE_KEY = "GAME_RESOURCE_DATA_V1";

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
      return Math.round(val);
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
    reason: string,
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
    };

    try {
      uni.setStorageSync(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("保存失败", e);
    }
  };

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
  };
});
