const express = require('express');
const { sequelize, Users, RequestsEx, Messages } = require('./models');
/// const routes = require('./routes/adminRoutes');
/// Routes
const adminRoutes = require('./routes/admin');
const usersRoutes = require('./routes/usersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const path = require('path');
const jwt = require('jsonwebtoken');
const { getMaxListeners } = require('process');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'static')));
const requestsRoutes = require('./routes/requestsRoutes');
const cors = require('cors');

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

///
app.use(cors(corsOptions));

app.use('/admin', adminRoutes);
///app.use('/admin', usersRoutes);
///app.use('/admin', messagesRoutes);
///app.use('/admin', requestsRoutes);

app.listen({ port: 8090 }, async () => {
      await sequelize.authenticate();
});