
import Main from './components_app/Main.jsx'
import { Suspense } from 'react';
import getTransacoes from './func/transacoes.jsx'
import getCategorias from './func/categorias.jsx';


export default async function Home() {
    const {categoria_receita,categoria_despesa} = await getCategorias();
    const transacoes = await getTransacoes();
    
    
return(
    <Suspense fallback={<p>Loading feed...</p>}>
    <Main categoria_receita={categoria_receita} categoria_despesa={categoria_despesa} transacoes={transacoes}></Main>
    </Suspense>
)

  
}

