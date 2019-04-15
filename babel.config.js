module.exports = function(api) {
  api.cache(true);

  const env = {
    'test': {
      'plugins': [
        ['transform-remove-console', {
          'exclude': [
            'debug',
          ],
        }],
      ],
    },
  };

  const presets = [
    '@babel/preset-env',
  ];

  const plugins = [
    [
      'module-resolver', {
        'root': [
          './src/app',
        ],
        'alias': {
          'configs': './src/app/config',
          'models': './src/app/models',
          'controllers': './src/app/http/controllers',
          'middlewares': './src/app/http/middlewares',
          'routes': './src/app/http/routes',
          'libraries': './src/app/libraries',
          'helpers': './src/app/helpers',
          'app': './src/app/index',
          'router': './src/app/libraries/router',
          'server': './src/server',
          'core': './src/app/core',
          'schemas': './src/app/http/schemas',
          '@': './src',
          'tests': './tests',
        },
      },
    ],

    [
      '@babel/plugin-transform-runtime',
    ],

  ];

  return {
    env,
    presets,
    plugins,
  };
};
