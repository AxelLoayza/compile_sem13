import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProducto,
  postProducto,
  putProducto,
} from "../services/productService";
import { getEtiquetas } from "../services/etiquetaService";

const Form = () => {
  const { id } = useParams(); // Si hay ID, estamos editando
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    etiquetas: [],
  });
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);

  useEffect(() => {
    getEtiquetas().then(setEtiquetasDisponibles);
  }, []);

  useEffect(() => {
    if (id) {
      getProducto(id).then((producto) =>
        setFormData({
          nombre: producto.nombre,
          precio: producto.precio,
          etiquetas: producto.etiquetas?.map((e) => e.id) || [],
        })
      );
    }
  }, [id]);

  const toggleEtiqueta = (id) => {
  setFormData((prev) => {
    const etiquetas = prev.etiquetas.includes(id)
      ? prev.etiquetas.filter((e) => e !== id)
      : [...prev.etiquetas, id];

    return { ...prev, etiquetas };
  });
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEtiquetasChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) =>
      Number(opt.value)
    );
    setFormData((prev) => ({ ...prev, etiquetas: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      etiquetas: formData.etiquetas.map((id) => ({ id })),
    };

    try {
      if (id) {
        await putProducto(id, payload);
      } else {
        await postProducto(payload);
      }
      navigate("/");
    } catch (err) {
      alert("Error al guardar el producto: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
        <label className="form-label">Etiquetas</label>
        <div className="d-flex flex-wrap gap-2">
            {etiquetasDisponibles.map((etiqueta) => {
            const activa = formData.etiquetas.includes(etiqueta.id);
            return (
                <button
                key={etiqueta.id}
                type="button"
                className={`btn btn-sm ${activa ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => toggleEtiqueta(etiqueta.id)}
                >
                {etiqueta.nombre}
                </button>
            );
            })}
        </div>
        </div>


        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default Form;
