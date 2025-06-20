import { useState, useEffect } from "react";

const MovieForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [form, setForm] = useState({
    title: "",
    director: "",
    status: "",
    rating: "",
    genres: [],
    ageRating: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [JSON.stringify(initialData)]); 

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
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="director"
        value={form.director}
        onChange={handleChange}
        placeholder="Director"
        className="border px-3 py-2 rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      >
        <option value="">Select status</option>
        <option value="planned">Planned</option>
        <option value="watched">Watched</option>
      </select>

      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
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
          "NOT_WATCHED_YET", // опционально, если нужен
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
        className="border px-3 py-2 rounded h-32"
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
        className="border px-3 py-2 rounded"
        required
      >
        <option value="">Select age rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {isEditing ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;
