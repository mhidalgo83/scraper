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

            //searches the website for each div with the class of blog-post-preview...
            $("div.blog-post-preview").each(function (i, element) {

                //Saves the object in result...
                var result = {};
                result.title = $(this).children("span").text();
                result.link = $(this).find("span.title").children("a").attr("href");
                result.description = $(this).children("p").text();
                console.log(result);

                //This creates our result
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle)
                    }).catch(function(err){
                        console.log(err);
                    });
            });
        })
        res.render("scrape");
    });

    //Route for articles that have been scraped...
    app.get("/articles", function (req, res) {
        db.Article.find({}).populate("note").then(function (data) {
            console.log(data[0]);
            res.render("articles", {
                article: data
            });
        });
    });

    // Route for saving/updating an Article's associated Note...
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //Delete route to remove notes from the database...
    app.delete("/notes/:id", function (req, res){
        db.Note.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json(err);
        });
    });
};

