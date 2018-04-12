const helpers = require( "./webpack.helpers" );
const webpackMerge = require( "webpack-merge" );
const commonConfig = require( "./webpack.common.js" );


module.exports = webpackMerge( commonConfig, {
	devtool: "source-map",

	mode: "development",

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
} );