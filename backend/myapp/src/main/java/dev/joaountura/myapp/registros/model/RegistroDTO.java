package dev.joaountura.myapp.registros.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Data
public class RegistroDTO {
    private Integer idRegistro;
    private String observacao;
    private String data_formatada;
    private LocalDate data;
    private Double valor;
    private String tipo;
    private String categoriaDescricao;
    @JsonIgnore
    DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public RegistroDTO(Registro registro){
        this.idRegistro = registro.getIdRegistro();
        this.observacao = registro.getObservacao();
        this.data = registro.getData();
        this.data_formatada =  registro.getData().format(formato);
        this.valor = registro.getValor();
        this.tipo = registro.getTipo();
        this.categoriaDescricao = registro.getCategoria().getDescricao();
    }
}
