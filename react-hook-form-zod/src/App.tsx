import React from 'react';
import {z,ZodType} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './App.css'

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};


function App() {

  const schema: ZodType<FormData> = z
  .object({
 firstName:z.string().min(2).max(30),
 lastName:z.string().min(2).max(30),
 email:z.string().min(2).email(),
 age:z.number().min(18).max(26),
 password:z.string().min(2).max(20),
 confirmPassword:z.string().min(2).max(20),
  }).refine((data)=> data.password === data.confirmPassword,{
    message:"Password",
    path:["confirmPassword"]
  })

  const {register, handleSubmit , formState:{errors}} = useForm<FormData>({
    resolver:zodResolver(schema)
  });
  const submitData = (data:FormData) =>{
console.log(data);
  }

  return (
    <>
<div className='app'>
  <form className='form' onSubmit={handleSubmit(submitData)}>
    <label >First name:</label>
    <input type="text"{...register("firstName")} />
    {errors.firstName && <span>{errors.firstName.message}</span>}

    <label >Last name:</label>
    <input type="text" {...register("lastName")}/>
    {errors.lastName && <span>{errors.lastName.message}</span>}


    <label >Email:</label>
    <input type="email" {...register("email")} />
    {errors.email && <span>{errors.email.message}</span>}

{/* 
    <label >Phone number:</label>
    <input type="number" {...register("")} /> */}

    <label >Age:</label>
    <input type="number" {...register("age", {valueAsNumber:true})} />
    {errors.age && <span>{errors.age.message}</span>}


    <label >Password:</label>
    <input type="password" {...register("password")}/>
    {errors.password && <span>{errors.password.message}</span>}


    <label >Confirm Password:</label>
    <input type="password" {...register("confirmPassword")}/>
    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

<br />
    <input type="submit" value="submit" />
  </form>

</div>
    </>
  )
}

export default App
