const Router = require('koa-router');

const api = require('./api');

const router = new Router();

router.get('/api/domains', async (ctx, next) => {
    ctx.body = await api.getDomains();
});

module.exports = router;
