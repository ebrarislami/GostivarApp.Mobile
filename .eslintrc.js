module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        singleQuote: false,
        trailingComma: "es5",
        jsxBracketSameLine: false,
        semi: true
      }
    ],
    quotes: ["error", "double", { avoidEscape: true }]
  }
};
