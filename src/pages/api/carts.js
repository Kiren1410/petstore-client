import axios from "axios";
import localforage from "localforage";
export async function getCart() {
  const token = localStorage.getItem("token")
  console.log("token",token);
  const res = await axios.get("http://localhost:1234/carts", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}


export async function addToCart(product) {
  const res = await axios.post("http://localhost:1234/carts", product, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteItem(id) {
  const res = await axios.delete(`http://localhost:1234/carts/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteCart() {
  const res = await axios.delete("http://localhost:1234/carts", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}
