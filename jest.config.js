const esModules = [
  'vee-validate/dist/rule',
  // 'vuex-composition-helpers/dist'
  'vuex-composition-helpers/src',
  '@babel'
].join('|');
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
};
