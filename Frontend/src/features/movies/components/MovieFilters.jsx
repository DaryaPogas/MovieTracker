import { useState } from "react";

const MovieFilters = ({
  metadata,
  filters,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded px-3 py-2"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">All Status</option>
          {metadata?.statusOptions?.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filters.rating}
          onChange={(e) => onFilterChange("rating", e.target.value)}
        >
          <option value="">All Ratings</option>
          {metadata?.ratingOptions?.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filters.genre}
          onChange={(e) => onFilterChange("genre", e.target.value)}
        >
          <option value="">All Genres</option>
          {metadata?.genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filters.ageRating}
          onChange={(e) => onFilterChange("ageRating", e.target.value)}
        >
          <option value="">All Age Ratings</option>
          {metadata?.ageRatings?.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          <option value="">No Sorting</option>
          <option value="asc">Rating Ascending</option>
          <option value="desc">Rating Descending</option>
        </select>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`px-3 py-1 border rounded ${
                currentPage === num ? "bg-blue-500 text-white" : ""
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default MovieFilters;
