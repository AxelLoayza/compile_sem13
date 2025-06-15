
import { useNavigate } from "react-router-dom";

const Item = ({ producto ,onDelete}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/form/${producto.id}`);
  };

  
  return (
    <div className="card mb-3 h-100">
      <img
        src="https://static.vecteezy.com/system/resources/previews/023/644/780/original/phone-icon-set-of-flat-phone-and-mobile-phone-symbol-collection-telephone-call-sign-contact-us-illustration-business-card-contact-information-icons-free-vector.jpg"
        className="card-img-top"
        alt="Imagen predeterminada"
        style={{ height: "180px", objectFit: "cover" }}
      />
        <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">Precio: ${producto.precio}</p>

        {producto.etiquetas?.length > 0 && (
            <div>
            <h6>Etiquetas:</h6>
            <div className="d-flex flex-wrap gap-2">
                {producto.etiquetas.map((et) => (
                <span key={et.id} className="badge bg-secondary">
                    {et.nombre}
                </span>
                ))}
            </div>
            </div>
        )}
        </div>

      <div className="card-footer text-center">
        <button className="btn btn-primary btn-sm" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(producto.id)}>
            Eliminar
        </button>
      </div>
    </div>
  );
};

export default Item;
