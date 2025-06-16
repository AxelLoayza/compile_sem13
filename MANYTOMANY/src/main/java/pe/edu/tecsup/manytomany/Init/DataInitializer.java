package pe.edu.tecsup.manytomany.Init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pe.edu.tecsup.manytomany.entity.Etiqueta;
import pe.edu.tecsup.manytomany.repository.EtiquetaRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(EtiquetaRepository etiquetaRepo) {
        return args -> {
            if (etiquetaRepo.count() == 0) {
                etiquetaRepo.save(new Etiqueta("Oferta"));
                etiquetaRepo.save(new Etiqueta("Tecnología"));
                etiquetaRepo.save(new Etiqueta("Cyber WOW"));
                etiquetaRepo.save(new Etiqueta("Día del padre"));
                etiquetaRepo.save(new Etiqueta("Importación"));
                etiquetaRepo.save(new Etiqueta("Popular"));

            }
        };
    }
}
