const Movie = require("../models/Movie");
const handleErrors = require("../util/parseValidationErr");
//const { fetchMoviePoster } = require("../services/tmdb")

// GET all Movies for the current user
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ createdBy: req.user._id });
    res.render("movies", { movies });
  } catch (error) {
    handleErrors(error, req, res);
    res.status(500).redirect("/movies");
  }
};
// POST a new Movie
const addMovie = async (req, res, next) => {
  try {
    if (
      req.body.status === "watched" &&
      req.body.rating === "NOT_WATCHED_YET"
    ) {
      req.flash("error", "Please set rating when marking as watched");
      return res.redirect("/movies/new");
    }

    await Movie.create({ ...req.body, createdBy: req.user._id });
    res.redirect("/movies");
  } catch (error) {
    if (error.name === "ValidationError") {
      parseValidationErrors(error, req);
    } else {
      req.flash("error", "Server error");
    }
    res.redirect("/movies/new");
  }
};

// GET the form for adding a new movie
const getNewMovie = (req, res) => {
  try {
    res.render("movies/new", {
      genres: Movie.schema.path("genres").enumValues,
      ageRatings: Movie.schema.path("ageRating").enumValues,
    });
  } catch (error) {
    handleErrors(error, req, res);
  }
};

// GET a specific jobs for editing
const editMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      req.flash("error", "Movie not found");
      return res.status(404).redirect("/movies");
    }
    res.render("movies/edit", {
      movie,
      genres: Movie.schema.path("genres").enumValues,
      ageRatings: Movie.schema.path("ageRating").enumValues,
      ratings: Movie.schema.path("rating").enumValues,
    });
  } catch (error) {
    handleErrors(error, req, res);
    res.redirect('/movies')
  }
}
// POST an updated movie
const updateMovie = async (req, res, next) => {
  try {
    if (req.body.status === 'watched' && req.body.rating === 'NOT_WATCHED_YET') {
      req.flash('error', 'Please set rating when marking as watched');
      return res.redirect(`/movies/edit/${req.params.id}`);
    }
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      req.flash("error", "Movie not found");
      return res.status(404).redirect("/movies");
    }
    req.flash("success", "Movie updated successfully!");
    res.redirect("/movies");
  } catch (error) {
    if (error.name === 'ValidationError') {
      parseValidationErrors(error, req);
      res.redirect(`/movies/edit/${req.params.id}`);
    } else {
      req.flash('error', 'Server error');
      res.redirect('/movies');
    }
  }
};
// POST to delete a movie
const deleteMovie = async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!deletedMovie) {
      req.flash("error", "Movie not found");
      return res.status(404).redirect("/movies");
    }
    req.flash("success", "Movie was deleted");
    res.redirect("/movies");
  } catch (error) {
    handleErrors(error, req, res, "/movies");
  }
};

module.exports = {
  getMovies,
  getNewMovie,
  addMovie,
  editMovie,
  updateMovie,
  deleteMovie
};

