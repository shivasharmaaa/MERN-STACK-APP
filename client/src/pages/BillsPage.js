import React,{useRef} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {EyeOutlined} from '@ant-design/icons'
import {  Button, Modal, Table} from 'antd'
import "../styles/Invoicestyle.css"
import Admin from '../components/Admin'

const BillsPage = () => {
  const componentRef=useRef();
    const dispatch=useDispatch()
    const[billsData,setBillsData]=useState([])
    const [popupModal,setPopupModal]=useState(false)
    const[selectedBill,setSelectedBill]=useState(null)
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
     //print invoice
     const handlePrint=useReactToPrint({
      content:()=>componentRef.current,
     })
 
     //Table data
     const columns =[
      {title:'Id',dataIndex:'_id'},
      {title:'Customer Name',dataIndex:'customername'},
      {title:'Contact Number',dataIndex:'customernumber'},
      {title:'Sub Total',dataIndex:'subTotal'},
      {title:'Total Amount',dataIndex:'totalAmount'},
      {title:'Tax',dataIndex:'tax'},
      {title:'Actions',dataIndex:'_id',
      render:(id,record)=>
      <div>
       <EyeOutlined style={{cursor:'pointer'}}
       onClick={()=>{
        setSelectedBill(record)
       setPopupModal(true)
       }}
       />
    
      </div>
    }
  
  ]

 
   
  
  return (
    <Admin>
    <div className='d-flex justify-content-between'>
        <h1>Invoice List</h1>
        </div>
        <Table columns={columns} dataSource={billsData} bordered/>
       {
        popupModal && (
          <Modal title='Invoice Details' open={popupModal} onCancel={()=>
          {
            setPopupModal(false)
          
          }} footer={false}>
            {/*invoice modal */}
            <div id='invoice-Store' ref={componentRef}>
              <center id='top'>
                <div className='logo'/>

                  <div className='info'>
                    <h2>Shiva Store</h2>
                    <p>contact : 1234567890 | Mumbai maharashtra</p>
                  
                </div>
                {/*end info */}
              </center>
              {/*end invoice top */}
              <div id='mid'>
                <div className='mt-2'>
                  <p>
                    Customer Name : <b>{selectedBill.customername}</b> <br/>
                    Phone No : <b>{selectedBill.customernumber}</b> <br/>
                    Date : <b> {selectedBill.date.toString().substring(0,10)}</b>
                  </p>
                  <hr style={{margin:"5px"}}/>
                </div>
              </div>
              {/*end invoice mid */}
              <div id='bot'>
                <div id='table'>
                  <table>
                    <tbody>
                      <tr className='tablettitle'>
                        <td className='item'>
                          <h2>Item</h2>
                        </td>
                        <td className='item'>
                          <h2>Qty</h2>
                        </td>
                        <td className='item'>
                          <h2>Price</h2>
                        </td>
                        <td className='item'>
                          <h2>Total</h2>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item)=>(
                        <>
                   <tr className='service'>
                    <td className='tabletitem'>
                      <p className='itemtext'>{item.name}</p>
                      
                    </td>
                    <td className='tabletitem'>
                      <p className='itemtext'>{item.quantity}</p>
                      
                    </td>
                    <td className='tabletitem'>
                      <p className='itemtext'>{item.price}</p>
                      
                    </td>
                    <td className='tabletitem'>
                      <p className='itemtext'>{item.quantity * item.price}</p>
                      
                    </td>

                   </tr>
                        </>
                      ))}
                      <tr className='tablettitle'>
                        <td/>
                        <td/>
                        <td className='Rate'>
                          <h2>tax</h2>
                        </td>
                        <td className='payment'>
                          <h2>${selectedBill.tax}</h2>
                        </td>
                      </tr>
                      <tr className='tablettitle'>
                        <td/>
                        <td/>
                        <td className='Rate'>
                          <h2>Grand Total</h2>
                        </td>
                        <td className='payment'>
                          <h2>
                            <b>{selectedBill.totalAmount}</b>
                          </h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/**end table*/}
                <div id='legalcopy'>
                  <p className='legal'>
                    <strong>
                      Thnak you for your order ! </strong> 10% GST application 
                    on total amount.Please note that this is not refundable amount 
                    for any persisatence please write Email <b> help@helpcenter.com</b>
                    
                  </p>
                </div>
              </div>
              {/**end invoice bot */}

            </div>
            {/**end invoice */}
<div className='d-flex justify-content-end'>
  <Button type='primary' onClick={handlePrint}>
Print
  </Button>
</div>



{/** end of invoice modal */}
         </Modal>
        )
       }  
    </Admin>
  )
}

export default BillsPage
