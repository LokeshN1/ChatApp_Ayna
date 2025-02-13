import axios from "axios";

const API_URL = "http://localhost:1337/api/auth/local";

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response.data);
    throw error;
  }
};

export const login = async (identifier, password) => {
  try {
    const response = await axios.post(API_URL, {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response.data);
    throw error;
  }
};

export const getMe = async (token) => {
  try {
    const response = await axios.get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error.response.data);
    throw error;
  }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page after logout
  };
  