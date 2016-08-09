# Carbon LDP JavaScript ES2015 Boilerplate

Boilerplate that shows how to setup Carbon LDP SDK in a JavaScript ES2015 application.

This boilerplate uses [jspm](http://jspm.io/) as a browser dependency manager, configured to use [BabelJS](https://babeljs.io/) as a transpiler. jspm uses 
[systemjs](https://github.com/systemjs/systemjs) as a module loader. Other setups could use other module loaders like [requirejs](http://requirejs.org/), 
[browserify](http://browserify.org/) or no module loader at all (although that would mean no support for `import` statements).

## Setup

1. Install dependencies
    1. Install [node.js](https://nodejs.org/en/) (we recommend installing the "Current" version)
    2. Install [jspm](http://jspm.io/) by executing the following command:
    
        ```bash
        npm install jspm@beta -g
        ```
        You may need to run it with admin privileges
    3. Install the project's dependencies by running the following command:
    
        ```bash
        npm install && jspm install
        ```
2. Run the application with the following command:

    ```bash
    npm start
    ```
This will start a `lite-server` instance that will server the project's files.

## File structure

- `jspm_packages`: jspm dependencies (don't touch them)
- `node_modules`: npm dependencies (don't touch them)
- `src`: Source files
    - `app.js`: Application's main script file
- `.gitignore`: Configuration file that tells git what files to ignore
- `CHANGELOG.md`: File to track package changes
- `favicon.ico`: Dummy icon to suppress 404 errors
- `index.html`: Main HTML file
- `jspm.config.js`: jspm configuration file (configures SystemJS)
- `package.json`: npm configuration file (it also contains JSPM dependency registry)
- `README.md`: === this

## TODO

- Configure a build process for an application's distribution ready version