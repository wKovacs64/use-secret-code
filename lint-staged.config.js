module.exports = {
  '*.{js,ts,tsx}': ['tsdx lint --fix'],
  '*.{html,css,json,md,mdx,yml,yaml}': ['prettier --write'],
};
