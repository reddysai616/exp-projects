import React from 'react'
import { useForm } from 'react-hook-form'
let renderCount = 0 ;

type FormVales={
  username: string,
  email: string,
  channels: string,
}

const YtFrom = () => {
  const form= useForm <FormVales>();
  const {register , handleSubmit , formState:{errors}} = form
  renderCount++
  const showData = (data:FormVales) => {
    console.log(data)
  }
  return (
    <div>
      <h1>YouTube Form {renderCount/2}</h1>

      <form onSubmit={handleSubmit(showData)}>
        
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username", {
          required:{
            value:true,
            message:"Please enter valid username"
          }
        })} />
        <p className='error'>{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email"{...register("email" ,{
          required:{
            value:true,
            message: "Please enter your email address",
          }
        })} />
        <p className='error'>{errors.email?.message}</p>


        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel"{...register("channels",{
          required:{
            value:true,
            message: "Please enter a channel name",
          }
        })} />
        <p className='error'>{errors.channels?.message}</p>


        <button>Submit</button>
      </form>
    </div>
  )
}

export default YtFrom