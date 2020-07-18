const Article = require('./../models/articleModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.aliasTopArticles = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,headline';
  req.query.fields = 'headline,ratingsAverage,summary,body,author';
  next();
};

exports.getAllArticles = factory.getAll(Article);
exports.getArticle = factory.getOne(Article, { path: 'reviews' });
exports.createArticle = factory.createOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
