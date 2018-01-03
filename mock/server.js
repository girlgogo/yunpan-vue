const Koa = require('koa');
const app = new Koa();
const data = require('./data')

app.use(async ctx => {
  ctx.body = data;
});

app.listen(9000);
console.log('app started at port 9000...');
