const { sequelize, RequestsEx } = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {

    RequestsEx.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/:id', (req, res) => {
    console.log('l');
    RequestsEx.findOne({ where: { id: req.params.id } })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
    
});

route.post('/', (req, res) => {

    RequestsEx.create({ title: req.body.title, body: req.body.body, date: req.body.date, status: req.body.status, userId: req.body.userId })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
    
});

route.put('/:id', (req, res) => {
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

route.delete('/:id', (req, res) => {

    RequestsEx.findOne({ where: { id: req.params.id }, include: ['user'] })
    .then( reqex => {
          reqex.destroy()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
    
});

module.exports = route;