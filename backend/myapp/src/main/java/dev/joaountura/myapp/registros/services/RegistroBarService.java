package dev.joaountura.myapp.registros.services;

import dev.joaountura.myapp.registros.RegistroRepositorio;
import dev.joaountura.myapp.registros.model.BarDTO;
import dev.joaountura.myapp.registros.model.DonutDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RegistroBarService {


    private final RegistroRepositorio registroRepositorio;

    public RegistroBarService(RegistroRepositorio registroRepositorio) {
        this.registroRepositorio = registroRepositorio;
    }

    public ResponseEntity<List<BarDTO>> execute(){

        List<BarDTO> dados = registroRepositorio.dadosBar();


        return ResponseEntity.status(HttpStatus.OK).body(dados);



    }
}
