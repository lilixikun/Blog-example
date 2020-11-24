const http = require('http');
const EventEmitter = require('events');
const context = require('./context.js')
const request = require('./request.js')
const response = require('./response.js')

class Application extends EventEmitter {
    constructor() {
        super();
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(callback) {
        if (typeof callback !== "function") {
            throw new TypeError('middleware must be a function!')
        }
        this.middleware.push(callback)
        // 实现链式调用
        return this
    }

    compose(ctx) {
        const dispatch = (i) => {
            if (i === this.middlewares.length) return Promise.resolve()
            try {
                return Promise.resolve(this.middlewares[i](ctx, dispatch.bind(null, i + 1)))
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }

    createContext(req, res) {
        const context = Object.create(this.context)
        const request = Object.create(this.request)
        const response = Object.create(this.response)

        context.request = request
        context.response = response

        context.request.req = context.req = req
        context.response.res = context.res = res

        return context
    }

    // 服务响应的方法，用来触发中间件
    handleRequest(req, res) {
        const ctx = this.createContext(req, res)
        this.compose(ctx).then(() => {
            this.respond(ctx)
        })
    }

    respond(ctx) {
        let body = ctx.body;
        const res = ctx.res;
        if (typeof body === 'object') {
            body = JSON.stringify(body);
            res.end(body);
        } else {
            res.end(body);
        }
    }

    listen(...arg) {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(arg);
    }
}

module.exports = Application