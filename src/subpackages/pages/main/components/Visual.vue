<template>
    <view class="visual-container">
        <image class="visual-bg" :src="bgImage" mode="aspectFill" />
        <view class="content">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import bgImage from '@/subpackages/static/images/visual-bg.png'
</script>

<style scoped lang="scss">
.visual-container {
    position: relative;
    width: 100%;
    height: 400rpx;
    overflow: hidden;
    border-radius: 20rpx;
}

.visual-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.content {
    position: absolute;
    z-index: 1;
    bottom: 4rpx;
    left: 4rpx;
    margin: 4rpx;
}
</style>