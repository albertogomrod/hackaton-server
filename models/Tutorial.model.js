const { Schema, model } = require("mongoose");


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const tutorialSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tech: [
    {
      type: String,
    },
  ],

  links: [
    {
      type: String,
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Tutorial = model("Tutorial", tutorialSchema);

module.exports = Tutorial;
