const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
 items:[
{
  productId:{
    type:String,
  },
  name:String,
  price:Number
}
 ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model('cart', CartSchema);
