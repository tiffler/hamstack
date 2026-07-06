/**
 * Hamstack Tailwind config. The components are authored with Tailwind
 * arbitrary-value utilities that reference the `--ham-*` tokens, so this
 * compiles exactly the classes they use into `dist/hamstack.css`.
 *
 *   npm run build:css   → regenerate dist/hamstack.css after editing a component
 */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./preview/**/*.{ts,tsx,js,jsx}",
    "./.design-sync/previews/**/*.{ts,tsx,js,jsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
