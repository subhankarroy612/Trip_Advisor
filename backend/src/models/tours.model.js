const { Schema, model } = require("mongoose");

const toursSchema = new Schema({
    thumbnail: String,
    title: String,
    images: {
        img1: String,
        img2: String,
        img3: String
    },
    about: String,
    rate: Number
})

const toursModel = model('tour', toursSchema);

module.exports = toursModel;