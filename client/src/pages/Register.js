import { Button, Form, Input } from 'antd'
import  React,{useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const handleSubmit=async(value)=>{
      console.log(value)
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
       
        await axios.post('/api/users/register',value)
        message.success('Register Successfully')
       navigate('/login')
       dispatch({type:'HIDE_LOADING'})
    
      } catch (error) 
      {
        dispatch({type:'HIDE_LOADING'})
        message.error('Something Went Wrong')
      console.log(error)  
      }
    }
    useEffect(()=>{
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth')
        navigate('/')
      }
    },[navigate])
  return (
    <>
    <div className='register'>
        <div className='register-form'>
           <h1>REGISTER PAGE</h1>
           <Form layout='vertical'
          
          onFinish={handleSubmit}>
           <Form.Item name='name' >
             <Input  placeholder=' Enter UserName'/> 
         
           </Form.Item>
           
           <Form.Item name='userId' >
             <Input placeholder=' Enter UserId'/> 
           </Form.Item>
           <Form.Item name='password' >
             <Input type='password' placeholder=' Enter Password'/> 
           </Form.Item>
          
          
           
 <div className='d-flex justify-content-between'>
    <p>
        Already Register Please &nbsp;
        <Link to='/login' >Login Here !</Link>
    </p> 
   <Button type='primary' htmlType='submit'>REGISTER</Button>
 </div>
 
          </Form>
    </div>
    </div>
    </>
  )
}

export default Register


/*import { Button, Form, Input } from 'antd'
import React,{useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const handleSubmit=async(values)=>{
      console.log(values)
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
       
        await axios.post('api/users/register',values)
        message.success('Register Successfully')
       navigate('/login')
       dispatch({type:'HIDE_LOADING'})
    
      } catch (error) 
      {
        dispatch({type:'HIDE_LOADING'})
        message.error('Something Went Wrong')
      console.log(error)  
      }
    }
    useEffect(()=>{
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth')
        navigate('/')
      }
    },[navigate])
  return (
    <>
    <div className='register'>
        <div className='register-form'>
           <h1>Register Page</h1>
           <Form layout='vertical'
          
          onFinish={handleSubmit}>
         
          <Form.Item name='name' >
          <Input placeholder=' Enter UserName'/> <i class='bx bxs-user'></i>
        </Form.Item>
        <Form.Item name='userId' >
          <Input placeholder=' Enter UserId'/> <i class='bx bxs-id-card'></i>
        </Form.Item>
        <Form.Item name='password' >
          <Input type='password' placeholder=' Enter Password'/> <i class='bx bxs-lock-alt'></i>
        </Form.Item>
          
           
 <div className='d-flex justify-content-between'>
    <p>
        Already Register Please &nbsp;
        <Link to='/login' >Login Here !</Link>
    </p> 
   <Button type='primary' htmlType='submit'>REGISTER</Button>
 </div>
 
          </Form>
    </div>
    </div>
    </>
  )
}

export default Register*/