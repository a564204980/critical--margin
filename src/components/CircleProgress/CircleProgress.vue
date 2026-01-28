<template>
    <view class="circle-progress-container" :style="{ width: size + 'rpx', height: size + 'rpx' }">
        <canvas type="2d" :id="canvasId" class="progress-canvas"
            :style="{ width: size + 'rpx', height: size + 'rpx' }"></canvas>

        <view class="center-content">
            <slot></slot>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, watch, getCurrentInstance, ref } from 'vue'

defineOptions({
    name: 'CircleProgress',
    description: '圆形进度条'
})

const props = defineProps({
    percentage: { type: Number, default: 0 }, // 0 - 100
    size: { type: Number, default: 120 },     // 尺寸 (rpx)
    strokeWidth: { type: Number, default: 8 },// 线条宽度
    color: { type: String, default: '#f2b02c' } // 进度颜色
})

const instance = getCurrentInstance()
const canvasId = `progress-canvas-${instance?.uid || Math.random().toString(36).substr(2)}`
let ctx: any = null
let canvas: any = null

onMounted(() => {
    // 确保 DOM 挂载后初始化 Canvas
    setTimeout(() => {
        initCanvas()
    }, 200)
})

watch(() => props.percentage, () => {
    drawProgress()
})

watch(() => props.color, () => {
    drawProgress()
})

const initCanvas = () => {
    if (!instance) return

    // 使用 instance.proxy 确保在正确的上下文中
    const query = uni.createSelectorQuery().in(instance.proxy || instance)

    query.select(`#${canvasId}`)
        .fields({ node: true, size: true } as any, () => { })
        .exec((res) => {
            if (!res[0] || !res[0].node) return

            canvas = res[0].node
            ctx = canvas.getContext('2d')

            const dpr = uni.getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)

            drawProgress()
        })
}

const drawProgress = () => {
    if (!ctx || !canvas) return

    // 获取实际的px尺寸（因为canvas.width/height是受dpr影响的，我们绘图基于CSS尺寸（px））
    // 注意：ctx.scale(dpr, dpr)后，坐标系就是 res[0].width/height 的大小
    // 由于我们无法直接获取到 res[0].width 所以需要再次换算或者保存
    // 实际上我们可以直接用 upx2px 来计算绘图参数

    // 清空画布
    // 由于坐标系被缩放了，clearRect 的范围应该是逻辑像素尺寸
    // 为了简单起见，我们重新获取一次尺寸或者直接用 upx2px 计算
    const sizePx = uni.upx2px(props.size)
    const center = sizePx / 2
    const radius = (sizePx - uni.upx2px(props.strokeWidth)) / 2
    const strokeWidthPx = uni.upx2px(props.strokeWidth)

    ctx.clearRect(0, 0, sizePx, sizePx)

    // 绘制背景圆环
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, 2 * Math.PI)
    ctx.lineWidth = strokeWidthPx
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineCap = 'round'
    ctx.stroke()

    // 绘制进度圆环
    // 修正角度：从 -90度 开始
    const startAngle = -Math.PI / 2
    const endAngle = -Math.PI / 2 + (props.percentage / 100) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.lineWidth = strokeWidthPx
    ctx.strokeStyle = props.color
    ctx.lineCap = 'round'

    // 设置阴影
    ctx.shadowColor = props.color
    ctx.shadowBlur = 4

    ctx.stroke()

    // 重置阴影
    ctx.shadowBlur = 0
}
</script>

<style scoped lang="scss">
.circle-progress-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.progress-canvas {
    position: absolute;
    top: 0;
    left: 0;
}

.center-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
</style>
