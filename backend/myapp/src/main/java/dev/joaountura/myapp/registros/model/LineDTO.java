package dev.joaountura.myapp.registros.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class LineDTO {
    private Integer x;
    private Double y;
    private String tipo;
    private String categorias;


    public LineDTO(LocalDate data, Double valor, String tipo, String categorias) {
        this.x = data.getDayOfMonth();
        this.y = valor;
        this.tipo = tipo;
        this.categorias = categorias;
    }
}
