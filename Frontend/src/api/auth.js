import API from "./index";

export const register = (userData) => API.post("/register", userData);

export const login = async (credentials) => {
    const response = await API.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); 
      console.log("Token is saved:", response.data.token); 
      return response.data;
    } else {
      throw new Error("Did not recieve token");
    }
};
