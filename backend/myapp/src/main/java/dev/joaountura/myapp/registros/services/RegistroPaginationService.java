package dev.joaountura.myapp.registros.services;


import dev.joaountura.myapp.registros.RegistroRepositorio;
import dev.joaountura.myapp.registros.model.Registro;
import dev.joaountura.myapp.registros.model.RegistroDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistroPaginationService {

    private final RegistroRepositorio registroRepositorio;


    public RegistroPaginationService(RegistroRepositorio registroRepositorio) {
        this.registroRepositorio = registroRepositorio;
    }

    public ResponseEntity<List<RegistroDTO>> selecionarRegistros(LocalDate lastData, Integer lastId){
        List<Registro> registros;
         if (lastData == null && lastId == null) {
            registros = registroRepositorio.primeirosRegistros(PageRequest.of(0, 10));

         }else{

             registros = registroRepositorio.novosRegistros(lastData, lastId, PageRequest.of(0,10));
         }

         List<RegistroDTO> registrosdto = registros.stream().map(RegistroDTO::new).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(registrosdto);
  }

}

