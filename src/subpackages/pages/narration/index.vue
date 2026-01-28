<template>
    <view class="narration-container" @click="handleScreenClick">
        <view class="content">
            <view v-for="(line, index) in displayedParagraphs" :key="index" class="paragraph">
                <text>{{ line }}</text>
            </view>
        </view>

        <view class="footer" v-if="isFinished">
            <text class="footer-hint">点击屏幕继续 . . .</text>
            <text class="footer-icon">︾</text>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const paragraphsGroup = [
    {
        id: 1,
        content: [
            "在美国，有67%的人无法立即拿出400美元应对紧急状况。",
            "对于他们来说，生活不是选择题，而是一场在斩杀边缘的无尽挣扎。",
            "现在，你就是他们中的一员。"
        ]
    }
]
const displayedParagraphs = ref<string[]>([])
const currentGroupIndex = ref(0) // 当前组索引
const currentParaIndex = ref(0) // 当前段落索引
const currentCharIndex = ref(0) // 当前段落的当前字符索引
const isFinished = ref(false)
const startTyping = () => {
    const currentGroup = paragraphsGroup[currentGroupIndex.value]

    if (currentParaIndex.value >= currentGroup.content.length) {
        isFinished.value = true
        return
    }

    if (currentCharIndex.value === 0) {
        displayedParagraphs.value.push('')
    }
    const currentParaText = currentGroup.content[currentParaIndex.value]

    if (currentCharIndex.value < currentParaText.length) {
        displayedParagraphs.value[currentParaIndex.value] += currentParaText[currentCharIndex.value]
        currentCharIndex.value++
        setTimeout(startTyping, 100)
    } else {
        currentParaIndex.value++
        currentCharIndex.value = 0
        setTimeout(startTyping, 500)
    }
}
onMounted(() => {
    startTyping()
})
const handleScreenClick = () => {
    if (isFinished.value) {
        uni.navigateTo({ url: '/subpackages/pages/main/index' })
    }
}
</script>

<style scoped>
.narration-container {
    width: 100vw;
    height: 100vh;
    background-color: #0c0c0d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 60rpx;
    box-sizing: border-box;
}

.content {
    width: 100%;
    text-align: center;
}

.paragraph {
    color: #ffffff;
    font-size: 34rpx;
    line-height: 1.8;
    margin-bottom: 80rpx;
    min-height: 1.8em;
    letter-spacing: 2rpx;
}

.footer {
    position: absolute;
    bottom: 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeIn 1s ease-in forwards;
}

.footer-hint {
    color: rgba(255, 255, 255, 0.3);
    font-size: 24rpx;
    margin-bottom: 20rpx;
}

.footer-icon {
    color: rgba(255, 255, 255, 0.3);
    font-size: 40rpx;
    animation: bounce 2s infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20rpx);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10rpx);
    }

    60% {
        transform: translateY(-5rpx);
    }
}
</style>