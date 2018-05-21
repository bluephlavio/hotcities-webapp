const mongoose = require('mongoose');


const RecordSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  city: { type: mongoose.Schema.ObjectId, ref: 'City' },
  temp: { type: Number },
  view: { type: String }
});


module.exports = mongoose.model('Record', RecordSchema);
