package pe.edu.tecsup.manytomany.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.tecsup.manytomany.entity.Etiqueta;

public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long> {
}
