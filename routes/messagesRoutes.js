const { sequelize, Messages} = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {

    Messages.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', (req, res) => {
    console.log(req.body);
    Messages.create({title: req.body.title, body: req.body.body, auto: req.body.auto, type: req.body.type, userId: req.body.userId, sender: req.body.sender })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/:id', (req, res) => {
    
    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.title = req.body.title;
            msg.body = req.body.body;
            msg.type = req.body.type;

            msg.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;