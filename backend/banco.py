from databases import Database

class Banco:
    def __init__(self):
        self.database = Database(
            "mysql://root:221203@localhost/sistema_next",
            min_size=5,
            max_size=20
        )

    async def connect(self):
        await self.database.connect()

    async def disconnect(self):
        await self.database.disconnect()

    async def insert_registro(self, tipo ,idcategoria, data, obb, valor):
       
        query = "INSERT INTO registros (observacao,data,valor,tipo,registro_idcategoria) VALUES (:obb, :data, :valor,:tipo, :idcategoria)"
        return await self.database.execute(query, {"idcategoria": idcategoria, "data":data, "obb":obb, "valor":valor, "tipo":tipo})

    async def select_categorias(self):
        query = "SELECT * from categorias"
        return await self.database.fetch_all(query)
    
    async def select_all(self, last_date, last_id):
        if last_date and last_id:
            query = """
                SELECT registros.idRegistro, registros.observacao, registros.data,
                    registros.valor, registros.tipo, categorias.descricao 
                FROM registros 
                JOIN categorias ON registro_idcategoria = idcategorias 
                WHERE (data, idRegistro) < (:last_date, :last_id)
                ORDER BY data DESC, idRegistro DESC
                LIMIT 10
            """
            return await self.database.fetch_all(query, {
                "last_date": last_date,
                "last_id": last_id
            })
        else:
            # Primeira carga - sem parâmetros de cursor
            query = """
                SELECT registros.idRegistro, registros.observacao, registros.data,
                    registros.valor, registros.tipo, categorias.descricao 
                FROM registros 
                JOIN categorias ON registro_idcategoria = idcategorias 
                ORDER BY data DESC, idRegistro DESC
                LIMIT 10
            """
            return await self.database.fetch_all(query)
    
    async def select_dados_by_categoria(self, mes):
        query = """SELECT SUM(registros.valor) as soma, categorias.descricao, categorias.tipo from registros join categorias on registro_idcategoria = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 GROUP BY categorias.descricao , categorias.tipo ORDER BY categorias.tipo"""
        return await self.database.fetch_all(query, {"mes": mes}) 
  

    async def select_dados_by_date(self, mes):
        query = """SELECT registros.data, SUM(registros.valor) as valor, registros.tipo,  GROUP_CONCAT(DISTINCT categorias.descricao SEPARATOR ', ') as descricao from registros 
       join categorias on registro_idcategoria = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 group by data, tipo ORDER BY data"""

        return await self.database.fetch_all(query,{"mes": mes}) 
    

    async def delete_registro(self, id):
        query = "DELETE FROM registros WHERE idRegistro = :id"
      
        
        return await self.database.execute(query,{"id": id}) 
    