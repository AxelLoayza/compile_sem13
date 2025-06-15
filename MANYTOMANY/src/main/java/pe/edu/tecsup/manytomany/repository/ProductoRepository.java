package pe.edu.tecsup.manytomany.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.tecsup.manytomany.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
