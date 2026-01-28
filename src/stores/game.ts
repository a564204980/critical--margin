import { ACTION_DEFINITIONS, type ActionDefinition } from "@/config/actions";
import { defineStore } from "pinia";

// 玩家状态接口
interface PlayerStats {
  cash: number; // 现金
  debt: number; // 债务
  health: number; // 健康/体力 (0-100)
  spirit: number; // 精神 (0-100)
  energy: number; // 行动精力 (0-100)
  maxEnergy: number;
}

// 时间系统接口
interface TimeSystem {
  day: number; // 当前天数
  week: number; // 当前周数
  hour: number; // 当前小时 (24小时制)
}

// 游戏标记 (用于解锁剧情、地点等)
interface GameFlags {
  introFinished: boolean; // 是否完成开场叙事
  [key: string]: boolean;
}

export const useGameStore = defineStore("game", {
  state: () => ({
    player: {
      cash: 128.5,
      debt: 5000,
      health: 80,
      spirit: 40,
      energy: 100,
      maxEnergy: 100,
    } as PlayerStats,

    time: {
      day: 1,
      week: 1,
      hour: 8,
    } as TimeSystem,

    flags: {
      introFinished: false,
    } as GameFlags,
    unlockedActionIds: [1, 2, 3, 4, 5, 6, 7] as number[],
  }),

  getters: {
    // 格式化时间显示 "第1周 第1天"
    dateString: (state) => `第${state.time.week}周 第${state.time.day}天`,

    // 是否破产
    isBankrupt: (state) => state.player.cash < 0,

    // 获取当前可用行动列表
    availableActions: (
      state
    ): (ActionDefinition & { realReward: number; realCost: number })[] => {
      return state.unlockedActionIds
        .map((id) => {
          const def = ACTION_DEFINITIONS[id];
          if (!def) return null;
          return {
            ...def,
          };
        })
        .filter(Boolean) as (ActionDefinition & {
        realReward: number;
        realCost: number;
      })[]; // 过滤掉无效id
    },
  },

  actions: {
    // 消耗资源
    consume(cost: {
      energy?: number;
      cash?: number;
      spirit?: number;
      health?: number;
    }) {
      if (cost.energy)
        this.player.energy = Math.max(0, this.player.energy - cost.energy);
      if (cost.cash) this.player.cash -= cost.cash;
      if (cost.spirit)
        this.player.spirit = Math.max(0, this.player.spirit - cost.spirit);
      if (cost.health)
        this.player.health = Math.max(0, this.player.health - cost.health);
    },

    // 获得收益
    earn(reward: { cash?: number; spirit?: number }) {
      if (reward.cash) this.player.cash += reward.cash;
      if (reward.spirit)
        this.player.spirit = Math.min(100, this.player.spirit + reward.spirit);
    },

    // 时间流逝
    passTime(hours: number) {
      this.time.hour += hours;
      // 简单的时间跨天逻辑 (假设24点跨天)
      if (this.time.hour >= 24) {
        this.time.day++;
        this.time.hour -= 24;
        // 恢复部分精力?
        this.player.energy = Math.min(
          this.player.maxEnergy,
          this.player.energy + 50
        );
      }
    },

    // 执行行动
    performAction(actionId: number) {
      const def =
        ACTION_DEFINITIONS[actionId as keyof typeof ACTION_DEFINITIONS];
      if (!def) return false;

      // 1. 检查消耗 (目前只检查体力)
      const cost = def.baseCost || 0;
      const reward = def.baseReward || 0;

      if (this.player.energy < cost) {
        // 这里可以返回错误信息或者抛出异常，或者通过UI Store控制Toast
        return { success: false, msg: "体力不足" };
      }

      // 2. 执行消耗
      this.consume({ energy: cost });

      // 3. 执行收益
      this.earn({ cash: reward });

      // 4. 时间流逝 (假设固定消耗4小时，后续可以在config里配置)
      this.passTime(4);

      return { success: true, msg: "行动完成" };
    },
  },
});
