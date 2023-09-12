module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // Здесь вы можете настроить правила ESLint
    'vue/no-unused-components': 'off', // Отключаем проверку на неиспользуемые компоненты
  },
};
