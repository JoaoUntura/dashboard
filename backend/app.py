from fastapi import FastAPI, Depends, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime
from banco import Banco
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database connection pool
    await bd.database.connect()
    yield
    # Cleanup
    await bd.database.disconnect()



bd = Banco()
app = FastAPI(lifespan=lifespan)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
origins = [
    "http://localhost:3000",  # Adicione a origem do seu aplicativo, se necessário
    "http://127.0.0.1:3000",
    "http://192.168.3.11:8000",
    "http://192.168.3.3:8000",  # Ex: http://192.168.1.x:8000
    "*",  # Permite todas as origens (não recomendado para produção)
]
# Configurações de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Substitua pela URL do seu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

class Registro(BaseModel):
    tipo:str
    idcategoria:int
    data:str
    obb:str
    valor:str

class Mes(BaseModel):
    mes:int

class Id(BaseModel):
    id:int
  

@app.post("/relatorio")
async def relatorio(registro:Registro):
 
    data_obj = datetime.strptime(registro.data, "%Y-%m-%dT%H:%M:%S.%fZ")
    data_mysql = data_obj.strftime("%Y-%m-%d")
    await bd.insert_registro(registro.tipo, registro.idcategoria, data_mysql , registro.obb, registro.valor)
    return "ok"


@app.post("/delete_registro")
async def delete_registro(newId:Id):
    await bd.delete_registro(newId.id)
        
    return {"message": "Registro deletado com sucesso"}  
   


@app.get("/categorias")
async def categorias(request:Request):
    categorias = await bd.select_categorias()
    
    
    return {"categorias":categorias}

@app.get("/transacoes")
async def transacoes(request:Request):

    transacoes  = await bd.select_all()

    return {"transacoes": transacoes}


@app.post("/dados_donut")
async def dados_donut(mes_num:Mes):

    labels, dados, colors= [],[],[]
    dados_by_categoria = await bd.select_dados_by_categoria(mes_num.mes)
    if not dados_by_categoria:
        return  {"labels":['Sem Registros'], "dados":[1], "colors":['rgb(255, 255, 0)']}

    else:
        for d in dados_by_categoria:
            labels.append(d['descricao'])
            dados.append(d['soma'])
            if d['tipo'] == 'Despesa':
                colors.append('rgb(255, 0, 0)')
            elif d['tipo'] == 'Receita':
                colors.append('rgb(0, 128, 0)')
        return {"labels": labels, "dados":dados, "colors":colors}
   

@app.post("/dados_line")
async def dados_line(mes_num:Mes):
    dados = await bd.select_dados_by_date(mes_num.mes)

    data_receita, data_despesa = [], []
    for d in dados:
        if d['tipo'] == 'Receita':
            data_receita.append({'x':d['data'].day,'y':d['valor'], 'descricao':d[ 'descricao'], 'data': d['data']})
        elif d['tipo'] == 'Despesa':
            data_despesa.append({'x':d['data'].day,'y':d['valor'], 'descricao':d[ 'descricao'], 'data': d['data']})

    return {"data_despesa":data_despesa, "data_receita":data_receita}


