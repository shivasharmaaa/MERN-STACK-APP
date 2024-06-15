
import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { Button, Form, Input, Modal, Table,Select,message } from 'antd'
import Admin from './../components/Admin';

const Itempage = () => {
  const dispatch=useDispatch()
  const[itemsData,setItemsData]=useState([])
  const [popupModal,setPopupModal]=useState(false)
  const[editItem,setEditItem]=useState(null)
  const getAllItems=async ()=>{
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const {data}=await axios.get('/api/items/get-item')
      setItemsData(data)
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
   
    getAllItems()
   },[])
   //hanmdle delete
   const handleDelete=async(record)=>{
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
     
       await axios.post('/api/items/delete-item',{itemId:record._id})
      message.success('Item Deleted Successfully')
      getAllItems();
      setPopupModal(false);
     dispatch({type:'HIDE_LOADING'})
  
    } catch (error) 
    {
      dispatch({type:'HIDE_LOADING'})
      message.error('Something Went Wrong')
    console.log(error)  
    }
   }
   //Table data
   const columns =[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',render:(image,record)=><img src={image} alt={record.name} height='60' width='60'/>},
    {title:'Price',dataIndex:'price'},
    {title:'Actions',dataIndex:'_id',
    render:(id,record)=>
    <div>
      
      <EditOutlined style={{cursor:'pointer'}}
      onClick={()=>{
        setEditItem(record)
        setPopupModal(true)
      }}/>
    
     
      <DeleteOutlined style={{cursor:'pointer'}} 
      onClick={()=>{
        handleDelete(record)
      }} />
  
    </div>
  }

]
//submit handle
const handleSubmit= async(value)=>{
  if(editItem === null){
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
     
      const res = await axios.post('/api/items/add-item',value)
      message.success('Item Added Successfully')
      getAllItems();
      setPopupModal(false);
     dispatch({type:'HIDE_LOADING'})
  
    } catch (error) 
    {
      dispatch({type:'HIDE_LOADING'})
      message.error('Something Went Wrong')
    console.log(error)  
    }
  }else{
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
     
      await axios.put('/api/items/edit-item',value)
      await axios.put('/api/items/edit-item' ,{...value,itemId:editItem._id})
      message.success('Item Updated Successfully')
      getAllItems();
      setPopupModal(false);
     dispatch({type:'HIDE_LOADING'})
  
    } catch (error) 
    {
      dispatch({type:'HIDE_LOADING'})
      message.error('Something Went Wrong')
    console.log(error)  
    }
  }
 
}
  return (
    <Admin>
<div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button type='primary' onClick={()=>setPopupModal(true)}>Add New Item</Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered/>
       {
        popupModal && (
          <Modal title={`${editItem !== null ? 'Edit Item ':'Add New Item'}`} open={popupModal}  onCancel={()=>
          {
            setEditItem(null)
            setPopupModal(false)
          
          }} footer={false}>
          <Form layout='vertical'
          initialValues={editItem} 
          onFinish={handleSubmit}>
           <Form.Item name='name' label="Name">
             <Input/>
           </Form.Item>
           <Form.Item name='price' label="Price">
             <Input/>
           </Form.Item>
           <Form.Item name='image' label="Image URL">
             <Input/>
           </Form.Item>
          
           <Form.Item name='category' label='Category'>
           <Select>
             <Select.Option value="SNACKS">SNACKS</Select.Option>
             <Select.Option value="CONDIMENTS">CONDIMENTS</Select.Option>
             <Select.Option value="JOILETRIES">JOILETRIES</Select.Option>
             <Select.Option value="BEVERAGES">BEVERAGES</Select.Option>
             <Select.Option value="DAIRY">DAIRY</Select.Option>
           </Select>
           </Form.Item>
           
 <div className='d-flex justify-content-end'>
   <Button type='primary' htmlType='submit'>SAVE</Button>
 </div>
 
          </Form>
         </Modal>
        )
       }
    </Admin>
  )
}

export default Itempage