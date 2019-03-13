import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  geonameid: {
    type: Number,
    ref: 'City',
  },
  temp: {
    type: Number,
  },
});

export default mongoose.model('Record', RecordSchema);
