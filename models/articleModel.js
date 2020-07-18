const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, 'An article must have a headline'],
      unique: true,
      trim: true,
      maxlength: [100, 'An article headline must have less or equal then 100 characters'],
      minlength: [5, 'An article headline must have more or equal then 5 characters']
      
    },
    body: {
      type: String,
      trim: true,
      minlength: [50, 'An article body must have more or equal then 50 characters'],
      required: [true, 'An article must have a body'],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    location: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    collaborators: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

articleSchema.index({ createdAt: 1, ratingsAverage: -1 });
articleSchema.index({ slug: 1 });

articleSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'article',
  localField: '_id'
});

articleSchema.pre('save', function(next) {
  this.slug = slugify(this.headline, { lower: true });
  this.summary = this.body.substring(0, 50);
  next();
});

articleSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'collaborators',
    select: '-__v -passwordChangedAt'
  });

  this.populate({
    path: 'author',
    select: '-__v -passwordChangedAt'
  });

  next();
});

articleSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
