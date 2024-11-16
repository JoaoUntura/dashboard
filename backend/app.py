from fastapi import FastAPI, APIRouter, Depends, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from passlib.hash import bcrypt
from datetime import datetime
from banco import Banco

bd = Banco()
app = FastAPI()


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
    tipo:str

@app.on_event("startup")
async def startup():
    await bd.connect()

@app.on_event("shutdown")
async def shutdown():
    await bd.disconnect()

@app.post("/relatorio")
async def muscles(registro:Registro):
    print(registro)
    data_obj = datetime.strptime(registro.data, "%Y-%m-%dT%H:%M:%S.%fZ")
    data_mysql = data_obj.strftime("%Y-%m-%d")
    await bd.insert_registro(registro.tipo, registro.idcategoria, data_mysql , registro.obb, registro.valor)
    return "ok"


@app.post("/delete_registro")
async def delete_registro(newId:Id):
    await bd.delete_registro(newId.id, newId.tipo)
        
    return {"message": "Registro deletado com sucesso"}  
   


@app.get("/categorias")
async def categorias(request:Request):
    categorias_receita = await bd.select_categorias_receita()
    categorias_despesa = await bd.select_categorias_despesa()
    
    return {"categorias_receita":categorias_receita,"categorias_despesa": categorias_despesa}

@app.get("/transacoes")
async def transacoes(request:Request):
    receitas = await bd.select_receita()
    despesas = await bd.select_despesa()
    transacoes  = [*receitas, *despesas]
    transacoes.sort(key=lambda x: x['data'], reverse=True)
    
    return {"transacoes": transacoes}


@app.post("/dados_donut")
async def dados(mes_num:Mes):

    dados_despesa = await bd.select_despesa_by_categoria(mes_num.mes)
    dados_receita = await bd.select_receita_by_categoria(mes_num.mes)

    if not dados_despesa and not dados_receita:
        return  {"labels":['Sem Registros'], "dados":[1], "colors":['rgb(255, 255, 0)']}


    labels_despesa, nums_despesa, colors_despesa = [],[],[]
    for item in dados_despesa:
        labels_despesa.append(item['descricao'])
        nums_despesa.append(item['soma'])
        colors_despesa.append('rgb(255, 0, 0)')


    labels_receita, nums_receita, colors_receita = [],[],[]
    for item in dados_receita:
        labels_receita.append(item['descricao'])
        nums_receita.append(item['soma'])
        colors_receita.append('rgb(0, 128, 0)')


    labels = [*labels_despesa, *labels_receita]
    dados = [*nums_despesa, *nums_receita]
    colors = [*colors_despesa,*colors_receita]

    
    return {"labels":labels, "dados":dados, "colors":colors}

@app.post("/dados_line")
async def dados_line(mes_num:Mes):
    dados_receita = await bd.select_receita_by_date(mes_num.mes)
    dados_despesa = await bd.select_despesa_by_date(mes_num.mes)

    data_receita = []
    for receita in dados_receita:
        data_receita.append({'x':receita['data'].day,'y':receita['valor'], 'descricao':receita[ 'descricao'], 'data': receita['data']})


    data_despesa = []
    for despesa in dados_despesa:
        data_despesa.append({'x':despesa['data'].day,'y':despesa['valor'], 'descricao':despesa[ 'descricao'], 'data': despesa['data']})

    return {"data_despesa":data_despesa, "data_receita":data_receita}


