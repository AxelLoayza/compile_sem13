// src/services/api.js
const API_URL = "http://localhost:8080/api";

// Obtiene la lista de productos
export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener los productos");
  }
  return response.json();
};

// Aquí podrías definir otras funciones, por ejemplo:
// export const getProducto = (id) => fetch(`${API_URL}/productos/${id}`)...
