const mongoose = require('mongoose');
const slugify = require('slugify');

const EntrySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, `Must include a title`],
    trim: true
  },
  slug: String,
  body: {
    type: String,
    required: [true, `Must include a body`]
  },
  image: {
    type: String
  },
  mood: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Slug
EntrySchema.pre('save', function(next) {
  this.slug = slugify(this.title, {
    lower: true
  });
  next();
});

module.exports = mongoose.model('Entry', EntrySchema);