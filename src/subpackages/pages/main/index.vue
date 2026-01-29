<template>
    <view class="blue-collar-container">
        <view id="top-container" class="top-container">
            <view class="top-info">
                <view class="top-info-header">
                    <text class="section-label">时间轴</text>
                    <text class="section-label text-glitch ">信用危机惩罚</text>
                    <text class="section-label">可用现金</text>
                </view>
                <view class="top-info-content">
                    <text class="title">
                        第1周<text class="line"></text>第1天<text class="time">上午</text>
                    </text>
                    <text class="cash">${{ cash }}</text>
                </view>
            </view>
            <view class="flex justify-between">
                <StatusBar :statusBars="statusBars" />
                <view class="flex items-center credit-info credit-status-card">
                    <text class="material-symbols-outlined" style="color:#8892a7">credit_card</text>
                    <view class="score-detail ">
                        <view class="text-gray">信用分</view>
                        <view class="text-white">{{ creditScore }}</view>
                    </view>
                </view>
            </view>
        </view>
        <CustomTabbar currentPath="subpackages/pages/main/index" />

        <view @click="add" class="text-white">按钮</view>

        <view class="main-visual">
            <Visual id="visual-area">
                <Tag :text="address" />
            </Visual>
            <Action id="action-list-container" :data="actionList" class="action-wrapper" :scrollHeight="scrollHeight" />
        </view>



        <!-- <view class="ambient text-gray flex justify-center">
            <text>“那阵持续的低鸣裹着疲惫渗透进来，分不清是外界声响，还是自己为生计运转到麻木的心跳。”</text>
        </view> -->
    </view>
</template>



<script setup lang="ts">




import CustomTabbar from '@/components/CustomTabbar/CustomTabbar.vue'
import StatusBar from "@/components/StatusBar.vue/StatusBar.vue"
import Tag from "@/components/Tag/Tag.vue"
import Visual from "./components/Visual.vue"
import Action from "./components/Action.vue"
import { onMounted, ref, getCurrentInstance, computed } from 'vue'
import { useResourceStore } from "@/stores/resource"
import { storeToRefs } from "pinia"
import { ResourceType } from '@/constants/resource'

const resourceStore = useResourceStore()
const { cash, stamina, spirit, creditScore, health } = storeToRefs(resourceStore)

const STATUS_BAR_CONFIG = [
    { key: 'health', label: '健康', color: '#cb504e', icon: 'ecg_heart' },
    { key: 'spirit', label: '精神', color: '#eebc5e', icon: 'cognition_2' },
    { key: 'stamina', label: '体力', color: '#64b5f6', icon: 'bolt' }
] as const


const statusBars = computed(() => {
    const valueMap = {
        health: health.value,
        spirit: spirit.value,
        stamina: stamina.value
    }

    return STATUS_BAR_CONFIG.map(item => ({
        label: item.label,
        value: Math.max(0, valueMap[item.key]) / 100,
        color: item.color,
        icon: item.icon
    }));
})

const actionList = ref([])
const scrollHeight = ref<number>(0)
const address = ref<string>("车库工作室（个人）")


onMounted(() => {
    const instance = getCurrentInstance()
    const sysInfo = uni.getSystemInfoSync()
    const windowHeight = sysInfo.windowHeight

    const query = uni.createSelectorQuery().in(instance)

    // 直接获取 Action 组件的位置信息
    query.select('#action-list-container').boundingClientRect()

    query.exec((res) => {
        if (!res[0]) return
        const actionRect = res[0]
        const tabbarHeight = uni.upx2px(200)

        // 剩余高度 = 屏幕高度 - Action组件的起始顶端位置 - 底部Tabbar高度
        const remainingPx = windowHeight - actionRect.top - tabbarHeight

        const pixelRatio = 750 / sysInfo.windowWidth
        scrollHeight.value = (remainingPx * pixelRatio) - 20
    })
})

const add = () => {
    resourceStore.addResource(ResourceType.CASH, 500, 'test')
    resourceStore.dailyCheck()
    resourceStore.dailyCheck()
}

</script>

<style scoped lang="scss">
.blue-collar-container {
    display: flex;
    flex-direction: column;
    height: 100vh; // Changed from min-height
    background: #0a0a0a;
    overflow: hidden; // Prevent page scroll
}

.main-visual {
    flex: 1;
    height: 0; // Essential for flex items to scroll
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.top-container {
    padding: 20rpx 12rpx;
}

.top-info {
    margin-bottom: 20rpx
}

.top-info-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 16rpx;
}

.top-info-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 50rpx;
    font-weight: 700;

    .title {

        color: #ffffff;
        display: flex;
        align-items: center;

        .line {
            display: inline-block;
            margin: 0 20rpx;
            width: 2rpx;
            height: 38rpx;
            border-left: 2rpx solid #ffffff;
        }

        .time {
            font-size: 38rpx;
            margin-left: 20rpx;
        }
    }

    .cash {
        color: #fcd34d;
    }
}


.section-label {
    font-size: 28rpx;
    font-weight: 500;
    color: #9ca3af;
}

.credit-status-card {
    background-color: #3e413d;
    padding: 3rpx 20rpx;
    border-radius: 60rpx;
}

.score-detail {
    margin-left: 14rpx;

    &>view:nth-child(1) {
        font-size: 26rpx
    }

    &>view:nth-child(2) {
        font-size: 30rpx
    }
}

.ambient {
    position: fixed;
    bottom: 200rpx;

    text {
        font-style: italic;
        font-size: 26rpx;
        padding: 30rpx;
        line-height: 1.6;
        display: block;
    }
}


@keyframes crisis-pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
}

.crisis-border {
    border: 1px solid #ef4444;
    animation: crisis-pulse 2s infinite;
}


/* 定义故障动画关键帧 */
@keyframes glitch-skew {
    0% {
        transform: skew(0deg);
    }

    20% {
        transform: skew(-20deg);
    }

    40% {
        transform: skew(10deg);
    }

    60% {
        transform: skew(-5deg);
    }

    80% {
        transform: skew(5deg);
    }

    100% {
        transform: skew(0deg);
    }
}

.text-glitch {
    display: inline-block;
    color: #ef4444;
    /* 强制红色 */
    position: relative;
    /* 间歇性触发故障 */
    animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    animation-delay: 2s;
    /* 每2秒抽搐一次，而不是一直抖 */
}


@keyframes shake-hard {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

.anim-shake {
    animation: shake-hard 0.5s;
}
</style>