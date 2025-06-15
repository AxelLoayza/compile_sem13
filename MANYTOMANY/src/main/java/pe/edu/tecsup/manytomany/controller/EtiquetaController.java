package pe.edu.tecsup.manytomany.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.tecsup.manytomany.entity.Etiqueta;
import pe.edu.tecsup.manytomany.repository.EtiquetaRepository;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/etiquetas")
public class EtiquetaController {
    @Autowired
    private EtiquetaRepository etiquetaRepository;

    @PostMapping
    public String crearEtiqueta(@RequestBody Etiqueta etiqueta) {
        etiquetaRepository.save(etiqueta);
        return "Etiqueta creada correctamente";
    }

    @GetMapping
    public List<Etiqueta> listarEtiquetas() {
        return etiquetaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Etiqueta obtenerEtiqueta(@PathVariable Long id) {
        return etiquetaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public String actualizarEtiqueta(@PathVariable Long id, @RequestBody Etiqueta etiquetaActualizada) {
        return etiquetaRepository.findById(id).map(etiqueta -> {
            etiqueta.setNombre(etiquetaActualizada.getNombre());
            etiquetaRepository.save(etiqueta);
            return "Etiqueta actualizada correctamente";
        }).orElse("Etiqueta no encontrada");
    }

    @DeleteMapping("/{id}")
    public String eliminarEtiqueta(@PathVariable Long id) {
        if (etiquetaRepository.existsById(id)) {
            etiquetaRepository.deleteById(id);
            return "Etiqueta eliminada correctamente";
        } else {
            return "Etiqueta no encontrada";
        }
    }
}
