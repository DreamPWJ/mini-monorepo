module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'unicorn'],
  rules: {
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    'no-useless-constructor': 'off',
    'prefer-template': 'off',
    'react-hooks/rules-of-hooks': 'warn', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'unicorn/filename-case': 'warn', // 文件命名符合 kebabCase方式 如foo-bar.js 、 foo-bar.test-utils.js
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./packages/**/tsconfig.json', './projects/**/tsconfig.json', './tsconfig.json'],
  },
}
