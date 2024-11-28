package dev.joaountura.myapp.registros.services;
import dev.joaountura.myapp.registros.RegistroRepositorio;
import dev.joaountura.myapp.registros.model.Registro;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class RegistroServices {

    private final RegistroRepositorio registroRepositorio;


    public RegistroServices(RegistroRepositorio registroRepositorio) {
        this.registroRepositorio = registroRepositorio;
    }

    public ResponseEntity<String> criar_registro(Registro registro) {
        Registro savedRegistro = registroRepositorio.save(registro);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registro concluido com exito");
    }

    public ResponseEntity<String> deletar_registro(Integer id) {
        registroRepositorio.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deletado");
    }
}

