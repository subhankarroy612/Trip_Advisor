const express = require('express');
const placesModel = require('../models/places.model');
const toursModel = require('../models/tours.model');

const app = express.Router();

app.get('/places', async (req, res) => {
    try {

        let data = await placesModel.find()
        return res.send(data)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.get('/tour', async (req, res) => {
    try {
        let data =  await toursModel.find()
        res.send(data)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})




module.exports = app;