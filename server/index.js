const Koa = require('koa');
const serve = require('koa-static');
const fs = require('fs');
const path = require('path');

const { port } = require('../config');
const router = require('./routes.js');

const app = new Koa();

app.use(serve(path.resolve(__dirname, '../public')));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => console.log(`App is listening on port ${port}`));

module.exports = app;