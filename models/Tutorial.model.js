const { Schema, model, mongoose } = require("mongoose");
const tecnologias = require("../utils/tecnologias.js");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const tutorialSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tech: {
    type: String,
    enum: tecnologias,
  },

  videoUrl: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Tutorial = model("Tutorial", tutorialSchema);

module.exports = Tutorial;
