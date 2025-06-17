const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
createMovie,
  updateMovie,
  deleteMovie,
  getMovieMetadata
} = require("../controllers/movies");

router.route("/").get(getMovies).post(createMovie);
router.route("/metadata").get(getMovieMetadata);
router.route("/:id").get(getMovie).delete(deleteMovie).patch(updateMovie);
module.exports = router;
