module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 1,
    'object-shorthand': [1, 'always', { avoidQuotes: true }],
    'quote-props': 1,
    'prefer-object-spread': 2,
    'prefer-destructuring': [1, { array: true, object: true }],
    'prefer-template': 1,
    'func-style': [2, 'expression'],
    'no-loop-func': 2,
    'prefer-rest-params': 1,
    'default-param-last': 1,
    'no-param-reassign': 1,
    'prefer-spread': 1,
    'prefer-arrow-callback': 1,
    'arrow-parens': 1,
    'arrow-body-style': [1, 'always'],
    'implicit-arrow-linebreak': 2
  }
}
