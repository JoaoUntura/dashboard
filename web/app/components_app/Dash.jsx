'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Dash(){
    const pathname = usePathname();
    const links = [{"href":"/", "name":"Home"}, {"href":"/graficos", "name":"Gráficos"}]


    return(
        <div className='bg-black flex flex-col items-center pt-10  shadow-lg shadow-slate-500 rounded-r-lg h-full w-56 fixed top-0 left-0'>
            {links.map(l => (
                <Link key={l.name} className={clsx("w-full h-12 rounded-r-lg pt-2 text-white pl-6 text-xl mb-10", {"bg-slate-500 bg-opacity-20":pathname === l.href},)} href= {l.href} >{l.name}</Link>
            ))}
        </div>
    )
}