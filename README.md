
# Koa-Lasso-Marko-Babel Boilerplate

## Quickstart

0. Fork/clone this repo

1. Install dependencies

        npm install

2. Building the source:

        npm run build

  This transpiles *.es6 files, and copies other files (css/etc), from /src to /lib

  It uses `gulp build` task as defined in the <a href='gulpfile.js'>`.gulpfile`</a>

  <sup>note: to directly run gulp commands you may need to [install Gulp 4] \(which wasn't officially released as of yet), but since it's installed as a (dev-)dependency, running these npm command, or running gulp through npm (npm run gulp -- task) would work</sup>

  While developing, use:

      npm run gulp -- build watch

      // or just (this is the default task)
      npm run gulp

  This builds the project and then watches /src for file changes and compiles only the changed files.

  You can let this run in the background while developing. (you'll still need to restart the server for changes to take effect.)

3. Running the server:

        npm start

        // or
        node lib/server.js


## Libraries used

### Koa 2

Koa is an excellent choice for back-end server. It's widely considered to be the successor of Express.

>[Koa] is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.

[Koa 2] is the next major upgrade to Koa. It's built around async functions which is a better way to write code instead of using generators for flow control.

Since it uses async/await, a feature which is relatively new (ES2016) and not yet natively available in node, we use the Babel transpiler.

### Babel

>[Babel] is a JavaScript compiler.

<!-- -->

>[ECMAScript 2015] is the newest version of the ECMAScript standard.

Babel transpiles new ES2015 (and ES2016) syntax into ES5 valid code.

### Lasso

>[Lasso.js][lasso] is an eBay open source Node.js-style JavaScript module bundler that also provides first-level support for optimally delivering JavaScript, CSS, images and other assets to the browser.

It's like Webpack + Browserify/jspm/RequireJS

### Marko

>[Marko] is a [*really* fast][marko-benchmarks] and lightweight HTML-based templating engine that compiles templates to CommonJS modules and supports streaming, async rendering and custom tags.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">progressive rendering, concise syntax, dom diffing, lifecycle - <a href="https://twitter.com/hashtag/MarkoJS?src=hash">#MarkoJS</a> looks like the love child of jade and react</p>&mdash; Michael Geers (@naltatis) <a href="https://twitter.com/naltatis/status/710911085205917698">March 18, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## Usage

### Directory structure

    │   package.json
    │   gulpfile.js
    │   .babelrc
    │   .gitignore
    │   README.md
    │
    ├───src
    │   │
    │   │   index.es6  // basic initial configuration (babel, sourcemaps)
    │   │
    │   │   server.es6 // Koa server and configuration
    │   │              // exports the koa `app` which can be required elsewhere
    │   │              // imports /routes/xxx
    │   │
    │   ├───routes
    │   │   │   layout.marko // basic layout
    │   │   │
    │   │   ├───home
    │   │   │       index.es6      // route logic
    │   │   │       template.marko // marko template (extends from layout.marko)
    │   │   │       widget.es6     // marko-widget (better client-side javascripting)
    │   │   │
    │   │   ├───login
    │   │   │       index.es6
    │   │   │       template.marko
    │   │   │       widget.es6
    │   │   │       login.css  // resources can be required locally
    │   │   │
    │   │   │   socket.es6   // socket.io stuff
    │   │   │
    │   │   │   browser.json // for lasso
    │   │   │
    │   │   └───...
    │   │
    │   ├───db
    │   │       index.es6 // uses redis
    │   │       user.es6  // basic user
    │   │
    │   └───public
    │       └───... // public resources exposed as static files
    │
    │
    ├───lib (auto-generate)
    │   │  // /src gets compiled here, the project mainly runs from here
    │   │  // .es6 files from /src gets compiled to .js files here
    │   │  // other than .es6 files get copied as is (css, fonts etc)
    │   │
    │   ├───public
    │   │   │
    │   │   └────lasso
    │   │        └────...  // lasso related bundled files are auto-generated here
    │   │
    │   └───... whole lib is .gitignore’d as it's essentially just a dumplicate of /src
    │
    ├───.cache (auto-generated, lasso related, .gitignore’d)
    │
    └───node_modules // (.gitignore’d)


### <a href='src/index.es6'>`src/index.es6`</a>

This file sets up preliminaries:

  * babel
  * sourcemap-support
  * [Bluebird] as the  default promise library
  * registers [app-module-path].
    This lets you import files relative to `/src` just as you would a node module. For example:
    * `import app from 'server'` from where ever you need access to the Koa `app` (like registering routes)
    * `import User from 'db/user'` to access the user model
    * `import 'public/stylesheets/font-awesome.css'` from any client js file managed by lasso

### <a href='src/server.es6'>`src/server.es6`</a>

Sets up Koa 2 and most used modules

  * [Static][koa-static] files server from <a href='public'>`/public`</a>
  * [Body Parser][koa-better-body] (for form submission/file updloads)
  * [Sessions][koa-generic-session] with persistent storage using [Redis][koa-redis]
  * [Socket.IO]
  * [PassportJS] \(for user authentication & management).
  * [Passport for Socket.IO][koa-socket-passport] connections
  * [Marko] \(Templating Language)
  * [Lasso] \(Bundler)

### Route handling (<a href='src/routes'>`src/routes`</a>)



[Koa]: http://koajs.com/
[Koa 2]: https://github.com/koajs/koa/issues/533

[Lasso]: https://github.com/lasso-js/lasso

[Marko]: http://markojs.com
[marko-benchmarks]: https://github.com/marko-js/templating-

[Babel]: http://babeljs.io
[ECMAScript 2015]: http://babeljs.io/docs/learn-es2015

[gulp]: http://gulpjs.com

[node-chakra]: https://github.com/nodejs/node-chakracore


[install Gulp 4]: http://demisx.github.io/gulp4/2015/01/15/install-gulp4.html

[Bluebird]: http://bluebirdjs.com

[app-module-path]: https://github.com/patrick-steele-idem/app-module-path-node

[koa-static]: https://github.com/koajs/static
[koa-better-body]: https://github.com/tunnckoCore/koa-better-body
[koa-generic-session]: https://github.com/koajs/generic-session
[koa-redis]: https://github.com/koajs/koa-redis
[socket.io]: http://socket.io
[passportjs]: http://passportjs.org/
[koa-socket-passport]: https://github.com/laggingreflex/koa-socket-passport

