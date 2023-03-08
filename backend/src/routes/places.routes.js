const express = require('express');
const placesModel = require('../models/places.model');
const toursModel = require('../models/tours.model');

const app = express.Router();

app.get('/places', async (req, res) => {
    try {
        let data = await placesModel.find()
        return res.status(200).send(data)
    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.get('/tour', async (req, res) => {
    try {
        let data = await toursModel.find()
        return res.status(200).send(data)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.get('/singlePlace/:id', async (req, res) => {
    const { id } = req.params
    try {
        const place = await placesModel.findById(id)
        return res.status(200).send(place)
    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.get('/singleTour/:id', async (req, res) => {
    const { id } = req.params
    try {
        const tour = await toursModel.findById(id)
        return res.status(200).send(tour)
    } catch (e) {
        return res.status(501).send(e.message)
    }
})


module.exports = app;