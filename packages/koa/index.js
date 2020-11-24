const Koa = require('./application');

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(ctx);
    console.log(ctx.req.path, 1)
    console.log(ctx.request.req.path, 2)
    console.log(ctx.request.path, 3)
    console.log(ctx.path, 4)
    ctx.body = 'hello world'
    //ctx.res.end('hello world')
})

app.listen(9090)