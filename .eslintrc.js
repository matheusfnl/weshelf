module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "arrow-spacing": "error",
    "dot-notation": 0,
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "key-spacing": ["error", { "afterColon": true }],
    "keyword-spacing": ["error", { "after": true }],
    "vue/script-indent": [ "error", 2, {
      "baseIndent": 1,
    }],
    "vue/prop-name-casing": ["error", "snake_case"],
  },
}
