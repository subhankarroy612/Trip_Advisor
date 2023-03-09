const { Schema, model } = require("mongoose");

const basketSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'tour', required: true },
    pax: { type: Number }

})

const basketModel = model('basket', basketSchema);

module.exports = basketModel;