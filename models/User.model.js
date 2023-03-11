const { Schema, model, mongoose } = require("mongoose");
const comunidadesAutonomas = require("../utils/comunidades.js");
const tecnologias = require("../utils/tecnologias.js");
const nivel = require("../utils/nivel")

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  profilePhoto: {
    type: String,
  },

  comunidadAutonoma: {
    type: String,
    enum: comunidadesAutonomas,
  },

  tech: [
    {
      type: String,
      enum: tecnologias,
    },
  ],

  level: {
    type: String,
    enum: nivel,
  },

  hackaton: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackaton",
    },
  ],

  role: {
    type: String,
    enum: ["normal", "admin", "company"],
    default: "normal",
  },
});

const User = model("User", userSchema);

module.exports = User;
