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
app.use("/", swagger.serve, swagger.setup(require('./swagger.json')));


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
