<template>
    <view class="progress-track">
        <view class="progress-fill" :style="{
            width: props.percentage + '%',
            backgroundColor: props.color
        }"></view>
    </view>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'LineProgress',
    description: '线性进度条'
})

interface Props {
    percentage: number;
    color: string
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.progress-track {
    width: 100%;
    height: 14rpx;
    background-color: rgba(30, 41, 59, 0.8);
    border-radius: 999rpx;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    border-radius: 999rpx;
    transition: width 0.3s ease-out;
}
</style>