const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// GET all Movies for the current user
const getMovies = async (req, res) => {
  const movies = await Movie.find({ createdBy: req.user._id }).sort("createdAt")
  res.status(StatusCodes.OK).json({ movies, count: movies.length })
};

//GET a single movie
const getMovie = async (req, res) => {
  const movie = await Movie.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!movie) {
    throw new NotFoundError(`No movie with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ movie });
};

// POST a new Movie
const createMovie = async (req, res) => {
  if (req.body.status === "watched" && req.body.rating === "NOT_WATCHED_YET") {
    throw new BadRequestError("Please set rating when marking as watched");
  }
    const movie = await Movie.create({ ...req.body, createdBy: req.user._id });
   res.status(StatusCodes.CREATED).json({ movie });
};

// POST an updated movie
const updateMovie = async (req, res) => {
    if (req.body.status === 'watched' && req.body.rating === 'NOT_WATCHED_YET') {
      throw new BadRequestError('Please set rating when marking as watched')
    }
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      throw new NotFoundError(`Movie not found`);
    }
res.status(StatusCodes.OK).json({ movie });
  } 

// POST to delete a movie
const deleteMovie = async (req, res) => {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!movie) {
      // req.flash("error", "Movie not found");
      throw new NotFoundError(`Movie not found`);
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Movie deleted successfully",
      deletedId: req.params.id
    });
};

//for frontend
const getMovieMetadata = (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      genres: Movie.schema.path("genres").enumValues,
      ageRatings: Movie.schema.path("ageRating").enumValues,
      statusOptions: Movie.schema.path("status").enumValues,
      ratingOptions: Movie.schema.path("rating").enumValues,
    },
  });
};
module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieMetadata
};

