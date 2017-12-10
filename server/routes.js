const Router = require('koa-router');
const bodyParser = require('koa-body');

const api = require('./api');

const router = new Router();

router.get('/api/domains', async (ctx, next) => {
    ctx.body = await api.getDomains();
});

router.post('/api/domains', bodyParser(), async (ctx, next) => {
    const { domain } = ctx.request.body;
    if (!domain) return ctx.status = 400;
    ctx.body = await api.addDomain(domain);
});

router.post('/api/whois', bodyParser(), async (ctx, next) => {
    const { domain } = ctx.request.body;
    if (!domain) return ctx.status = 400;
    ctx.body = await api.getWhois(domain);
});

module.exports = router;
