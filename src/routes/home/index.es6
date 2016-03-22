import { app } from 'server';
import { post, get } from 'koa-route';
import template from './template.marko';

app.use(get('/', async(ctx, next) => {
  ctx.body = template.stream({ user: ctx.req.user });
  ctx.type = 'text/html';
}));

