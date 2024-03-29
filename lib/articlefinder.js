var jsdom = require('jsdom');

var getArticle = function (url, callback) {
        jsdom.env(url, ["http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"], function (errors, window) {
			if (errors) {
				console.log("ARTICLEFINDER: Found errors while creating the DOM:");
				console.log(errors);
			}
        	var $ = window.$;
            var removeFromContent = ["nav", ".article_gallery", ".toolsListContainer", ".audio player", ".post-fb-like", 
									"table", ".textwidget", ".tagline", ".toc", ".right-container", ".module-footer",
									".follow_this_in_post", ".comment_master_list", ".compare-tool-medium",
									".slegend", ".comments ", ".entry-section-title", ".gallery", ".categories"];

            var isContent = [".product-review-entry", ".article-body", ".post_body", ".entry-content", ".episode_notes", ".b-singlepost-body", 
							".description", ".body-copy", ".post-body", ".cn_currentcaption .current", "#story .body", 
							".home-post-text", "#story-body-text", ".post-content", ".entry_body_text", 
							".cnnBlogContentPost", ".the-content", ".instapaper_body", ".post-content", ".story p", 
							".newsbody", "#page-post p", ".post_content"];

            var isTitle = [".headline", ".headline h1", ".post_title", ".entry-title", ".title", ".b-singlepost-title", ".title-news", 
							".article h1", ".entry-header h1", ".story h1", ".cnnBlogContentTitle", "instapaper_title", 
							".sl-layout-post h1", ".post-title", "#meebo-title", ".entrytitle h1", "#page-post h1"];

            var isAuthor = [".author", "[rel=author]", ".byline span", ".the-author", ".cnn_author", ".meta-author",
 							".submitted a", "address .url"];

            var isPostImage = [".thumbnail .story-body", ".story-image", ".cnnWideImage"];
			
			var o = {"title":"", "content":"", "images":"", "author":""}

            for (ii in removeFromContent) {
                $(removeFromContent[ii]).remove();
            }
			

            for (i in isTitle) {
                if ($(isTitle[i]).length > 0) {
                    o["title"] = $(isTitle[i]).text().replace(/(\r\n|\n|\r|\t)/gm,"");;
                    break;
                }
            }

            for (i in isContent) {
                if ($(isContent[i]).length > 0) {
					$("*").removeAttr("style", "class", "id");
                    o["content"] = $(isContent[i]).html().replace(/(\r\n|\n|\r|\t)/gm,"");;
                    break;
                }
            }

            for (i in isPostImage) {
                if ($(isPostImage[i]).length > 0) {
                    o["images"] = $(isPostImage[i]).html().replace(/(\r\n|\n|\r|\t)/gm,"");;
                    break;
                }
            }

            for (i in isAuthor) {
                if ($(isAuthor[i]).length > 0) {
                    o["author"] = $(isAuthor[i]).text().replace(/(\r\n|\n|\r|\t)/gm,"");;
                    break;
                }
            }
			
			return callback(o);

        });
}
module.exports.getArticle = getArticle;
