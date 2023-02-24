const express = require('express');
const userModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express.Router();

app.post('/register', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    try {

        const newUser = new userModel({ firstname, lastname, email, password });
        await newUser.save()
        return res.status(201).send({ message: 'Register successful!' })

    } catch (e) {
        return res.status(501).send(e.message)
    }
})


app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email, password })

        if (!existingUser) {
            return res.status(501).send({ message: 'Invalid credentials!' })
        }

        const token = jwt.sign({
            _id: existingUser._id,
            email: existingUser.email,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname
        }, process.env.TOKEN)

        return res.status(200).send({ token: token, message: 'Login successful!' })

    } catch (e) {
        return res.status(501).send(e.message)
    }
})


module.exports = app;