package dev.joaountura.myapp.registros;


import dev.joaountura.myapp.registros.model.*;
import dev.joaountura.myapp.registros.services.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/registro")
public class RegistroControler {

    private final RegistroServices registroServices;
    private final RegistroPaginationService registroPaginationService;
    private final RegistroDonutService registroDonutService;
    private final RegistroLineService registroLineService;
    private final RegistroBarService registroBarService;


    public RegistroControler(RegistroServices registroServices, RegistroPaginationService registroPaginationService, RegistroDonutService registroDonutService, RegistroLineService registroLineService, RegistroBarService registroBarService) {
        this.registroServices = registroServices;
        this.registroPaginationService = registroPaginationService;
        this.registroDonutService = registroDonutService;
        this.registroLineService = registroLineService;
        this.registroBarService = registroBarService;
    }

    @PostMapping
    public ResponseEntity<String> cadastrarResgistro(@RequestBody Registro registro){
        System.out.println(registro);
        return registroServices.criar_registro(registro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarRegistro(@PathVariable Integer id){
        return registroServices.deletar_registro(id);

    }

    @PostMapping("/paginar")
    public ResponseEntity<List<RegistroDTO>> selectRegistro(@RequestBody(required = false) Registro registro){
        return registroPaginationService.selecionarRegistros(registro.getData(), registro.getIdRegistro());
    }

    @GetMapping("/dados_donut/{mes}")
    public ResponseEntity<List<DonutDTO>> getDadosDonut(@PathVariable Integer mes){
        return registroDonutService.execute(mes);
    }

    @GetMapping("/dados_line/{mes}")
    public ResponseEntity<List<LineDTO>> getDadosLine(@PathVariable Integer mes){
        return registroLineService.executar(mes);
    }

    @GetMapping("/dados_bar")
    public  ResponseEntity<List<BarDTO>> getDadosBar(){
        return registroBarService.execute();
    }


}

