const { sequelize, Users} = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');

const usersRoutes = require('./usersRoutes');
const messagesRoutes = require('./messagesRoutes');
const requestsRoutes = require('./requestsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const paintingsRoutes = require('./paintingsRoutes');

const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.use('/users', usersRoutes);
route.use('/messages', messagesRoutes);
route.use('/requests', requestsRoutes);
route.use('/categories', categoriesRoutes);
route.use('/paintings', paintingsRoutes);

module.exports = route;