const { sequelize, Users, Messages, RequestsEx } = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/users', (req, res) => {

    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/users', async (req, res) => {
   
    try{
        const dataValid = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }
        await registerSchema.validateAsync(dataValid);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        Users.create({ name: req.body.name, email: req.body.email, password: hashPassword, admin: req.body.admin, moderator: req.body.moderator, lastLogged: req.body.lastLogged })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
    catch(err){
        res.status(404).json(err);
    }
});

route.put('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.name = req.body.name;
            usr.admin = req.body.admin;
            usr.moderator = req.body.moderator;
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/messages', (req, res) => {

    Messages.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/requests', (req, res) => {

    RequestsEx.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/requests/:id', (req, res) => {
    console.log('l');
    RequestsEx.findOne({ where: { id: req.params.id } })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
    
});

route.post('/requests', (req, res) => {

    RequestsEx.create({ title: req.body.title, body: req.body.body, date: req.body.date, status: req.body.status, userId: req.body.userId })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
    
});

route.put('/requests/:id', (req, res) => {
    console.log('jeej saad');
    RequestsEx.findOne({ where: { id: req.params.id }, include: ['user'] })
    .then( reqex => {
        reqex.status = req.body.status;

        reqex.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
    
});

route.delete('/requests/:id', (req, res) => {

    RequestsEx.findOne({ where: { id: req.params.id }, include: ['user'] })
    .then( reqex => {
          reqex.destroy()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/messages/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/messages', (req, res) => {
    console.log(req.body);
    Messages.create({ body: req.body.body, auto: req.body.auto, userId: req.body.userId, sender: req.body.sender })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/messages/:id', (req, res) => {
    
    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.body = req.body.body;

            msg.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/messages/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;