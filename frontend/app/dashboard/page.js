'use client';
import { useEffect,useState } from 'react'; import { api } from '../../lib/api';
export default function(){const[list,setList]=useState([]); const [titlu,setTitlu]=useState('');
const token=typeof window!=='undefined'?localStorage.getItem('token'):'';
useEffect(()=>{if(token) api.get('/invitatii/mine',{headers:{Authorization:`Bearer ${token}`}}).then(r=>setList(r.data));},[token]);
return <main className='container'><h1>Dashboard client</h1><div className='card'><input placeholder='Titlu eveniment' onChange={e=>setTitlu(e.target.value)}/><button className='btn' onClick={async()=>{await api.post('/invitatii',{titlu},{headers:{Authorization:`Bearer ${token}`}});location.reload();}}>Creează invitație</button></div>{list.map(i=><div className='card' key={i._id}><h3>{i.titlu}</h3><a href={`/invitatie/${i.slug}`}>Preview live</a></div>)}<a className='btn' href='#' onClick={async()=>{const {data}=await api.post('/plati/checkout',{}, {headers:{Authorization:`Bearer ${token}`}});window.location=data.url;}}>Upgrade Premium</a></main>}
