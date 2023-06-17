module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	plugins: ["react-refresh"],
	rules: {
		eqeqeq: ["error", "always"],
		"react-refresh/only-export-components": "warn",
		"no-empty-function": "warn",
		"no-implicit-coercion": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
	},
};
