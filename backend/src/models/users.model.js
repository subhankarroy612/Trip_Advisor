const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = model('user', userSchema);

module.exports = userModel;