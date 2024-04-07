const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  rated: String,
  cast: [String],
  title: { type: String, required: true },
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  lastupdated: String,
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: { type: String, required: true },
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    dvd: Date,
    lastUpdated: Date,
  },
  num_mflix_comments: { type: Number, default: 0 },
});

module.exports = mongoose.model("Movie", movieSchema);
