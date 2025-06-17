const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    year: {
      type: Number,
      min: [1900, "Year can not be earlier than 1900"],
      max: [new Date().getFullYear(), "Year can not be in the future"],
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer",
      },
    },
    genres: {
      type: [String],
      required: true,
      enum: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "War",
        "Western",
      ],
    },
    ageRating: {
      type: String,
      required: true,
      enum: ["G", "PG", "PG-13", "R"],
      default: "G",
    },
    rating: {
      type: String,
      enum:{values: [
        "NOT_WATCHED_YET",
        "Perfect",
        "Great",
        "Good",
        "Okay",
        "Bad",
        "Spilled Popcorn",
      ]},
      default: "NOT_WATCHED_YET",
      validate: {
        validator: function (value) {
          if (this.status === "watched") {
            return value !== "NOT_WATCHED_YET";
          }
          return true;
        },
        message: "Rating is required for watched movies",
      },
    },
    review: { type: String, maxlength: 1000 },
    status: {
      type: String,
      enum: { values: ["watched", "planned", "abandoned"] },
      default: "planned",
    },
    posterUrl: {
      type: String,
      validate: {
        validator: (url) => {
          return /^https?:\/\/.+\..+/.test(url);
        },
        message: "Invalid poster URL",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


module.exports = mongoose.model("Movie", MovieSchema);
