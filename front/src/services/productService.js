const API_URL = "http://localhost:8080/api/productos";

const fetchAPI = async (endpoint = "", options = {}) => {
  const url = endpoint ? `${API_URL}/${endpoint}` : API_URL;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error en la API");
  }

  return response.json();
};


export const getProductos = () => fetchAPI();
export const getProducto = (id) => fetchAPI(`${id}`);
export const postProducto = (producto) =>
  fetchAPI("", {
    method: "POST",
    body: JSON.stringify(producto),
  });
export const putProducto = (id, producto) =>
  fetchAPI(`${id}`, {
    method: "PUT",
    body: JSON.stringify(producto),
  });
export const deleteProducto = (id) =>
  fetchAPI(`${id}`, { method: "DELETE" });
