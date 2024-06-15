import React,{useEffect} from 'react'
import { Button, Form, Input} from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

import { useDispatch } from 'react-redux'
const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=async(value)=>{
   console.log(value)
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      
     
     if(value.userId === 'shiva@gmail.com' && value.password === '123456' )
     {
      
      const res =   await axios.post('/api/users/login',value)
      dispatch({type:'HIDE_LOADING'})
      message.success(' Admin  login  Successfully')
      localStorage.setItem('authh',JSON.stringify(res.data))
      navigate('/bills')
     }
     else  {
      
       const res =   await axios.post('/api/users/login',value)
     dispatch({type:'HIDE_LOADING'})
     message.success('User login  Successfully')
     localStorage.setItem('auth',JSON.stringify(res.data))
     navigate('/')
     }
    
    } catch (error) 
    {
      dispatch({type:'HIDE_LOADING'})
      message.error('Invalid Username or Password')
    console.log(error)  
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('auth')){
      localStorage.getItem('auth')
      navigate('/')
    }
   
  },[navigate])

  useEffect(()=>{
    if(localStorage.getItem('auth')){
      localStorage.getItem('auth')
      navigate('/')
    }
   
  },[navigate])
  return (
    <body>
    <div className='login'>
        <div className='login-form'>
           <h1> LOGIN PAGE</h1>
           <Form layout='vertical' onFinish={handleSubmit}>
           <Form.Item name='userId'  >
             <Input  type='email' placeholder=' Enter UserId' /> 
           </Form.Item>
           <Form.Item name='password'>
             <Input type='password' placeholder=' Enter Password' /> 
           </Form.Item>
 <div className='d-flex justify-content-between'>
    <p>
       not a user Please &nbsp;
        <Link to='/register' >Register Here !</Link>
    </p> 
   <Button type='primary' htmlType='submit'>LOGIN</Button>
 </div>
  </Form>
    </div>
    </div> 
   
    </body>
  )
}

export default Login