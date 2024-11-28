package dev.joaountura.myapp.registros.services;
import dev.joaountura.myapp.registros.RegistroRepositorio;
import dev.joaountura.myapp.registros.model.DonutDTO;
import dev.joaountura.myapp.registros.model.Registro;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class RegistroDonutService {

    private final RegistroRepositorio registroRepositorio;

    public RegistroDonutService(RegistroRepositorio registroRepositorio) {
        this.registroRepositorio = registroRepositorio;
    }

    public ResponseEntity<List<DonutDTO>> execute(Integer mes){

        List<DonutDTO> dados = registroRepositorio.dadosByCategoria(mes);

        return ResponseEntity.status(HttpStatus.OK).body(dados);



    }


}
