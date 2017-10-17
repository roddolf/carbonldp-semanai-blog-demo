const helpers = require( "./webpack.helpers" );


// Plugins
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const IgnorePlugin = require( "webpack/lib/IgnorePlugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );


module.exports = function( options ) {
	return {
		devtool: "source-map",
		entry  : {
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
					use    : "html-loader",					// Loader to interpret .html files
					exclude: [ helpers.root( "src/index.html" ) ]
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
					use : "file-loader?name=assets/[name].[hash].[ext]"	// Loader for multiple file formats
				},
				{
					test: /\.s?css$/,
					use : [ "raw-loader", "sass-loader" ]	// Loaders for style files .css/.scss
				}
			]
		},

		plugins: [
			// Creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points
			new CommonsChunkPlugin( {
				name: [ "app", "polyfills" ]
			} ),

			// Ignore imports for node environments because we are on a Web environment
			new IgnorePlugin( /^(http|https|file-type)$/, /carbonldp/ ),

			// Webpack inject scripts and links for us with the HtmlWebpackPlugin
			new HtmlWebpackPlugin( {
				filename      : "index.html",
				template      : "src/index.html",
				chunksSortMode: "dependency"
			} )
		],

		output: {
			path             : helpers.root( "dist" ),	// The output directory as an absolute path
			filename         : "[name].js",				// The name of each output bundle
			sourceMapFilename: "[file].map",			// Only used when devtool uses a SourceMap option which writes an output file
			chunkFilename    : "[id].chunk.js"			// Determines the name of non-entry chunk files
		},

		devServer: {
			open              : true,	// Opens web browser
			port              : 8000,	// Port of project
			inline            : true,	// A script will be inserted in index.html to take care of live reloading, and build messages will appear in the browser console
			historyApiFallback: true,	// Server index.html page when 404 responses
			watchOptions      : {
				aggregateTimeout: 300,	// Add a delay in milliseconds before rebuilding
				poll            : 1000	// Check for changes every second
			}
		}

	};
};