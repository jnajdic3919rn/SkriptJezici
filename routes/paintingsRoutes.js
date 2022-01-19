const { sequelize, Paintings} = require('../models');
const { paintingSchema } = require('../models/validation/paintingSchema');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {

        Paintings.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    
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
            artist: req.body.artist,
            year: req.body.year,
            description: req.body.description,
        }
        await paintingSchema.validateAsync(dataValid, { abortEarly: false });
        
        Paintings.create({ name: req.body.name, image: req.body.image, artist: req.body.artist, description: req.body.description, userId: req.body.userId, categoryId: req.body.categoryId, year: req.body.year })
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
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year,
            description: req.body.description,
         }
        await paintingSchema.validateAsync(dataValid, { abortEarly: false });

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

    Paintings.findOne({ where: { id: req.params.id } })
        .then( cat => {
            cat.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;