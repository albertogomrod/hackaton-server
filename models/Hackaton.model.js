const { Schema, model, mongoose } = require("mongoose");
const comunidadesAutonomas = require("../utils/comunidades.js");
const tecnologias = require("../utils/tecnologias.js");
const nivel = require("../utils/nivel");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const hackatonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    date: {
      type: String,
      required: true,
    },

    comunidadAutonoma: {
      type: String,
      enum: comunidadesAutonomas,
    },

    photo: {
      type: String,
    },

    description: {
      type: String,
    },

    tech: {
      type: String,
      enum: tecnologias,
    },

    level: {
      type: String,
      enum: nivel,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    coordinates: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Hackaton = model("Hackaton", hackatonSchema);

module.exports = Hackaton;
