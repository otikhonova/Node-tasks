import { Linter } from "eslint";

/** @type {Linter.Config} */
export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended",
    "plugin:security/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off", 
    "node/no-unsupported-features/es-syntax": "off",
    "promise/always-return": "error",
    "promise/no-return-wrap": "error"
  },
};
