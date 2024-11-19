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
    
    async def select_all(self):
        query = "select registros.idRegistro, registros.observacao , registros.data ,registros.valor, registros.tipo, categorias.descricao from registros join categorias on registro_idcategoria = idcategorias ORDER BY data DESC"
        return await self.database.fetch_all(query)
    
    
    async def select_dados_by_categoria(self, mes):
        query = """SELECT SUM(registros.valor) as soma, categorias.descricao, categorias.tipo from registros join categorias on registro_idcategoria = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 GROUP BY categorias.descricao , categorias.tipo"""
        return await self.database.fetch_all(query, {"mes": mes}) 
  

    async def select_dados_by_date(self, mes):
        query = "SELECT registros.idRegistro, registros.data, registros.valor, registros.tipo, categorias.descricao from registros join categorias on registro_idcategoria = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 ORDER BY data"
        return await self.database.fetch_all(query,{"mes": mes}) 
    

    async def delete_registro(self, id):
        query = "DELETE FROM registros WHERE idRegistro = :id"
      
        
        return await self.database.execute(query,{"id": id}) 
    