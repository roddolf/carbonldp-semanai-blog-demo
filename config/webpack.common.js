const helpers = require( "./webpack.helpers" );

// Plugins
const SplitChunksPlugin = require( "webpack/lib/optimize/SplitChunksPlugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );


module.exports = {
	devtool: "source-map",

	mode: "production",

	entry: {
		"polyfills": helpers.root( "src/polyfills.js" ),
		"app"      : helpers.root( "src/app.js" )
	},

	resolve: {
		extensions: [ ".js" ],
		alias     : {
			"app": helpers.root( "src" )				// Allows to import modules from src as `import X from "app" ;`
		},
		modules   : [ helpers.root( "node_modules" ) ]	// If not found and import, always look in node_modules folder
	},


	module: {
		rules: [
			{
				test   : /\.html$/,
				use    : "html-loader",								// Loader to interpret .html files
				exclude: [ helpers.root( "src/index.html" ) ]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				use : "file-loader?name=assets/[name].[hash].[ext]"	// Loader for multiple file formats
			},
			{
				test: /\.s?css$/,
				use : [ "raw-loader", "sass-loader" ]				// Loaders for style files .css/.scss
			}
		]
	},

	plugins: [

		// Sends all imports from node_modules to vendor.ts
		new SplitChunksPlugin( {
			cacheGroups: {
				"vendor": {
					test   : /[\\/]node_modules[\\/]/,
					name   : 'vendor',
					chunks : 'all',
					enforce: true
				}
			}
		} ),

		// Webpack inject scripts and links for us with the HtmlWebpackPlugin and also
		// defines the order of the chunks: polyfills -> vendor -> app
		new HtmlWebpackPlugin( {
			template      : "./src/index.html",
			chunks        : [ "polyfills", "vendor", "app" ],
			chunksSortMode: "manual",
		} ),
	],

	output: {
		path             : helpers.root( "dist" ),			// The output directory as an absolute path
		filename         : "[name].[chunkhash].js",			// The name of each output bundle
		sourceMapFilename: "[name].[chunkhash].map",		// Only used when devtool uses a SourceMap option which writes an output file
		chunkFilename    : "[id].[chunkhash].chunk.js"		// Determines the name of non-entry chunk files
	}
};