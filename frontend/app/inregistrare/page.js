'use client';
import { useState } from 'react'; import { api } from '../../lib/api';
export default function(){const[f,setF]=useState({nume:'',email:'',parola:''}); const[msg,setMsg]=useState('');
return <main className='container card'><h1>Înregistrare</h1><input placeholder='Nume' onChange={e=>setF({...f,nume:e.target.value})}/><input placeholder='Email' onChange={e=>setF({...f,email:e.target.value})}/><input placeholder='Parolă' type='password' onChange={e=>setF({...f,parola:e.target.value})}/><button className='btn' onClick={async()=>{await api.post('/auth/register',f);setMsg('Cont creat!')}}>Creează cont</button><p>{msg}</p></main>}
