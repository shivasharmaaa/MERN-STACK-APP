import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Layout} from "antd";
import { NavLink,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";


const {  Content } = Layout;

const  DefaultLayout =({children})=> {
  const navigate=useNavigate()
  const {cartItems,loading}=useSelector(state=>state.rootReducer)
  


//get localstorage data
useEffect(()=>{
  localStorage.setItem('cartItems',JSON.stringify(cartItems))
},[cartItems])
    return (
      <Layout >
        {loading && <Spinner/>}
        
        <Layout className="site-layout ">
        
      <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link  to='/' className="navbar-brand" > 🛒  EShop</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to='/'  className="nav-link active" aria-current="page" href="#">Home</NavLink>
        </li>
          
       {/* <li className="nav-item">
          <NavLink  to='/bills' className="nav-link" href="#">Bills</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/items'className="nav-link" href="#">Items</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/customer'className="nav-link" href="#">Customers</NavLink>
    </li>*/}
        <li className="nav-item">
          <NavLink to='/login'className="nav-link" href="#" onClick={()=>{
              
              localStorage.removeItem('auth');
              navigate('/login')
            }}>Register</NavLink>
          </li>
          
           
        <li className="nav-item">
          <NavLink to='/cart'className="nav-link" href="#">Cart ({cartItems.length})</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className='banner'>
  </div>
          
          <Content
            className="site-layout-background cont "
            style={{
               
              padding: '20px',
              minheight:'240pxpx'
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }

export default DefaultLayout
