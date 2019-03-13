import mongoose from 'mongoose';

const LicenseSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: String,
  abbr: String,
  link: String,
});

export default mongoose.model('License', LicenseSchema);
