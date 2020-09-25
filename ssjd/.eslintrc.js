module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParents: "avoid",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
