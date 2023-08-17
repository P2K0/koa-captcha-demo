module.exports = {
  root: true,
  extends: ["@antfu"],
  // 规则配置
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 根据生产或开发环境，禁止或允许使用控制台语句

    "@typescript-eslint/semi": [2, "always"],
    // 强制在 TypeScript 代码中使用分号

    "@typescript-eslint/comma-dangle": ["error", "never"],
    // 强制函数参数和对象/数组字面量不使用尾随逗号

    "@typescript-eslint/quotes": ["error", "double"],
    // 强制在 TypeScript 代码中使用双引号

    "antfu/if-newline": "off",
    // 关闭来自 "@antfu" 预设的自定义 "if-newline" 规则

    "vue/html-self-closing": ["error", {
      html: {
        normal: "always",
        void: "always",
        component: "always"
      }
    }],
    // 强制在 HTML 模板中对普通、无内容和组件元素使用自闭合标签

    "import/order": [
      "error",
      {
        "groups": [
          "builtin", // 内置模块
          "external", // 外部模块
          "type", // 类型声明
          "internal", // 内部模块
          ["parent", "sibling", "index"] // 父级、同级和索引模块导入
        ],
        "newlines-between": "always", // 在每个导入组之间添加换行
        "alphabetize": {order: "asc", caseInsensitive: true} // 按字母顺序排序，忽略大小写
      }
    ],
    // 强制特定的导入顺序和分组

    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
      }
    ],
    // 强制排序

    "curly": ["error", "multi-line"],
    // 在多行语句中强制使用花括号包裹块语句，防止错误并提高代码清晰度

    "max-statements-per-line": "off",
    // 关闭每行允许的最大语句数限制

    'vue/v-on-event-hyphenation': 'off',
    // 忽略事件名是否使用连字符命名的检查
  }
};
