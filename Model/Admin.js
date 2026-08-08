const Mongoose = require('mongoose');

const AdminSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  Username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
}, { timestamps: true });

module.exports = Mongoose.model('Admin', AdminSchema);