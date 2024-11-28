package dev.joaountura.myapp.registros.model;

import dev.joaountura.myapp.categoria.model.Categoria;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name="registros")
public class Registro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_registro")
    private Integer idRegistro;

    @Column(name="observacao")
    private String observacao;

    @Column(name="data")
    private LocalDate data;

    @Column(name="valor")
    private Double valor;

    @Column(name="tipo")
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "registro_idcategoria")
    private Categoria categoria;


}
