const helpers = require( "./webpack.helpers" );
const webpackMerge = require( "webpack-merge" );
const commonConfig = require( "./webpack.common.js" );


// Plugins
const OccurenceOrderPlugin = require( "webpack/lib/optimize/OccurrenceOrderPlugin" );
const NoEmitOnErrorsPlugin = require( "webpack/lib/NoEmitOnErrorsPlugin" );
const LoaderOptionsPlugin = require( "webpack/lib/LoaderOptionsPlugin" );
const ProgressBarPlugin = require( "progress-bar-webpack-plugin" );
const UglifyJsPlugin = require( "uglifyjs-webpack-plugin" );


module.exports = webpackMerge( commonConfig, {
	devtool: "source-map",

	mode: "production",

	optimization: {
		minimizer: [
			// Minifies the bundle
			new UglifyJsPlugin( {
				sourceMap    : false,
				uglifyOptions: {
					ie8     : true,
					output  : {
						comments: false,
						beautify: false,
					},
					mangle  : {
						keep_fnames: true
					},
					compress: {
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
					}
				}
			} ),
		]
	},

	plugins: [

		// Webpack gives IDs to identify your modules. With this plugin, Webpack will analyze and prioritize often used modules assigning them the smallest ids
		new OccurenceOrderPlugin(),

		// Stops the build if there is any error
		new NoEmitOnErrorsPlugin(),

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
				},
			}
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

} );