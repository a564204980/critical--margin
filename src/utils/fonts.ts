/**
 * 加载项目所需的自定义字体库
 */
export const loadCustomFonts = () => {
  // Material Symbols Outlined
  uni.loadFontFace({
    family: "Material Symbols Outlined",
    global: true,
    source:
      'url("https://fonts.gstatic.com/s/materialsymbolsoutlined/v311/kJEPBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzBwG-RpA6RzaxHMPdY40KH8nGzv3fzfVJO1Q.woff2")',
    success() {
      console.log("Material Symbols 字体加载成功");
    },
    fail(err) {
      console.error("Material Symbols 字体加载失败", err);
    },
  });
};
