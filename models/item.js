const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true
  },
  pictures:[
{
    type:Buffer,
    required:true
}
  ],
  date_added: {
    type: Date,
    default: Date.now
}
});

module.exports = Item = mongoose.model('item', ItemSchema);
