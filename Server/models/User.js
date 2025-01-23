const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//pwd ne encrypt cheyyan vendi bcrypt use akane

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
//pwd angot chang aagan vendi bcrypt aayit veran vendi use aakne
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);