const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/etiquetas`;
 // ← sin slash al final

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

export const getEtiquetas = () => fetchAPI();
export const getEtiqueta = (id) => fetchAPI(`${id}`);
export const postEtiqueta = (etiqueta) =>
  fetchAPI("", {
    method: "POST",
    body: JSON.stringify(etiqueta),
  });
export const putEtiqueta = (id, etiqueta) =>
  fetchAPI(`${id}`, {
    method: "PUT",
    body: JSON.stringify(etiqueta),
  });
export const deleteEtiqueta = (id) =>
  fetchAPI(`${id}`, { method: "DELETE" });
