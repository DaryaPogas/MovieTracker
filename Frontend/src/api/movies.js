import API from './index'

export const getMovies = () => API.get("/movies");
export const getMovie = (id) => API.get(`/movies/${id}`);
export const createMovie = (data) => API.post("/movies", data);
export const updateMovie = (id, data) => API.patch(`/movies/${id}`, data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
