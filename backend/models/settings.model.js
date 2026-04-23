import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  cvUrl: { type: String, default: '' },
});

export default mongoose.model('Settings', settingsSchema);