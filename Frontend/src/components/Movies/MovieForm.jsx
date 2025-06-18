import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createMovie, updateMovie } from "../../api/movies";
import { GENRES, AGE_RATINGS, RATINGS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function MovieFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      genres: [],
      ageRating: "G",
      status: "planned",
      rating: "NOT_WATCHED_YET",
      review: "",
      posterUrl: "",
    },
  });

  // Load movie data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadMovie = async () => {
        try {
          const movie = await getMovie(id);
          reset(movie);
        } catch (error) {
          console.error("Failed to load movie:", error);
          navigate("/movies");
        }
      };
      loadMovie();
    }
  }, [id, reset, navigate, isEditMode]);

  const status = watch("status");

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateMovie(id, data);
      } else {
        await createMovie({ ...data, createdBy: user._id });
      }
      navigate("/movies");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="movie-form-container">
      <h2>{isEditMode ? "Edit Movie" : "Add New Movie"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="form-group">
          <label>Title *</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={errors.title ? "error" : ""}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        {/* Year */}
        <div className="form-group">
          <label>Year *</label>
          <input
            type="number"
            {...register("year", {
              required: "Year is required",
              min: { value: 1900, message: "Must be 1900 or later" },
              max: {
                value: new Date().getFullYear(),
                message: "Can't be in the future",
              },
            })}
            className={errors.year ? "error" : ""}
          />
          {errors.year && (
            <span className="error-message">{errors.year.message}</span>
          )}
        </div>

        {/* Genres Multi-select */}
        <div className="form-group">
          <label>Genres *</label>
          <select
            multiple
            {...register("genres", { required: "Select at least one genre" })}
            className={errors.genres ? "error" : ""}
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genres && (
            <span className="error-message">{errors.genres.message}</span>
          )}
        </div>

        {/* Status and Conditional Rating */}
        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select {...register("status")}>
              <option value="planned">Planned</option>
              <option value="watched">Watched</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>

          {status === "watched" && (
            <div className="form-group">
              <label>Rating *</label>
              <select
                {...register("rating", {
                  validate: (value) =>
                    value !== "NOT_WATCHED_YET" || "Rating is required",
                })}
                className={errors.rating ? "error" : ""}
              >
                {RATINGS.filter((r) => r !== "NOT_WATCHED_YET").map(
                  (rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  )
                )}
              </select>
              {errors.rating && (
                <span className="error-message">{errors.rating.message}</span>
              )}
            </div>
          )}
        </div>

        {/* Review and Poster URL */}
        <div className="form-group">
          <label>Review</label>
          <textarea {...register("review")} rows="4" />
        </div>

        <div className="form-group">
          <label>Poster URL</label>
          <input
            type="url"
            {...register("posterUrl")}
            placeholder="https://example.com/poster.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditMode ? "Update" : "Save"} Movie
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
