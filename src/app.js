const express = require('express');
const produtsRouter = require('./routers/products.router');
const indexRouter = require('./routers/index.router');

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded( {extended: true}));

app.use('/', indexRouter);
app.use('/api', produtsRouter);

app.listen(PORT, () => {
    console.log(`servidor http corriendo en el puerto: ${PORT}`);
});