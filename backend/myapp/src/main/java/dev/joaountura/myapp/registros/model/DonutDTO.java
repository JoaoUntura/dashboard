package dev.joaountura.myapp.registros.model;


import lombok.Data;

import java.util.Objects;

@Data
public class DonutDTO {

    private Double dados;
    private String labels;
    private String colors;

    public DonutDTO(Double soma, String descricao, String tipo) {
        if (Objects.equals(tipo, "Despesa")){
            this.colors =  "rgb(255, 0, 0)";
        }else{
            this.colors = "rgb(0, 128, 0)";
        }


        this.labels = descricao;
        this.dados = soma;
    }
}
