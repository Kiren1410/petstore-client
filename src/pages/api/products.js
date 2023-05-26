import axios from "axios";
import localforage from "localforage";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:1234/products");
  return res.data;
};

export const addProduct = async (product, image) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("image", image);
  const res = await axios.post("http://localhost:1234/products", formData, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`http://localhost:1234/products/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
};

export const updateProduct = async (product) => {
  let formData = new FormData();
  formData.append("name", product.updatedProduct.name);
  formData.append("price", product.updatedProduct.price);
  formData.append("description", product.updatedProduct.description);
  formData.append("quantity", product.updatedProduct.quantity);
  formData.append("image", product.image);
  const res = await axios.put(
    `http://localhost:1234/products/${product.updatedProduct.id}`,
    formData,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
};
