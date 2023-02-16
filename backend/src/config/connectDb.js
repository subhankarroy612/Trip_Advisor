const mongoose = require('mongoose');
require('dotenv').config()

export default function connectDB(){
    return mongoose.connect(process.env.URL)
}