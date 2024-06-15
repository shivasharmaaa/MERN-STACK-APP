import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import {Row,Col} from 'antd'
import { useDispatch } from 'react-redux'
import ItemList from '../components/ItemList'
const Homepage = () => {
 const [itemsData,setItemsData]=useState([])
 const[selectedCategory,setSelectedCategory]=useState('SNACKS')
 const categories=[
  {
    name:'SNACKS', /*'drinks' */
    imageUrl:'https://cdn-icons-png.flaticon.com/128/10647/10647760.png'
  },
  {
    name:'CONDIMENTS', /*'rice' */
    imageUrl: 'https://cdn-icons-png.flaticon.com/128/4727/4727213.png'
  },
  {
    name:'JOILETRIES', /*noodles */
    imageUrl:'https://cdn-icons-png.flaticon.com/128/2775/2775875.png'
  },
  {
    name:'BEVERAGES',
    imageUrl:'https://cdn-icons-png.flaticon.com/128/3165/3165589.png'
  },
  {
     name:'DAIRY',
     imageUrl:'https://cdn-icons-png.flaticon.com/128/3050/3050135.png'

  }
]
  const dispatch=useDispatch()
 //useeffect
 useEffect(()=>{
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
    console.log(error)  
    }
  }
  
  getAllItems()
 },[dispatch])
  return (
    <DefaultLayout>
      <div className='d-flex '>
        {categories.map(category=>(
          <div key={category.name} className={`d-flex category ${selectedCategory === category.name && "category-active"}`  }
          onClick={()=>setSelectedCategory(category.name)}>

       <h4>{category.name}</h4>
       <img src={category.imageUrl} alt={category.name} height='40' width='60'/>
          </div>
          
        ))}
      </div>
      <Row>
  {
    itemsData.filter(i=>i.category === selectedCategory).map(item =>(
      <Col xs={24} lg={6} md={12} sm={6}>
      <ItemList key={item.id} item={item}/>
      </Col>
      
    ))
  }
</Row>

    </DefaultLayout>
   
  )
}

export default Homepage
