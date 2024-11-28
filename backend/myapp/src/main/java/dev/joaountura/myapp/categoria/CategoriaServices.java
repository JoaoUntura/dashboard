package dev.joaountura.myapp.categoria;

import dev.joaountura.myapp.categoria.model.Categoria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServices {

    private final CategoriasRepositorio categoriasRepositorio;

    public CategoriaServices(CategoriasRepositorio categoriasRepositorio) {
        this.categoriasRepositorio = categoriasRepositorio;
    }

    public ResponseEntity<List<Categoria>> selectAllCategorias(){
        List<Categoria> categorias = categoriasRepositorio.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(categorias);

    }
}
