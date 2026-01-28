type CSSObject = Record<string, string | number>;
type StaticRule = [string, CSSObject];
type DynamicRule = [RegExp, (match: RegExpExecArray) => CSSObject];
type Rule = StaticRule | DynamicRule;

function handleValue(val: string): string {
  if (val.startsWith("[") && val.endsWith("]")) {
    return val.slice(1, -1);
  }
  if (/^\d+$/.test(val)) {
    return `${Number(val) / 4}rpx`;
  }
  //
  return val;
}

export class Generator {
  rules: Rule[] = [
    // 布局 Layout
    ["flex", { display: "flex" }],
    ["block", { display: "block" }],
    ["hidden", { display: "none" }],

    // Flexbox
    ["items-center", { "align-items": "center" }],
    ["justify-center", { "justify-content": "center" }],
    ["justify-between", { "justify-content": "space-between" }],
    ["justify-end", { "justify-content": "flex-end" }],
    ["flex-col", { "flex-direction": "column" }],
    ["flex-1", { flex: 1 }],

    // 颜色 Colors
    ["text-white", { color: "#ffffff" }],
    ["text-black", { color: "#000000" }],
    ["text-red", { color: "red" }],
    ["text-gray", { color: "#6b6e6d" }],
    ["bg-white", { "background-color": "#ffffff" }],
    ["text-green", { color: "green" }],

    [/^text-([^:]+)$/, (match) => ({ color: handleValue(match[1]) })],
    [
      /^bg-([^:]+)$/,
      (match) => ({ "background-color": handleValue(match[1]) }),
    ],

    [/^p-([^:]+)$/, (match) => ({ padding: handleValue(match[1]) })],
    [/^m-([^:]+)$/, (match) => ({ margin: handleValue(match[1]) })],

    [/^mt-([^:]+)$/, (match) => ({ "margin-top": handleValue(match[1]) })],
    [/^mb-([^:]+)$/, (match) => ({ "margin-bottom": handleValue(match[1]) })],
    [/^ml-([^:]+)$/, (match) => ({ "margin-left": handleValue(match[1]) })],
    [/^mr-([^:]+)$/, (match) => ({ "margin-right": handleValue(match[1]) })],

    [/^pt-([^:]+)$/, (match) => ({ "padding-top": handleValue(match[1]) })],
    [/^pb-([^:]+)$/, (match) => ({ "padding-bottom": handleValue(match[1]) })],
    [/^pl-([^:]+)$/, (match) => ({ "padding-left": handleValue(match[1]) })],
    [/^pr-([^:]+)$/, (match) => ({ "padding-right": handleValue(match[1]) })],
  ];

  generate(code: string) {
    const tokens = code.split(/[\s<>"']+/);

    const styles: string[] = [];
    tokens.forEach((token) => {
      if (
        token.includes(":") &&
        !token.startsWith("text-") &&
        !token.startsWith("bg-")
      ) {
      }

      for (const rule of this.rules) {
        let styleObj: CSSObject | undefined;
        const [matcher, handler] = rule;

        if (typeof matcher === "string") {
          if (token === matcher) {
            styleObj = handler as CSSObject;
          }
        } else if (matcher instanceof RegExp) {
          const match = matcher.exec(token);
          if (match) {
            styleObj = (handler as (match: RegExpExecArray) => CSSObject)(
              match
            );
          }
        }

        if (styleObj) {
          const cssBody = Object.entries(styleObj)
            .map(([key, val]) => `${key}: ${val}`)
            .join(";");

          // 转义所有特殊字符，确保小程序编译通过
          const css = `.${token.replace(
            /[:\/.[\]%]/g,
            "\\$&"
          )} { ${cssBody}; }`;
          styles.push(css);
          break; // 关键：匹配到一个后立即停止
        }
      }
    });

    console.log("styles", styles);

    return styles;
  }
}
