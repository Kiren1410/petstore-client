import axios from "axios";
import { redirect } from "next/navigation";
import localforage from "localforage";
import { useRouter } from "next/navigation";
export const register = async (userData) => {
  const res = await axios.post(
    "http://localhost:1234/users/register",
    userData
  );
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post("http://localhost:1234/users/login", userData);
  if (res.data) {
    // await localforage.setItem("token", res.data);
    localStorage.setItem('token', res.data)

  }
  return res.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
};
