package dev.joaountura.myapp.registros.model;

import dev.joaountura.myapp.registros.RegistroRepositorio;
import lombok.Data;

@Data
public class BarDTO {

    private Double y;
    private String tipo;
    private Integer x;

    public BarDTO(Double valor,String tipo , Integer mes) {
        this.tipo = tipo;
        this.y = valor;
        this.x = mes;
    }
}
