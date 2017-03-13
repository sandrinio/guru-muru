var express = require('express');
var router = express.Router();
var News = require("../models/news");

router.get('/', function (req, res) {

  News.find({}).sort('-date').exec(function (err, newsPosts){
    if(err){
      console.log(err)
    }else{
      //hot news data
      var totalBlogPostsCount = newsPosts.length,
          pageSize = 10,
          pageCount = totalBlogPostsCount / pageSize + 1,
          currentPage = 1,
          blogPostsArray = [],
          blogPostsList = {};

      while (newsPosts.length > 0) {
        blogPostsArray.push(newsPosts.splice(0, pageSize));
    }
      if (typeof req.query.page !== 'undefined') {
        currentPage = + req.query.page;
      }
      blogPostsList.hot = blogPostsArray[ + currentPage - 1];
      res.render('client/clientLanding', {
                              data: blogPostsList,
                              pageSize: pageSize,
                              totalBlogPostsCount: totalBlogPostsCount,
                              pageCount: pageCount,
                              currentPage: currentPage
                             });
  }
});
});



module.exports = router;
