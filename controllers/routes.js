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
    app.get("/articles", function (req, res) {
        request("https://www.fantasyflightgames.com/en/index/", function(err, res, html){
            var $ = cheerio.load(html);
            
            $("span a").each(function(i, element){
                var result = {};
                result.title = $(this).text();
                console.log(result);
                result.link = $(this).attr("href");
            })
            
        })
        res.render("articles");
    });

}

