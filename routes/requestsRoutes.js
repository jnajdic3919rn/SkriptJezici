const { sequelize, RequestsEx } = require('../models');
const { requestSchema } = require('../models/validation/requestSchema');
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

route.post('/', async (req, res) => {

    try{
        const dataValid = {
            title: req.body.title,
            description: req.body.body,
        }
        await requestSchema.validateAsync(dataValid, { abortEarly: false });
        RequestsEx.create({ title: req.body.title, body: req.body.body, date: req.body.date, status: req.body.status, userId: req.body.userId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    }
    catch(err){
        console.log(err);
        let fullMsg = "";
        err.details.forEach(element => {
            fullMsg = fullMsg + element.message + "\n";
        });
        const data = {
            msg: fullMsg,
        }
        console.log(fullMsg);
        return res.status(400).json(data);
    }
    
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