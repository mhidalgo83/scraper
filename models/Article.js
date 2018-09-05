var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// The Article object
var ArticleSchema = new Schema({
  //Title of article...
  title: {
    type: String,
    required: true
  },
  //Link to article...
  link: {
    type: String,
    required: true,
    unique: true
  },
  // Description of article...
  description: {
      type: String,
      required: true
  },
  // This allows us to populate the Article with an associated Note
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

//Creates the model...
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;