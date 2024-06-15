import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Itempage from './pages/Itempage';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';
function App() {
  return (
    < >
    <BrowserRouter>
    <Routes>
      <Route path='/' element={

 <Homepage/>

      }/>
      <Route path='/items' element={
     <PrivateRoute>
       <Itempage/>
     </PrivateRoute>
      }/>
      <Route path='/cart' element={
      <ProtectedRoute>
        <CartPage/>
      </ProtectedRoute>
      }/>
      <Route path='/bills' element={
      <PrivateRoute>
        <BillsPage/>
      </PrivateRoute>
      }/>
      <Route path='/customer' element={
      <PrivateRoute>
        <CustomerPage/>
      </PrivateRoute>
      }/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
         
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth'))
  {
    return children;
  }else{
    return  <Navigate to='/login'/>
  }
}
export function PrivateRoute({children}){
  if(localStorage.getItem('authh'))
  {
    return children;
  }else{
    return  <Navigate to='/login'/>
  }
}