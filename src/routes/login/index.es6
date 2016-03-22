import { app } from 'server';
import { post, get } from 'koa-route';
import template from './template.marko';
import User from 'db/user';

app.use(get('/login', async(ctx, next) => {
  ctx.body = template.stream({ /*data*/ });
  ctx.type = 'text/html';
}));

app.use(post('/login', async(ctx, next) => {
  var fields = ctx.request.body.fields;
  var user = await User.findByUsername(fields.username);
  if (!user) {
    user = new User({ username: fields.username });
    await user.savePassword(fields.password);
  }
  if (true !== await user.verifyPassword(fields.password)) {
    return ctx.throw(401, 'Incorrect password');
  }
  await ctx.login(user);
  ctx.redirect('/');
}));
