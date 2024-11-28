package dev.joaountura.myapp.registros.services;

import dev.joaountura.myapp.registros.RegistroRepositorio;
import dev.joaountura.myapp.registros.model.LineDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;


@Service
public class RegistroLineService {

    private final RegistroRepositorio registroRepositorio;

    public RegistroLineService(RegistroRepositorio registroRepositorio) {
        this.registroRepositorio = registroRepositorio;
    }

    public ResponseEntity<List<LineDTO>> executar(Integer mes){
        List<LineDTO> dados = registroRepositorio.dadosByDate(mes);


        return ResponseEntity.status(HttpStatus.OK).body(dados);
    }
}
