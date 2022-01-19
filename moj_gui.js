const express = require('express');
const { sequelize, Users, RequestsEx, Messages, Categories, Paintings } = require('./models');
const usersRoutes = require('./routes/usersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const requestsRoutes = require('./routes/requestsRoutes');
const adminRoutes = require('./routes/admin');
const routes = require('./routes/admin');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
///app.use('/admin', adminRoutes);
///app.use('/messages', messagesRoutes);
///app.use('/requests', requestsRoutes);

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

function main(){
    const data = {
        name: "Mona Lisa",
        image: "/public/paintings/monalisa.jpg",
        description: "mona lisa iz pariza",
        artist: "Leonardo da Vinci",
        year: 1600,
        userId: 1,
        categoryId: 7
    }
    Paintings.create({ name: data.name, image: data.image, description: data.description, artist: data.artist, year: data.year, userId: data.userId, categoryId: data.categoryId });


}

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static/html' });
});

app.get('/login', (req, res) => {
    ///main();
    res.sendFile('login.html', { root: './static/html' });
});

app.get('/admin', (req, res) => {

    res.sendFile('admin.html', { root: './static/html' });
});

app.get('/admin/users/updateUser/:id', (req, res) => {
    res.sendFile('updateUser.html', { root: './static/html' });
});

app.get('/admin/users', (req, res) => {
    res.sendFile('adminUsers.html', { root: './static/html' });
});

app.get('/admin/requests', (req, res) => {
    res.sendFile('moderatorReq.html', { root: './static/html' });
});

app.get('/admin/requests/changeRequest/:id', (req, res) => {
    res.sendFile('changeReq.html', { root: './static/html' });
});

app.get('/admin/messages', (req, res) => {
    res.sendFile('messages.html', { root: './static/html' });
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
    res.sendFile('seeCategory.html', { root: './static/html' });
});

app.get('/admin/categories/:id/paintings', (req, res) => {
    res.sendFile('exploreCategory.html', { root: './static/html' });
});

app.get('/admin/categories/:id/paintings/:id', (req, res) => {
    res.sendFile('seePainting.html', { root: './static/html' });
});

app.get('/admin/categories/:id/addPaint', (req, res) => {
    res.sendFile('addPainting.html', { root: './static/html' });
});

app.get('/admin/categories/:id/updatePaint/:id', (req, res) => {
    res.sendFile('updatePainting.html', { root: './static/html' });
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

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});