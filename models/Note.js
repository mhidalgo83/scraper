var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Note object for our schema
var NoteSchema = new Schema({
  //Title of note...
  title: String,
  //Body of note...
  body: String
});

//Creates the model...
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;