const { Schema, model } = require("mongoose");

const quoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  body: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports=model("quote",quoteSchema)
