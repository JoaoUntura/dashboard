package dev.joaountura.myapp.categoria;

import dev.joaountura.myapp.categoria.model.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriasRepositorio extends JpaRepository<Categoria, Integer> {
}
