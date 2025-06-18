import API from "./index";

export const register = (userData) => API.post("/register", userData);

export const login = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);

   
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); 
      console.log("Токен сохранён:", response.data.token); 
      return response.data;
    } else {
      throw new Error("Токен не получен от сервера");
    }
  } catch (error) {
    console.error("Ошибка входа:", error.response?.data || error.message);
    throw error;
  }
};
