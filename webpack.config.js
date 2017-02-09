const path = require('path');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
// const ComponentDirectoryPlugin = require("component-directory-webpack-plugin");

let webpackConfig = {
    // click on the name of the option to get to the detailed documentation
    // click on the items with arrows to show more examples / advanced options

    entry: path.resolve(__dirname, "src/app.js"), // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
      // options related to how webpack emits results

      path: path.resolve(__dirname, "tmp/assets/scripts"), // string
      // the target directory for all output files
      // must be an absolute path (use the Node.js path module)

      filename: "app.js", // string
      // the filename template for entry chunks

      // publicPath: path.resolve(__dirname, "."), // string
      // the url to the output directory resolved relative to the HTML page

      library: "App", // string,
      // the name of the exported library (Global object)

      // libraryTarget: "umd", // universal module definition
      // the type of the exported library

      /* Advanced output configuration (click to show) */
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
          }
        ]
      },

    resolve: {
      // options for resolving module requests
      // (does not apply to resolving to loaders)

      modules: [
        "node_modules",
        path.resolve(__dirname, "src/components"),
        path.resolve(__dirname, "node_modules")
      ],
      // directories where to look for modules

      // extensions: [".js"],
      // extensions that are used

      alias: {
        // a list of module name aliases
        vendors: path.resolve(__dirname, 'src/vendors/'),
        components: path.resolve(__dirname, 'src/components/')
        // "module": "new-module",
        // // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
        //
        // "only-module$": "new-module",
        // // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"
        //
        // "module": path.resolve(__dirname, "app/third/module.js"),
        // alias "module" -> "./app/third/module.js" and "module/file" results in error
        // modules aliases are imported relative to the current context
      },

      // /* alternative alias syntax (click to show) */
      // alias: [
      //   {
      //     name: "module",
      //     // the old request
      //
      //     alias: "new-module",
      //     // the new request
      //
      //     onlyModule: true
      //     // if true only "module" is aliased
      //     // if false "module/inner/path" is also aliased
      //   }
      // ],

      // /* Advanced resolve configuration (click to show) */
      //
      // symlinks: true,
      // // follow symlinks to new location
      //
      // descriptionFiles: ["package.json"],
      // // files that are read for package description
      //
      // mainFields: ["main"],
      // // properties that are read from description file
      // // when a folder is requested
      //
      // aliasFields: ["browser"],
      // // properites that are read from description file
      // // to alias requests in this package
      //
      // enforceExtension: false,
      // // if true request must not include an extensions
      // // if false request may already include an extension
      //
      // moduleExtensions: ["-module"],
      // enforceModuleExtension: false,
      // // like extensions/enforceExtension but for module names instead of files
      //
      // unsafeCache: true,
      // unsafeCache: {},
      // // enables caching for resolved requests
      // // this is unsafe as folder structure may change
      // // but preformance improvement is really big
      //
      // cachePredicate: (path, request) => true,
      // // predicate function which selects requests for caching
      //
      // plugins: [
      //   // ...
      // ]
      // additional plugins applied to the resolver
    },

  /*  performance: {
      hints: "warning", // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: function(assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },*/

    devtool: "source-map", // enum
    watch: true,
  	watchOptions: {
  		aggregateTimeout: 100
  	},
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    // context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory

    // target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    // externals: ["react", /^@angular\//],
    externals: ['TweenLite'],
    // Don't follow/bundle these modules, but request them at runtime from the environment


    plugins: [
       new webpack.NoErrorsPlugin(),
       new webpack.ProvidePlugin({
          $: "jquery",
          "jQuery": "jquery"
      })
      //  new webpack.ResolverPlugin(new ComponentDirectoryPlugin(true)) // resolve require('components/demo') as components/demo/demo.js || index.js
    ],
    // list of additional plugins
  };

module.exports = webpackConfig;
