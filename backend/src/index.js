const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDb')
require('dotenv').config();
const placesRouter = require('./routes/places.routes')
const authRouter = require('./routes/auth.routes')
const tripRouter = require('./routes/trip.routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/getData', placesRouter)
app.use('/auth', authRouter)
app.use('/trip', tripRouter)

app.get('/', (req, res) => res.send('API Works!'))

app.listen(process.env.PORT, async () => {
    await connectDB()
    console.log(`listening on http://localhost:${process.env.PORT}`);
})