# HTML 转 Vue3 + TypeScript + UniApp 完整学习文档

---

## 一、转换规则速查

| HTML | UniApp | 说明 |
|------|--------|------|
| `<div>` | `<view>` | 容器 |
| `<span>/<p>` | `<text>` | 文本 |
| `<img>` | `<image>` | 图片 |
| `px` | `rpx` | 1px ≈ 2rpx |
| `onclick` | `@click` | 事件绑定 |

---

## 二、完整转换代码

将原始 HTML 游戏启动页完整转换为 UniApp Vue3 + TypeScript：

```vue
<template>
  <!-- 页面容器 -->
  <view class="page">
    
    <!-- ========== 背景层 ========== -->
    <view class="bg-layer">
      <!-- 背景图片 (原 div + background-image → image 组件) -->
      <image 
        class="bg-image" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPi5zFbPbmjZItIJBkIf6SkhpX33usDOQjMp_A7MVak3SY8awXrWnouuF23sGKfqgWwEtr8KT1MNlvdArTh8XBHn_tHypQDt-VHLSxucVM3P3pn67Q-gl4wAxqb1OGv9h__0QcKp3O9kGs38jALcoZzG4pBXxTtZ2GKTICWnkfPm8Qn7_OZRDkuIcb31zaCUxiKgNlLfsuKR5RzVJjZPxXhAN1aGOeqLvoAl-Eaz8dGwjiMjEVN-KgHYHznm3Ix2Uw68u7JR8gfPBF" 
        mode="aspectFill"
      />
      <!-- 渐变遮罩 -->
      <view class="gradient-overlay"></view>
      <!-- 颜色叠加 -->
      <view class="color-overlay"></view>
    </view>

    <!-- ========== 主内容 ========== -->
    <view class="main-content">
      
      <!-- 标题区域 -->
      <view class="header-section">
        <!-- 警告标签 -->
        <view class="warning-badge">
          <text class="warning-icon">⚠</text>
          <text class="warning-text">Survival Mode</text>
        </view>

        <!-- 主标题 -->
        <view class="title-wrapper">
          <text class="main-title glitch-text">临界边缘</text>
        </view>

        <!-- 副标题 -->
        <view class="subtitle-wrapper">
          <text class="subtitle">美国斩杀线</text>
        </view>
      </view>

      <!-- 按钮区域 -->
      <view class="button-section">
        <!-- 主按钮 -->
        <button class="btn-primary" @click="handleStart">
          <text class="btn-text">开始挣扎</text>
          <text class="btn-icon">▶</text>
        </button>

        <!-- 次按钮 -->
        <button class="btn-secondary" @click="handleContinue">
          <text class="btn-icon-secondary">↻</text>
          <text class="btn-text-secondary">继续游戏</text>
        </button>
      </view>

      <!-- 底部版本号 -->
      <view class="footer">
        <text class="version-text">Ver 0.8.4_beta // ALICE_SERVER</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 游戏启动页
 * Vue3 Composition API + TypeScript
 */
import { ref, onMounted } from 'vue'

// ============ 响应式数据 ============
const isLoading = ref<boolean>(false)

// ============ 生命周期 ============
onMounted(() => {
  console.log('页面加载完成')
})

// ============ 事件处理 ============

/** 开始新游戏 */
const handleStart = (): void => {
  console.log('开始新游戏')
  isLoading.value = true
  
  uni.showToast({
    title: '开始游戏...',
    icon: 'loading'
  })
  
  // 跳转游戏页
  // uni.navigateTo({ url: '/pages/game/game' })
}

/** 继续游戏 */
const handleContinue = (): void => {
  const saveData = uni.getStorageSync('gameData')
  
  if (saveData) {
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
/* ============================
   页面基础
============================ */
.page {
  position: relative;
  width: 750rpx;
  min-height: 100vh;
  overflow: hidden;
  background-color: #0c0c0d;
}

/* ============================
   背景层
============================ */
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
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(12, 12, 13, 0.3) 0%,
    rgba(12, 12, 13, 0.6) 50%,
    rgba(12, 12, 13, 0.95) 100%
  );
}

.color-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(12, 18, 24, 0.4);
}

/* ============================
   主内容
============================ */
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

/* ============================
   标题区
============================ */
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120rpx;
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

/* 故障文字效果 */
.glitch-text {
  text-shadow: 
    4rpx 0 rgba(255, 0, 80, 0.5),
    -4rpx 0 rgba(0, 255, 255, 0.5);
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

/* ============================
   按钮区
============================ */
.button-section {
  width: 100%;
  max-width: 600rpx;
}

/* 主按钮 */
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

/* 次按钮 */
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

/* ============================
   底部
============================ */
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

/* ============================
   交互效果
============================ */
.btn-primary:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.btn-secondary:active {
  transform: scale(0.98);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
```

---

## 三、关键转换说明

### 1. 伪元素替代
原始 CSS 使用 `::before`/`::after` 实现故障文字效果，小程序不支持，改用 `text-shadow` 简化实现。

### 2. 背景图处理
```html
<!-- HTML: div + background-image -->
<div style="background-image: url('...')"></div>

<!-- UniApp: image 组件 -->
<image src="..." mode="aspectFill" />
```

### 3. 图标处理
原始用 Material Symbols 字体图标，UniApp 改用 Unicode 字符或本地图片。

### 4. API 替换
| 浏览器 | UniApp |
|--------|--------|
| `localStorage` | `uni.getStorageSync()` |
| `alert()` | `uni.showToast()` |
| `location.href` | `uni.navigateTo()` |

---

> 将此代码复制到你的 `.vue` 文件即可运行测试。

---

## 四、按钮动画效果

### 光泽扫过动画 + 脉冲发光

在 `<style>` 中添加以下代码：

```css
/* ============================
   按钮动画效果
============================ */

/* 主按钮容器 - 添加相对定位和溢出隐藏 */
.btn-primary {
    position: relative;
    overflow: hidden;
}

/* 光泽扫过效果 - 使用伪元素 (仅H5生效) */
/* 小程序需要用真实view替代 */
.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
    );
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    50%, 100% {
        left: 100%;
    }
}

/* 脉冲发光效果 */
.btn-primary {
    animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% {
        box-shadow: 0 0 40rpx -10rpx rgba(242, 176, 44, 0.6);
    }
    50% {
        box-shadow: 0 0 60rpx -5rpx rgba(242, 176, 44, 0.8);
    }
}
```

### 小程序兼容方案（用真实view替代伪元素）

由于小程序不支持 `::before`，需要用真实的 `<view>` 实现：

**模板修改：**
```vue
<button class="btn-primary" @click="handleStart">
    <!-- 光泽层 -->
    <view class="btn-shimmer"></view>
    <text class="btn-text">开始挣扎</text>
    <text class="btn-icon">▶</text>
</button>
```

**样式：**
```css
.btn-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
    );
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    50%, 100% {
        left: 100%;
    }
}
```
