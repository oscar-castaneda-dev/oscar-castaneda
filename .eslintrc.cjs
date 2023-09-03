module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      },
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-console": "warn",
        "no-var": "error",
        "no-unused-vars": "warn",
        "no-alert": "error",
        "no-use-before-define": "error",
        "func-names": "error",
        "no-shadow": "error",
        "id-length": ["error", { min: 2 }],
      },
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-console": "warn",
        "no-var": "error",
        "no-alert": "error",
        "no-use-before-define": "error",
        "func-names": "error",
        "no-shadow": "error",
        "id-length": ["error", { min: 3 }],
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
    {
      files: ["**/*.astro/*.ts", "*.astro/*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
