#!/bin/bash

# 使用 ESLint 自动修复未使用的变量和导入
pnpm eslint --fix "src/**/*.{ts,tsx}" --rule '{
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": ["error", {
    "vars": "all",
    "varsIgnorePattern": "^_",
    "args": "all",
    "argsIgnorePattern": "^_",
    "ignoreRestSiblings": false
  }]
}'