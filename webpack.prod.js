const helpers = require( "./webpack.helpers" );


// Plugins
const OccurenceOrderPlugin = require( "webpack/lib/optimize/OccurrenceOrderPlugin" );
const NoEmitOnErrorsPlugin = require( "webpack/lib/NoEmitOnErrorsPlugin" );
const UglifyJsPlugin = require( "uglifyjs-webpack-plugin" );
const LoaderOptionsPlugin = require( "webpack/lib/LoaderOptionsPlugin" );
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const IgnorePlugin = require( "webpack/lib/IgnorePlugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const ProgressBarPlugin = require( "progress-bar-webpack-plugin" );


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

			// Webpack gives IDs to identify your modules. With this plugin, Webpack will analyze and prioritize often used modules assigning them the smallest ids
			new OccurenceOrderPlugin(),

			// Stops the build if there is any error
			new NoEmitOnErrorsPlugin(),

			// Minifies the bundles
			new UglifyJsPlugin( {
				uglifyOptions: {
					ie8      : true,
					ecma     : 6,
					beautify : false, //prod
					output   : {
						comments: false
					}, //prod
					mangle   : {
						keep_fnames: true,
					}, //prod
					compress : {
						warnings    : false,
						conditionals: true,
						unused      : true,
						comparisons : true,
						sequences   : true,
						dead_code   : true,
						evaluate    : true,
						if_return   : true,
						join_vars   : true,
						negate_iife : false
					},
					sourceMap: false
				}
			} ),

			// Set options for loaders
			new LoaderOptionsPlugin( {
				minimize: true,
				debug   : false,
				options : {
					htmlLoader: {
						minimize             : false,
						removeAttributeQuotes: false,
						caseSensitive        : true,
						customAttrSurround   : [
							[ /#/, /(?:)/ ],
							[ /\*/, /(?:)/ ],
							[ /\[?\(?/, /(?:)/ ]
						],
						customAttrAssign     : [ /\)?\]?=/ ]
					}
				}
			} ),

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
			} ),

			// Displays a progress bar on console
			new ProgressBarPlugin()
		],

		output: {
			path             : helpers.root( "dist" ),			// The output directory as an absolute path
			filename         : "[name].[chunkhash].js",			// The name of each output bundle
			sourceMapFilename: "[name].[chunkhash].map",		// Only used when devtool uses a SourceMap option which writes an output file
			chunkFilename    : "[id].[chunkhash].chunk.js"		// Determines the name of non-entry chunk files
		}

	};
};