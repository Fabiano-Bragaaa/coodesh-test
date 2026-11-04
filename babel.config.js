module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@animations': './src/animations',
            '@components': './src/components',
            '@domain': './src/domain',
            '@hooks': './src/hooks',
            '@infra': './src/infra',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theme': './src/theme',
            '@translate': './src/translate',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
