package dev.joaountura.myapp.registros;

import dev.joaountura.myapp.registros.model.BarDTO;
import dev.joaountura.myapp.registros.model.DonutDTO;
import dev.joaountura.myapp.registros.model.LineDTO;
import dev.joaountura.myapp.registros.model.Registro;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Repository
public interface RegistroRepositorio extends JpaRepository<Registro, Integer> {


    @Query("SELECT registro FROM Registro registro " + "JOIN registro.categoria c " + "ORDER BY registro.data DESC, registro.idRegistro DESC" )
    List<Registro> primeirosRegistros(Pageable pageable);

    @Query("SELECT registro FROM Registro registro " + "JOIN registro.categoria c " +
            "WHERE ( registro.data,registro.idRegistro) < (:lastData, :lastId) " + "ORDER BY registro.data DESC, registro.idRegistro DESC")
    List<Registro> novosRegistros(  @Param("lastData") LocalDate lastData,
                                    @Param("lastId") Integer lastId,
                                    Pageable pageable);



    @Query("SELECT new dev.joaountura.myapp.registros.model.DonutDTO(SUM(registro.valor), c.descricao, c.tipo) FROM Registro registro "
            + "JOIN registro.categoria c " + "WHERE MONTH(registro.data) = :mes " + "GROUP BY c.descricao, c.tipo " + "ORDER BY c.tipo" )
    List<DonutDTO> dadosByCategoria(@Param("mes") Integer mes);


    @Query("SELECT new dev.joaountura.myapp.registros.model.LineDTO(registro.data, SUM(registro.valor), registro.tipo,(SELECT CONCAT(GROUP_CONCAT(DISTINCT c.descricao), ''))) FROM Registro registro "
            +"JOIN registro.categoria c " + "WHERE MONTH(registro.data) = :mes AND YEAR(registro.data) = 2024 " + "GROUP BY registro.data, registro.tipo ORDER BY registro.data")
    List<LineDTO> dadosByDate(@Param("mes") Integer mes);



    @Query("SELECT new dev.joaountura.myapp.registros.model.BarDTO(ROUND(SUM(registro.valor)), registro.tipo, MONTH(registro.data)) "
    + "FROM Registro registro " + "GROUP BY MONTH(registro.data), registro.tipo " + "ORDER BY MONTH(registro.data)")
    List<BarDTO> dadosBar();
}

