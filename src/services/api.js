import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001"
});

export default API;

export async function getProducts() {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.warn('Product fetch error:', error);
    return [];
  }
}

export async function postNewProduct(product) {
  try {
    const response = await API.post("/products", product);
    return response.data;
  } catch (error) {
    console.warn('Product API request failed:', error);
    return null;
  }
}
