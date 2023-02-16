const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDb')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('API Works!'))

app.listen(process.env.PORT, async () => {
    await connectDB()
    console.log(`listening on http://localhost:${process.env.PORT}`);
})