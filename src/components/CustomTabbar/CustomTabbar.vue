<template>
    <view class="tabbar-container">
        <view class="tabbar-blur"></view>
        <view class="tabbar-content">
            <view v-for="(item, index) in tabList" :key="index" class="tab-item" @click="handleTabbar(index)"
                :class="{ active: currentTabbarIndex === index }">
                <text class="material-symbols-outlined tab-icon"
                    :style="{ color: currentTabbarIndex === index ? '#020000' : '#626469' }">{{ item.icon }}</text>
                <text class="tab-text" :style="{ color: currentTabbarIndex === index ? '#020000' : '#626469' }">{{
                    item.text }}</text>
                <view class="active-indicator" v-if="currentTabbarIndex === index"></view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    currentPath: String
})
const tabList = [
    { pagePath: 'pages/main/index', text: '行动', icon: 'directions_run', },
    { pagePath: 'pages/main/index', text: '地图', icon: 'map', },
    { pagePath: 'pages/map/index', text: '账单', icon: 'account_balance_wallet' },
    { pagePath: 'pages/map/index', text: '系统', icon: 'tune' }
]
const currentTabbarIndex = ref<number>(0)


const switchTab = (path: string) => {
    // 因为不再配置 tabBar，使用 reLaunch 或 redirectTo 实现页面无痕切换
    uni.reLaunch({
        url: '/' + path
    })
}

const handleTabbar = (index: number) => {
    currentTabbarIndex.value = index
}
</script>
<style scoped>
.tabbar-container {
    width: 100%;
    position: fixed;
    bottom: 0rpx;
    height: 200rpx;
    z-index: 1000;
}

.tabbar-blur {
    position: absolute;
    inset: 0;
    background: #101116;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.6);
}

.tabbar-content {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20rpx 0 40rpx;
    box-sizing: border-box;
}

.tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    width: calc(25% - 60rpx);
    height: calc(100% - 20rpx);
    background: #0e1116;
    color: #646669;
    border-radius: 20rpx;
}

.active {
    background: #f1ad27;
}

.tab-icon {
    font-size: 48rpx;
    color: rgba(255, 255, 255, 0.3);
}

.tab-text {
    font-size: 20rpx;
    color: rgba(255, 255, 255, 0.3);
    margin-top: 4rpx;
}

/* 激活状态：霓虹黄色 */
.tab-item.active .tab-icon {
    color: #f2b02c;
    text-shadow: 0 0 20rpx rgba(242, 176, 44, 0.8);
}

.tab-item.active .tab-text {
    color: #f2b02c;
}

.active-indicator {
    position: absolute;
    bottom: -4rpx;
    width: 30rpx;
    height: 4rpx;
    background: #f2b02c;
    box-shadow: 0 0 15rpx #f2b02c;
}
</style>