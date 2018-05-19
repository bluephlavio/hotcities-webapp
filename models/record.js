const mongoose = require('mongoose');


const RecordSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  city: { type: mongoose.Schema.ObjectId, ref: 'City' },
  temp: { type: Number }
});


module.exports = mongoose.model('Record', RecordSchema);
