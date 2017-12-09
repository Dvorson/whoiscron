const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../public/js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  }
};