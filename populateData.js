const ArticleModel = require("./NewsArticle.js");
module.exports=function populateData(dataArr){
    ArticleModel.create(dataArr);
}