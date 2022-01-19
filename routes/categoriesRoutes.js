const { sequelize, Categories} = require('../models');
const { categorySchema } = require('../models/validation/categorySchema');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
    /** 
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    console.log(payload);
*/
            /** 
    if(payload.admin === false)
        res.status(403).json({ message: "Do not have admin priveledges!"});
    else{
        */
        Categories.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
   // }
    
});

route.get('/:id', (req, res) => {

    Categories.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
    
   console.log("uso dodaj");
   console.log(req.body);
    try{
        const dataValid = {
            name: req.body.name,
            century: req.body.century,
            description: req.body.description,
        }
        await categorySchema.validateAsync(dataValid, { abortEarly: false });
        
        Categories.create({ name: req.body.name, image: req.body.image, century: req.body.century, description: req.body.description, moderator: req.body.moderator })
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
    /** 
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    console.log(payload);

    if(payload.user === req.body.moderator){
    */
        try{
            const dataValid = {
                name: req.body.name,
                century: req.body.century,
                description: req.body.description,
            }
            await categorySchema.validateAsync(dataValid, { abortEarly: false });
            Categories.findOne({ where: { id: req.params.id } })
                .then( cat => {
                    cat.name = req.body.name;
                    cat.image = req.body.image;
                    cat.century = req.body.century;
                    cat.description = req.body.description;
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

    Categories.findOne({ where: { id: req.params.id } })
        .then( cat => {
            cat.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;