package pe.edu.tecsup.manytomany.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.manytomany.entity.Etiqueta;
import pe.edu.tecsup.manytomany.entity.Producto;
import pe.edu.tecsup.manytomany.repository.EtiquetaRepository;
import pe.edu.tecsup.manytomany.repository.ProductoRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    @PostMapping
    public Map<String, String> crearProducto(@RequestBody Producto producto) {
        productoRepository.save(producto);
        return Map.of("mensaje", "Producto creado correctamente");
    }


    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Map<String, String> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setPrecio(productoActualizado.getPrecio());

            if (productoActualizado.getEtiquetas() != null) {
                Set<Etiqueta> etiquetas = new HashSet<>();
                for (Etiqueta etiqueta : productoActualizado.getEtiquetas()) {
                    etiquetas.add(etiquetaRepository.findById(etiqueta.getId()).orElse(etiqueta));
                }
                producto.setEtiquetas(etiquetas);
            }

            productoRepository.save(producto);
            return Map.of("mensaje", "Producto actualizado correctamente");
        }).orElseGet(() -> Map.of("mensaje", "Producto no encontrado"));
    }


    @DeleteMapping("/{id}")
    public Map<String, String> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return Map.of("mensaje", "Producto eliminado correctamente");
        } else {
            return Map.of("mensaje", "Producto no encontrado");
        }
    }

}
