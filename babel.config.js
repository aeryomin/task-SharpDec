module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: '> 0.25%, not dead'
        },
        loose: true
      }
    ],
    '@babel/react'
  ],

  plugins: (process.env.NODE_ENV === 'development'
    ? ['react-hot-loader/babel', 'react-refresh/babel']
    : []
  ).concat([
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ])
}
