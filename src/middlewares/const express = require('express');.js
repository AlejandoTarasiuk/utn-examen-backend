const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server en puerto ${PORT}`));
