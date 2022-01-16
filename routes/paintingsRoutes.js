const { sequelize, Paintings} = require('../models');
const { authSchema, registerSchema } = require('../models/validation/userSchema');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    
    if(payload.admin === false)
        res.status(403).json({ message: "Do not have admin priveledges!"});
    else{
        Paintings.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
    
});

route.get('/:id', (req, res) => {

    Paintings.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
  
    try{
            const dataValid = {
            name: req.body.name,
            image: req.body.image,
            artist: req.body.artist,
            description: req.body.description,
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            year: req.body.userId
            }
        //await registerSchema.validateAsync(dataValid);
        
        Paintings.create({ name: req.body.name, image: req.body.image, artist: req.body.artist, description: req.body.description, userId: req.body.userId, categoryId: req.body.categoryId, year: req.body.year })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
    catch(err){
        console.log(err);
        const data = {
            msg: err.details[0].message
        }
        console.log(data);
        return res.status(400).json(data);
    }
    
});

route.put('/:id', (req, res) => {
    
    Paintings.findOne({ where: { id: req.params.id } })
        .then( cat => {
            cat.name = req.body.name;
            cat.image = req.body.image;
            cat.artist = req.body.artist;
            cat.year = req.body.year;
            cat.description = req.body.description;
            cat.categoryId = req.body.categoryId;
            cat.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    Paintings.findOne({ where: { id: req.params.id } })
        .then( cat => {
            cat.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;