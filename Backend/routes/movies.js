const express = require("express");
const router = express.Router();

const {
  getMovies,
  getNewMovie,
  addMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

router.route("/movies").get(getMovies).post(addMovie);
router.route("/movies/new").get(getNewMovie);
router.route("/movies/edit/:id").get(editMovie);
router.route("/movies/update/:id").post(updateMovie);
router.route("/movies/delete/:id").post(deleteMovie);

module.exports = router;
