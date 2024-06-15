import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import { Table } from 'antd'
import Admin from './../components/Admin';
const CustomerPage = () => {
  const[billsData,setBillsData]=useState([])
  const dispatch=useDispatch()
  const getAllBills=async ()=>{
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const {data}=await axios.get('/api/bills/get-bills')
      setBillsData(data)
     dispatch({type:'HIDE_LOADING'})
      console.log(data)
    } catch (error) 
    {
      dispatch({type:'HIDE_LOADING'})
    console.log(error)  
    }
  }
  //use effect
  useEffect(()=>{
   
    getAllBills()
   },[])

   const columns =[
    {title:'Id',dataIndex:'_id'},
    {title:'Customer Name',dataIndex:'customername'},
    {title:'Contact Number',dataIndex:'customernumber'},
   

]
  return (
    <Admin>
      <h1>Customer Page</h1>
      <Table columns={columns} dataSource={billsData} bordered/>
      </Admin>
  )
}

export default CustomerPage