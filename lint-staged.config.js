module.exports = {
  '*.{js,ts,tsx}': ['tsdx lint --fix'],
  '*.{html,json,md,yml,yaml}': ['prettier --write'],
};
