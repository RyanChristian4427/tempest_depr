module.exports = {
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['warn', 4, { "SwitchCase": 1, "ignoredNodes": ["TemplateLiteral > *"] }],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/no-use-before-define': ['warn'],
    'arrow-parens': 'warn',
    '@typescript-eslint/ban-ts-ignore': ['warn'],
    '@typescript-eslint/interface-name-prefix': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': ['warn'],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      }
    }
  ]
};
