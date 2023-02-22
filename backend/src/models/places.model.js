const { Schema, model } = require("mongoose");

const placesSchema = new Schema({
    thumbnail: String,
    title: String,
    images: {
        img1: String,
        img2: String,
        img3: String
    },
    about: String
})

const placesModel = model('place', placesSchema);

module.exports = placesModel;