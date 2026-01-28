<template>
    <view class="tag-container flex" :class="['tag-container--custom', customClass]" aria-label="标签组件"
        :style="containerStyle">
        <text class="material-symbols-outlined" :style="{ color: iconColor }">{{ icon }}</text>
        <text class="text-white">{{ text }}</text>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TagProps {
    icon?: string
    iconColor?: string
    text?: string
    customClass?: string
    bgColor?: string
}

const props = withDefaults(defineProps<TagProps>(), {
    icon: 'location_on',
    iconColor: '#eebc5e',
    text: '',
    customClass: '',
    bgColor: 'rgba(51, 43, 0, 0.7)'
})

const containerStyle = computed(() => ({
    backgroundColor: props.bgColor
}))
</script>

<style scoped lang="scss">
.tag-container {
    display: inline-flex;
    align-items: center;
    gap: 8rpx;
    padding: 10rpx 20rpx;
    border-radius: 60rpx;
    box-sizing: border-box;
    transition: all 0.2s ease;

}
</style>