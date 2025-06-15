
import Item from "./item";
import { deleteProducto } from "../services/productService";
const ItemList = ({ productos, onDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {productos.map((producto) => (
        <div key={producto.id} className="col">
          <Item producto={producto} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
