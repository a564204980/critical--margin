<template>
    <view class="blue-collar-container">
        <view class="top-container">
            <view class="top-info">
                <view class="top-info-header">
                    <text class="section-label">时间轴</text>
                    <text class="section-label">可用现金</text>
                </view>
                <view class="top-info-content">
                    <text class="title">
                        第1周<text class="line"></text>第1天
                    </text>
                    <text class="cash">$128.50</text>
                </view>
            </view>
            <StatusBar :statusBars="statusBars" />
        </view>
        <CustomTabbar currentPath="pages/main/index" />
    </view>
</template>

<script setup lang="ts">
import CustomTabbar from '@/components/CustomTabbar/CustomTabbar.vue'
import StatusBar from "@/components/StatusBar.vue/StatusBar.vue"

const statusBars = [{
    label: '财务健康度',
    value: 0.25,
    currentStatus: '警告',
    color: 'red',
    statusText: '警告'
},
{
    label: '精神值',
    value: 0.4,
    currentStatus: '疲惫',
    color: 'yellow',
    statusText: '疲惫'
},
{
    label: '体力',
    value: 0.8,
    currentStatus: '充沛',
    color: 'teal',
    statusText: '充沛'
}]


</script>

<style scoped lang="scss">
.blue-collar-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #0a0a0a;
}

.top-container {
    padding: 20rpx 30rpx;
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
    font-size: 58rpx;
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
</style>