const { sequelize, Messages} = require('../models');
const { messageSchema } = require('../models/validation/messageSchema');
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

route.post('/', async (req, res) => {
    console.log("print");
    try{
        const dataValid = {
            title: req.body.title,
            body: req.body.body,    
        }
        await messageSchema.validateAsync(dataValid, { abortEarly: false });
        console.log(req.body);
        Messages.create({title: req.body.title, body: req.body.body, auto: req.body.auto, type: req.body.type, userId: req.body.userId, sender: req.body.sender })
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

route.put('/:id', async (req, res) => {
    try{
        const dataValid = {
            title: req.body.title,
            body: req.body.body,    
        }
        await messageSchema.validateAsync(dataValid, { abortEarly: false });
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