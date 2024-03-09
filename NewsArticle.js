const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const newsArticleSchema = new Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String,
    country: String,
    category: String,
});

// Create a model based on the schema
const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;
