'use client';
import { useState } from 'react'; import { api } from '../../lib/api'; import { useRouter } from 'next/navigation';
export default function(){const r=useRouter();const[f,setF]=useState({email:'',parola:''});
return <main className='container card'><h1>Login</h1><input placeholder='Email' onChange={e=>setF({...f,email:e.target.value})}/><input type='password' placeholder='Parolă' onChange={e=>setF({...f,parola:e.target.value})}/><button className='btn' onClick={async()=>{const {data}=await api.post('/auth/login',f);localStorage.setItem('token',data.accessToken);r.push('/dashboard')}}>Intră în cont</button></main>}
