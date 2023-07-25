module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "ecmaVersion": "latest",
  },
  "ignorePatterns": ["**/build/*", "**/node_modules/*", "**/dist/*"],
  "env": {
    "es6": true,
    "browser": true,
  },
  "rules": {
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "a11y-media-has-caption": "off",
    "max-len": [
      "warn", {
        "code": 120,
        "tabWidth": 4,
      },
    ],
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error", "assert"],
      },
    ],
    "no-fallthrough": ["error", { "commentPattern": "break[\\s\\w]*omitted" }],
    "no-param-reassign": [
      "error",
      {
        "ignorePropertyModificationsFor": ["draft"],
      },
    ],
    "no-sequences": "warn",
    "no-undef": "off",
    "no-var": "error",
    "prefer-const": ["warn", { "destructuring": "all" }],
    "prefer-template": "warn",
    "semi": "warn",

    // Style rules
    "@typescript-eslint/space-infix-ops": "warn",
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "block-spacing": "warn",
    "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
    "comma-dangle": [1, "always-multiline"],
    "comma-spacing": ["warn", { "after": true }],
    "curly": ["error", "all"],
    "function-paren-newline": ["error", "consistent"],
    "generator-star-spacing": ["error", {
      "after": true,
      "before": false,
    }],
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "key-spacing": ["warn", { "afterColon": true }],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 2, "maxEOF": 0 }],
    "no-trailing-spaces": "warn",
    "object-curly-newline": ["error", {
      "consistent": true,
      "multiline": true,
    }],
    "object-curly-spacing": ["warn", "always", { "objectsInObjects": true }],
    "object-shorthand": "warn",
    "quotes": [2, "double", "avoid-escape"],
    "space-before-blocks": "warn",
    "space-infix-ops": ["warn", { "int32Hint": false }],
    "semi-spacing": ["warn", { "before": false, "after": true }],
  },
};