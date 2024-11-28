package dev.joaountura.myapp.categoria.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idcategorias")
    private Integer idcategorias;

    @Column(name="descricao")
    private String descricao;

    @Column(name="tipo")
    private String tipo;


}
