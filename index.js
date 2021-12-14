const express = require('express');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


app.use(require('./controllers/root'));

app.use("/api-docs/", swagger.serve, swagger.setup(require('./swagger.json')));
app.get("/", (_req, res) => {
    res.status(200).send('BankAPI 1.0.0 - Para mais informações acesse: https://simple-bank-api.herokuapp.com/api-docs/');
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
