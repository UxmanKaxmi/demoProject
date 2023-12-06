module.exports = {
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    indent: ["warn", 2],
    quotes: ["warn", "single"],
    "no-unused-vars": ["error", { warn: "none" }],
    "max-len": ["warn", 150],
    "no-console": 1,
    "object-curly-newline": [
      "warn",
      {
        ObjectPattern: { multiline: true },
        ExportDeclaration: { multiline: true, minProperties: 4 },
      },
    ],
  },
};
