const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	devtool: 'cheap-module-source-map', // TODO: Make this only true in development
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename:'index.js'
	},
	plugins: [
    new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
  ],
	module: {
	  rules: [
			{
				test: /\.ts|.tsx$/,
				exclude: /node_modules/,
	      loader: 'awesome-typescript-loader'
			},
			{ 				
				test: /\.js$/, 
				exclude: /node_modules/, 
				enforce: "pre", 
				loader: "source-map-loader" 
			},
			{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      use: [
					{ loader: 'style-loader'},
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader'}
				]
			}
	  ]
	},
	resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}