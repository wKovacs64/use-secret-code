module.exports = {
  '*.{js,jsx,ts,tsx}': ['tsdx lint --fix'],
  '*.{html,css,json,md,mdx,yml,yaml}': ['prettier --write'],
};
