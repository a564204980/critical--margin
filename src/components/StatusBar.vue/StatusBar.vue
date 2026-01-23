<template>
    <view class="status-container">
        <view class="status-bars">
            <view class="status-bar-item" v-for="(item, index) in props.statusBars" :key="index">
                <view class="status-bar-header flex justify-between">
                    <text class="status-label text-white font-500" :style="{ color: item.color }">{{ item.label
                    }}</text>
                    <text class="text-white font-500" :style="{ color: item.color }">{{ item.statusText }}</text>
                </view>
                <view class="status-bar">
                    <van-progress :percentage="50" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
const props = defineProps<{ statusBars: StatusBarItem[] }>()
</script>

<style scoped lang="scss">
.status-bar-item {
    width: 70%;
}
</style>
