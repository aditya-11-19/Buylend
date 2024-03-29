const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order',OrderSchema);