'use client';
import { useEffect,useState } from 'react'; import { api } from '../../lib/api';
export default function(){const[s,setS]=useState(null); const token=typeof window!=='undefined'?localStorage.getItem('token'):'';
useEffect(()=>{if(token) api.get('/super-admin-portal-123/stats',{headers:{Authorization:`Bearer ${token}`}}).then(r=>setS(r.data));},[token]);
return <main className='container card'><h1>Panou Admin (Ascuns)</h1>{s && <pre>{JSON.stringify(s,null,2)}</pre>}</main>}
