// src/lib/auth.ts

import api from "./api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    console.log(data);
    const response = await api.post("register/", data);
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post("login/", data);
    const { access, refresh } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/";
};
