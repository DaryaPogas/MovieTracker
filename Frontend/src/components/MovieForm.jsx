import { useState} from "react";
import "./MovieForm.css";

const MovieForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [form, setForm] = useState({
    title: "",
    director: "",
    status: "",
    rating: "",
    genres: [],
    ageRating: "",
    review: "",
    posterUrl: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenresChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setForm({ ...form, genres: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...form };
    if (form.status !== "watched") {
      delete dataToSend.review;
    }
    if (!form.posterUrl?.trim()) {
      form.posterUrl = "/default-poster.jpg";
    }
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="director"
        value={form.director}
        onChange={handleChange}
        placeholder="Director"
        required
      />
      <input
        type="text"
        name="posterUrl"
        value={form.posterUrl || ""}
        onChange={handleChange}
        placeholder="Poster image URL (https://...)"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
      >
        <option value="">Select status</option>
        <option value="planned">Planned</option>
        <option value="watched">Watched</option>
        <option value="abandoned">Abandoned</option>
      </select>

      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
        required
      >
        <option value="">Select rating</option>
        {[
          "Perfect",
          "Great",
          "Good",
          "Okay",
          "Bad",
          "Spilled Popcorn",
          "NOT_WATCHED_YET",
        ].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        multiple
        name="genres"
        value={form.genres}
        onChange={handleGenresChange}
      >
        {[
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
        ].map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        name="ageRating"
        value={form.ageRating}
        onChange={handleChange}
        required
      >
        <option value="">Select age rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
      </select>

      {form.status === "watched" && (
        <textarea
          name="review"
          value={form.review || ""}
          onChange={handleChange}
          placeholder="Your review"
          rows={4}
          maxLength={1000}
        />
      )}

      <button type="submit">{isEditing ? "Update Movie" : "Add Movie"}</button>
    </form>
  );
};

export default MovieForm;
