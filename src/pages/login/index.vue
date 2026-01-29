<template>
    <view class="page">

        <view class="bg-layer">
            <image class="bg-image" :src="LoginBg" mode="aspectFill" />
            <view class="gradient-overlay"></view>
            <view class="color-overlay"></view>
        </view>

        <view class="main-content">

            <view :class="['header-section', { 'glitch-animate': isPrimaryPressed }]">
                <view class="warning-badge">
                    <text class="warning-icon">⚠</text>
                    <text class="warning-text">Survival Mode</text>
                </view>

                <view class="title-wrapper">
                    <view class="main-title glitch-text" data-test="缘">临界边缘</view>
                </view>
                <view class="subtitle-wrapper">
                    <text class="subtitle">美国斩杀线</text>
                </view>
            </view>

            <view class="button-section">
                <button :class="['btn-primary', { 'btn-primary-active': isPrimaryPressed }]"
                    @touchstart="isPrimaryPressed = true" @click="handleStart">
                    <view class="btn-shimmer"></view>
                    <text class="btn-text">{{ isPrimaryPressed ? '挣扎中...' : '开始挣扎' }}</text>
                </button>

                <button class="btn-secondary" v-if="store.hasSaveData()" @click="handleContinue">
                    <text class="btn-text-secondary">继续游戏</text>
                </button>
            </view>

            <view class="footer">
                <text class="version-text">Ver 0.8.4_beta // ALICE_SERVER</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import LoginBg from "@/static/images/login-bg.png"
import { useResourceStore } from '@/stores/resource';
import { removeStorage } from "@/utils/storage";
import { STORAGE_KEY } from "@/constants/stroage";

import { ref, onMounted } from 'vue'

const store = useResourceStore();
const saveData = ref<boolean>(false)
const isPrimaryPressed = ref<boolean>(false)

onMounted(() => {
    console.log('页面加载完成', store.hasSaveData())

})

const handleStart = (): void => {
    removeStorage(STORAGE_KEY)

    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    }).then(() => {
        uni.navigateTo({ url: '/subpackages/pages/narration/index' })
    }).finally(() => {
        setTimeout(() => {
            isPrimaryPressed.value = false
        }, 1000)
    })

}

const handleContinue = (): void => {
    saveData.value = store.hasSaveData()

    if (saveData.value) {
        // uni.navigateTo({ url: '/pages/game/game?continue=true' })
    } else {
        uni.showToast({
            title: '暂无存档',
            icon: 'none'
        })
    }
}
</script>

<style scoped>
.page {
    position: relative;
    width: 750rpx;
    min-height: 100vh;
    overflow: hidden;
    background-color: #0c0c0d;
}

.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
}

.bg-image {
    width: 100%;
    height: 100%;
    transform: scale(1.05);
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
            rgba(12, 12, 13, 0.3) 0%,
            rgba(12, 12, 13, 0.6) 50%,
            rgba(12, 12, 13, 0.95) 100%);
}

.color-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(12, 18, 24, 0.4);
}

.main-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 48rpx;
}

.header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 200rpx;
}

.warning-badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16rpx;
}

.warning-icon {
    color: #f2b02c;
    font-size: 40rpx;
    margin-right: 16rpx;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.warning-text {
    color: rgba(242, 176, 44, 0.8);
    font-size: 20rpx;
    font-weight: bold;
    letter-spacing: 8rpx;
    text-transform: uppercase;
}

.title-wrapper {
    margin-bottom: 16rpx;
}

.main-title {
    color: #ffffff;
    font-size: 96rpx;
    font-weight: 900;
    letter-spacing: -4rpx;
    line-height: 1;
}

.glitch-text {
    position: relative;
    text-shadow:
        4rpx 0 rgba(255, 0, 80, 0.5),
        -4rpx 0 rgba(0, 255, 255, 0.5);
}

.glitch-text::after {
    content: attr(data-test);
    position: absolute;
    left: calc(50% - 16px);
    top: 80rpx;
    color: white;
    text-shadow: -2rpx 0 #00f3ff;
    clip-path: polygon(0 36%, 100% 36%, 100% 100%, 0 100%);
    opacity: 0.7;
}

.subtitle-wrapper {
    border-bottom: 4rpx solid rgba(242, 176, 44, 0.5);
    padding-bottom: 8rpx;
}

.subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 36rpx;
    font-weight: bold;
    letter-spacing: 12rpx;
    text-transform: uppercase;
}

.button-section {
    width: 100%;
    max-width: 600rpx;
}

.btn-primary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120rpx;
    margin-bottom: 24rpx;
    background: linear-gradient(135deg, #f2b02c 0%, #ffc145 100%);
    border-radius: 16rpx;
    border: none;
    box-shadow: 0 0 40rpx -10rpx rgba(242, 176, 44, 0.6);
}

.btn-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(100%) skewY(12deg);
    transition: transform 0.3s ease-out;
}

.btn-primary-active .btn-shimmer {
    transform: translateY(0) skewY(12deg);
}


@keyframes shimmer {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.btn-primary::after {
    border: none;
}

.btn-text {
    color: #0c0c0d;
    font-size: 44rpx;
    font-weight: 800;
}

.btn-icon {
    color: #0c0c0d;
    font-size: 40rpx;
    margin-left: 16rpx;
}

.btn-secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 96rpx;
    background-color: rgba(20, 20, 22, 0.75);
    border: 2rpx solid rgba(255, 255, 255, 0.1);
    border-radius: 16rpx;
}

.btn-secondary::after {
    border: none;
}

.btn-icon-secondary {
    color: rgba(255, 255, 255, 0.5);
    font-size: 36rpx;
    margin-right: 16rpx;
}

.btn-text-secondary {
    color: #ffffff;
    font-size: 32rpx;
    font-weight: bold;
}

.footer {
    position: absolute;
    bottom: 80rpx;
    left: 0;
    right: 0;
    text-align: center;
}

.version-text {
    color: rgba(255, 255, 255, 0.2);
    font-size: 20rpx;
    font-family: monospace;
    letter-spacing: 4rpx;
}

.btn-primary:active {
    transform: scale(0.98);
    opacity: 0.9;
}

.btn-secondary:active {
    transform: scale(0.98);
    background-color: rgba(255, 255, 255, 0.1);
}

@keyframes glitch-shake {

    0%,
    100% {
        transform: translateX(0);
        filter: none;
        opacity: 1;
    }

    5% {
        transform: translateX(-3px) skewX(-1deg);
        filter: hue-rotate(90deg);
        opacity: 0.8;
    }

    10% {
        transform: translateX(3px) skewX(1deg);
        filter: hue-rotate(-90deg);
        opacity: 1;
    }

    15% {
        transform: translateX(-2px);
        opacity: 0.6;
    }

    20% {
        transform: translateX(2px);
        filter: hue-rotate(180deg);
        opacity: 1;
    }

    25% {
        transform: translateX(-1px) skewX(-0.5deg);
        opacity: 0.9;
    }

    30% {
        transform: translateX(1px) skewX(0.5deg);
        filter: hue-rotate(-180deg);
    }
}

.glitch-animate {
    animation: glitch-shake 0.5s ease-in-out infinite;
}
</style>