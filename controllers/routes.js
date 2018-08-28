var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");
var path = require("path");

module.exports = function (app) {

    //Route for index.html...
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //Route for scrape
    app.get("/scrape", function (req, res) {
        request("https://www.fantasyflightgames.com/en/index/", function (err, res, html) {
            var $ = cheerio.load(html);

            //searches the website for each span with the class of title and link...
            $("div.blog-post-preview").each(function (i, element) {
                var result = {};
                result.title = $(this).children("span").text();
                result.link = $("span").children("a").attr("href");
                result.description = $(this).children("p").text();
                console.log(result);
                //This creates our result
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle)
                    });
            });
        })
        res.render("scrape");
    });

    //Route for articles that have been scraped...
    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (data) {
            res.render("articles", {
                article: data
            });
        })
    })
}

