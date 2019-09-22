const settings = {
  react: {
    pragma: "React",
    version: "detect",
  },
};

const parserConfig = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const rules = {
  semi: "error",
  "react/prop-types": "off", // Handled by TS
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/explicit-function-return-type": "off"
};

module.exports = {
  ...parserConfig,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules,
  settings,
};
