<template>
    <view class="status-container">
        <view class="status-bars flex">
            <view class="status-bar-item flex items-center" v-for="(item, index) in props.statusBars" :key="index">
                <view class="status-bar-header flex items-center">
                    <view class="status-info">
                        <text class="status-label text-white font-500 text-gray">{{ item.label
                        }}</text>
                        <text class="text-white font-500 status-number">{{ item.value * 100 }}%</text>
                    </view>
                    <CircleProgress :percentage="item.value * 100" :size="80" :stroke-width="6" :color="item.color">
                        <text class="material-symbols-outlined" :style="{ color: item.color }">{{ item.icon }}</text>
                    </CircleProgress>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import CircleProgress from "../CircleProgress/CircleProgress.vue"
import type { StatusBarItem } from "./types"

const props = defineProps<{ statusBars: StatusBarItem[] }>()
</script>

<style scoped lang="scss">
.status-bars {
    gap: 24rpx;
}

.status-bar-header {
    gap: 8rpx;
}

.status-info {
    display: flex;
    flex-direction: column;

}

.status-number {
    font-size: 24rpx;
}
</style>
