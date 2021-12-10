const express = require('express');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');

const port = 3000;

const app = express();
app.use(bodyParser.json());


app.use(require('./controllers/root'));

app.use("/api-docs/", swagger.serve, swagger.setup(require('./swagger.json')));

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
