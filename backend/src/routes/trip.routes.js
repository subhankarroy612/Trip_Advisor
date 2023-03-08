const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const tripModel = require('../models/trip.model');


const app = express.Router();
app.use(authMiddleware)

app.post('/', async (req, res) => {

    const { _id: userId } = req.userDetails;
    const { productId } = req.body;

    try {

        let product = await tripModel.findOne({ userId, productId })
        if (product) {
            return res.status(400).send('Item already added!')
        }

        let item = new tripModel({ userId, productId })
        await item.save()
        return res.status(201).send('Item added sucessfully!')

    } catch (e) {
        return res.status(501).send(e.message)
    }

})

app.get('/', async (req, res) => {

    const { _id: userId } = req.userDetails;

    try {

        let items = await tripModel.find({ userId }).populate('productId').then(r => r)
        return res.status(200).send(items)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await tripModel.findByIdAndDelete(id)
        return res.status(200).send('Item deleted!')
    } catch (e) {
        return res.status(501).send(e.message)
    }
})



module.exports = app;