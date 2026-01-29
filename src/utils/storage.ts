/**
 * 设置缓存
 * @param key 键名
 * @param data 数据
 */
export const setStorage = (key: string, data: any): void => {
  try {
    uni.setStorageSync(key, data);
  } catch (e) {
    console.error(`[Storage] Set failed for key: ${key}`, e);
  }
};

/**
 * 获取缓存
 * @param key 键名
 * @param defaultVal 默认值
 * @returns 存储的数据或默认值
 */
export const getStorage = <T>(key: string, defaultVal?: T): T | undefined => {
  try {
    const res = uni.getStorageSync(key);
    if (res === "" || res === undefined || res === null) {
      return defaultVal;
    }
    return res as T;
  } catch (e) {
    console.error(`[Storage] Get failed for key: ${key}`, e);
    return defaultVal;
  }
};

/**
 * 移除指定缓存
 * @param key 键名
 */
export const removeStorage = (key: string): void => {
  try {
    uni.removeStorageSync(key);
  } catch (e) {
    console.error(`[Storage] Remove failed for key: ${key}`, e);
  }
};

/**
 * 清理所有缓存
 */
export const clearStorage = (): void => {
  try {
    uni.clearStorageSync();
  } catch (e) {
    console.error(`[Storage] Clear failed`, e);
  }
};

/**
 * 获取当前 storage 的详细信息
 * @returns { keys, currentSize, limitSize }
 */
export const getStorageInfo = () => {
  try {
    return uni.getStorageInfoSync();
  } catch (e) {
    console.error(`[Storage] Get info failed`, e);
    return null;
  }
};
