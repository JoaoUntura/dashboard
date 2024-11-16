from databases import Database

class Banco:
    def __init__(self):
        self.database = Database("mysql://root:221203@localhost/sistema_next")

    async def connect(self):
        await self.database.connect()

    async def disconnect(self):
        await self.database.disconnect()

    async def insert_registro(self, tipo,idcategoria, data, obb, valor):
        if tipo == 'Receita':
            query = "INSERT INTO receita (observacao,data,valor,categorias_receita_idcategorias) VALUES (:obb, :data, :valor, :idcategoria)"
        elif tipo =='Despesa':
            query = "INSERT INTO despesa (observacao,data,valor,categorias_despesa_idcategorias) VALUES (:obb, :data, :valor, :idcategoria)"
        
        await self.database.execute(query, {"idcategoria": idcategoria, "data":data, "obb":obb, "valor":valor})

    async def select_categorias_receita(self):
        query = "SELECT * from categorias_receita"
        return await self.database.fetch_all(query)
    
    async def select_categorias_despesa(self):
        query = "SELECT * from categorias_despesa"
        return await self.database.fetch_all(query)
    
    async def select_despesa(self):
        query = "select idDespesa,observacao,data,valor, descricao from despesa join categorias_despesa on categorias_despesa_idcategorias = idcategorias ORDER BY data DESC"
        return await self.database.fetch_all(query)
    
    async def select_receita(self):
        query = "select idReceita,observacao,data,valor, descricao from receita join categorias_receita on categorias_receita_idcategorias = idcategorias ORDER BY data DESC"
        return await self.database.fetch_all(query)
    
    async def select_despesa_by_categoria(self, mes):
        query = "SELECT SUM(valor) as soma, descricao from despesa join categorias_despesa on categorias_despesa_idcategorias = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 GROUP BY descricao ;"
        return await self.database.fetch_all(query, {"mes": mes}) 
  
    async def select_receita_by_categoria(self, mes):
        query = "SELECT SUM(valor) as soma, descricao from receita join categorias_receita on categorias_receita_idcategorias = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 GROUP BY descricao  ;"
        return await self.database.fetch_all(query, {"mes": mes})

    async def select_despesa_by_date(self, mes):
        query = "SELECT idDespesa, data, valor, descricao from despesa join categorias_despesa on categorias_despesa_idcategorias = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 ORDER BY data"
        return await self.database.fetch_all(query,{"mes": mes}) 
    
    async def select_receita_by_date(self, mes):
        query = "SELECT idReceita, data, valor , descricao from receita join categorias_receita on categorias_receita_idcategorias = idcategorias WHERE MONTH(data) = :mes AND YEAR(data) = 2024 ORDER BY data"
        return await self.database.fetch_all(query,{"mes": mes}) 
    
    async def delete_registro(self, id,tipo):
        if tipo == "Receita":
            query = "DELETE FROM receita WHERE idReceita = :id"
        else:
            query = "DELETE FROM despesa WHERE idDespesa = :id"
        
        return await self.database.execute(query,{"id": id}) 
    