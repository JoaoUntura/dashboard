package dev.joaountura.myapp.categoria;
import dev.joaountura.myapp.categoria.model.Categoria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriasControler {

    private final CategoriaServices categoriaServices;

    public CategoriasControler(CategoriaServices categoriaServices) {
        this.categoriaServices = categoriaServices;
    }

    @GetMapping
    public  ResponseEntity<List<Categoria>> getCategorias(){
        return categoriaServices.selectAllCategorias();
    }


}
