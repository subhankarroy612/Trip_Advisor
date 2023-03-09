const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const basketModel = require('../models/basket.model');


const app = express.Router();
app.use(authMiddleware)

app.post('/', async (req, res) => {

    const { _id: userId } = req.userDetails;
    const { productId, pax } = req.body;
    try {

        let product = await basketModel.findOne({ userId, productId })
        if (product) {
            return res.status(400).send('Item already added!')
        }

        let item = new basketModel({ userId, productId, pax })
        await item.save()
        return res.status(201).send('Item added sucessfully!')

    } catch (e) {
        return res.status(501).send(e.message)
    }

})

app.get('/', async (req, res) => {

    const { _id: userId } = req.userDetails;

    try {

        let items = await basketModel.find({ userId }).populate('productId').then(r => r)
        return res.status(200).send(items)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await basketModel.findByIdAndDelete(id)
        return res.status(200).send('Item deleted!')
    } catch (e) {
        return res.status(501).send(e.message)
    }
})



module.exports = app;