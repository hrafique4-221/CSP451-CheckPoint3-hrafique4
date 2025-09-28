import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,   // 👈 add Jest globals
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
