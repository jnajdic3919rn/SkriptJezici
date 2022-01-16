const { sequelize, Users} = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

/** 
route.use('/users', usersRoutes);
route.use('/messages', messagesRoutes);
route.use('/requests', requestsRoutes);
*/

route.get('/admin', (req, res) => {

    res.sendFile('admin.html', { root: './static/html' });
});

app.get('/admin/updateUser/:id', (req, res) => {
    res.sendFile('updateUser.html', { root: './static/html' });
});

app.get('/admin/users', (req, res) => {
    res.sendFile('adminUsers.html', { root: './static/html' });
});

app.get('/admin/requests', (req, res) => {
    res.sendFile('moderatorReq.html', { root: './static/html' });
});

app.get('/admin/categories', (req, res) => {
    res.sendFile('artCategories.html', { root: './static/html' });
});

app.get('/admin/categories/addCategory', (req, res) => {
    res.sendFile('addCategory.html', { root: './static/html' });
});

app.get('/admin/categories/updateCategory/:id', (req, res) => {
    res.sendFile('updateCategory.html', { root: './static/html' });
});

app.get('/admin/categories/:id', (req, res) => {
    res.sendFile('exploreCategory.html', { root: './static/html' });
});

app.get('/admin/categories/addPainting', (req, res) => {
    res.sendFile('exploreCategory.html', { root: './static/html' });
});

app.get('/admin/requests/notifications', (req, res) => {
    res.sendFile('messages.html', { root: './static/html' });
});

app.get('/admin/requests/addRequest', (req, res) => {
    res.sendFile('addRequest.html', { root: './static/html' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('admin.html', { root: './static/html' });
});

module.exports = route;