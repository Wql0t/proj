'use client';
import {useState} from 'react';
import {api} from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPasword]=useState(''); 
    const  router = useRouter();
    const sumbit = async()=>{
        const res = await api.post('/auth/register',{email,password});
        saveToken(res.data.access_token);
        router.push('/profile')
        console.log("Успешно")
    } ;
    return(
        <div className='logincard'>
            <h2 className='c'>Регистрация</h2>
            <div className='c'><input className='b' placeholder="email" onChange={e=>setEmail(e.target.value)}/></div>
            <div className='c'><input className='b' type="password" placeholder="password" onChange={e=>setPasword(e.target.value)} /></div>
           <div className='c'> <button className="btn" onClick={sumbit}>Подтвердить</button></div>
        </div>
        
    );
    };

