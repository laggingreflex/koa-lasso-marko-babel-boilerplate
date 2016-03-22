/* Koa App */
import koa from 'koa';
export const app = new koa();

import isDev from 'isdev';
import convert from 'koa-convert';

/* Static Files */
import serve from 'koa-static';
app.use(convert(serve(__dirname + '/public', {
  maxage: isDev ? 0 : Infinity,
  gzip: isDev ? false : true,
  // defer: true,
  hidden: isDev,
})));

/* Body Parser (form submission/file updloads) */
import bodyParser from 'koa-better-body';
app.use(convert(bodyParser({
  multipart: true,
})));

/* Session storage */
import session from 'koa-generic-session';
app.keys = ['i like turtles', 'and secret keys'];
import store from 'koa-redis';
app.store = store({ /*options*/ });
app.use(convert(session({ store: app.store })));


/* Socket.IO */
import IO from 'koa-socket';
export const io = new IO();
io.attach(app);


/* Passport (user management) */
import passport from 'koa-passport';
import User from 'db/user';
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async(id, done) => {
  try {
    var user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use(passport.initialize());
app.use(passport.session());


/* Socket.IO <--> Passport */
import { authorize } from 'koa-socket-passport';
io.use(authorize({
  key: 'koa.sid',
  secret: app.keys,
  store: app.store,
}));


/* Marko (Templating Language) */
import markoNodeReq from 'marko/node-require';
markoNodeReq.install();


/* Lasso (Bundler) */
import lasso from 'lasso';
import lassoReqNoop from 'lasso/node-require-no-op';
lasso.configure({
  plugins: ['lasso-marko', 'lasso-stylus', 'lasso-less'],
  outputDir: __dirname + '/public/lasso',
  urlPrefix: '/lasso',
  resolveCssUrls: true,
  fingerprintsEnabled: !isDev,
  minify: !isDev,
  bundlingEnabled: !isDev,
});
lassoReqNoop.enable('.css', '.styl', '.less');



/* Error handler */
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.stack;
  }
});

/* Routes */
require('./routes/home');
require('./routes/login');

/* Socket routes */
require('./routes/socket');


/* Start Listening */
app.listen(3000, () => console.log('Server listening on 3000'));
