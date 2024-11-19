
import Main from './components_app/Main.jsx'
import { Suspense } from 'react';
import getTransacoes from './func/transacoes.jsx'
import getCategorias from './func/categorias.jsx';


export default async function Home() {
    const categorias = await getCategorias();
    const transacoes = await getTransacoes();
    
    
return(
    <Suspense fallback={<p>Loading feed...</p>}>
    <Main categorias={categorias} transacoes={transacoes}></Main>
    </Suspense>
)

  
}

