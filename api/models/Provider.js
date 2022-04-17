const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProviderSchema.virtual('clients', {
  ref: 'Client',
  localField: '_id',
  foreignField: 'providers',
  justOne: false,
});

module.exports = mongoose.model('Provider', ProviderSchema);
