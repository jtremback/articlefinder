var articlefinder = require('../lib/articlefinder');
var url = "http://techcrunch.com/2012/02/18/beyond-facebook-the-rise-of-interest-based-social-networks/";
articlefinder.getArticle(url, function (article) {
	console.log(article.title);
});