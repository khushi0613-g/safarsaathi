const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat:  { type: Number, required: true },
  lng:  { type: Number, required: true },
});

const routeSchema = new mongoose.Schema({
  routeNumber: {
    type: String,
    required: [true, 'Route number is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
  },
  from: { type: String, required: true },
  to:   { type: String, required: true },
  stops: [stopSchema],
  popular:   { type: Boolean, default: false },
  frequency: { type: String, default: '15 mins' },
  firstBus:  { type: String, default: '06:00 AM' },
  lastBus:   { type: String, default: '10:00 PM' },
}, { timestamps: true });

routeSchema.index({ name: 'text', from: 'text', to: 'text', routeNumber: 'text' });

module.exports = mongoose.model('route',routeSchema);