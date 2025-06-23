import { useState } from "react";
import "./MovieFilters.css";
const MovieFilters = ({
  metadata,
  filters,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onSearchClick,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="filters-search">
        <input
          type="text"
          placeholder="Search by title or director"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      <div className="filters-controls">
        <select
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
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          <option value="">No Sorting</option>
          <option value="ratingAsc">Rating Ascending</option>
          <option value="ratingDesc">Rating Descending</option>
        </select>
      </div>

      {totalPages > 1 && (
        <div className="filters-pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={currentPage === num ? "active-page" : ""}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default MovieFilters;
