<template>
    <view class="action-container">
        <view class="text-white font-500 action-title">每日行动</view>
        <scroll-view scroll-y class="action-scroll" :style="{ height: scrollHeight + 'rpx' }">
            <view class="action-item flex items-center" style="background-color: #1f2024;" v-for="(item, index) in data"
                :key="index">
                <view class="action-icon" style="background-color: #2a2b2f;">
                    <text class="material-symbols-outlined" style="color:#8d96a4; font-variation-settings: 'FILL' 1;">{{
                        item.icon }}</text>
                </view>
                <view class="action-content flex justify-between flex-1">
                    <view class="action-info-wrapper">
                        <text class="text-white font-500">{{ item.title }}</text>
                        <view class="text-gray action-meta">
                            <text>{{ item.desc }}</text>
                            <text>|</text>
                            <text class="text-green">+{{ item.baseReward }}</text>
                        </view>
                    </view>
                    <view class="action-cost font-500 flex items-center" style="color:#962e2f">
                        <text>-{{ item.baseCost }}体力</text>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ActionDefinition } from '@/config/actions';

const props = defineProps({
    data: {
        type: Array as PropType<ActionDefinition[]>,
        default: () => []
    },
    scrollHeight: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped lang="scss">
.action-container {
    padding: 10rpx 20rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
}

.action-title {
    margin-bottom: 20rpx;
}



.action-item {
    margin-bottom: 20rpx;
    padding: 14rpx 20rpx;
    border: 1px solid #363638;
    border-radius: 6rpx;
}


.action-icon {
    display: inline-block;
    padding: 14rpx;
    margin-right: 10rpx;
}

.action-info-wrapper {
    .action-meta {
        &>text:nth-child(2) {
            padding: 0 10rpx;
        }
    }
}

.action-cost {
    text {
        padding: 4rpx 14rpx;
        background-color: rgba($color: #962e2f, $alpha: 0.3);
        border-radius: 6rpx;
        border: 1px solid rgba($color: #962e2f, $alpha: 0.6);
    }
}
</style>