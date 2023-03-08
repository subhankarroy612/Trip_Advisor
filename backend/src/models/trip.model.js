const { Schema, model } = require("mongoose");

const tripSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'tour', required: true }

})

const tripModel = model('trip', tripSchema);

module.exports = tripModel;