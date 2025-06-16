// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { getProductos } from "../services/productService";
import { getEtiquetas } from "../services/etiquetaService";
import { deleteProducto } from "../services/productService";

import Item from "../components/item";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";
import Footer from "../components/Footer";
import Header from "../components/Header";


const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      try {
        await deleteProducto(id);
        const dataActualizada = await getProductos();
        setProductos(dataActualizada);
      } catch (err) {
        alert("Error al eliminar el producto: " + err.message);
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <Header/>
        </div>
        
        <h1>Productos</h1>
        <button className="btn btn-success" onClick={() => navigate("/form")}>
          Nuevo Producto
        </button>
      </header>
      <div>
        <ItemList productos={productos} onDelete={handleDelete} />
      </div>
      <footer>
        <Footer/>
      </footer>
      
    </div>
  );
};


export default Home;
