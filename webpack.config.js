const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Punto de entrada de la aplicación
  entry: './index.js',  // Ruta al archivo principal

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/taskmaster-pro/',
    clean: true,
  },

  // Modo: 'development' o 'production'
  mode: 'development', // Cambiar a 'production' cuando esté listo para producción

  resolve: {
    extensions: ['.js', '.json'], // Permite importar sin escribir la extensión
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Regla para archivos JS con ES6
        exclude: /node_modules/, // Excluir node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                'targets': 'defaults',
                'useBuiltIns': 'usage',
                'corejs': 3
              }]
            ],
            plugins: [
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-private-methods',
              '@babel/plugin-transform-object-rest-spread'
            ]
          },
        },
      },
      {
        test: /\.css$/, // Regla para archivos CSS
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'tailwindcss',
                  'autoprefixer',
                ]
              }
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/, // Cargar imágenes
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Conserva el nombre del archivo
              outputPath: 'images/', // Carpeta de salida para imágenes
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // Limpia la carpeta 'dist' antes de cada compilación
    new CleanWebpackPlugin(),
    
    // Genera el archivo HTML y lo inyecta con el bundle.js
    new HtmlWebpackPlugin({
      template: './public/index.html', // Archivo base HTML
    }),

    // Extrae CSS en archivos separados para producción
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: true, // Muestra errores en overlay
    },
  },

  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
};