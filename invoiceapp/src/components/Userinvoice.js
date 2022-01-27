import React, { useState, useEffect } from 'react'
import { getStats } from '../config/Myservice';
import { getProduct } from '../config/Myservice';
import { addStatus } from '../config/Myservice';


export default function Userinvoice() {
    const [status, setStatus] = useState();
    const [update, setUpdate] = useState();
    const [edit, setEdit] = useState(true);
    const [invno, setInvno] = useState();
    const [invoices, setInvoices] = useState([]);
    const [product, setProduct] = useState([]);
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        let email = "g@gmail.com";
        console.log(email)
        getStats(email)
            .then(res => {
                if (res.data.err == 0) {
                    setInvoices(res.data.invoicedata)
                    setFlag(true)



                }
                if (res.data.err == 1) {
                    console.log(res.data)

                }
            })

        getProduct(email)
            .then(res => {
                if (res.data.err == 0) {
                    setProduct(res.data.productdata)

                }
                if (res.data.err == 1) {
                    console.log(res.data)

                }
            })

    }, [])

    const changeStatus=(elem)=>{
        //  alert(elem.email + " " + elem.invoiceno)
         setEdit(false)
         setUpdate(true)
         setInvno(elem.invoiceno)
        
    }

    const updateStatus=(elem)=>{
         setEdit(true)
         setUpdate(false)
         let data={
            status: status,
            email: elem.email,
            invoiceno: elem.invoiceno
         }
         addStatus(data)
   }

   const deleteInvoice=(elem)=>{
    alert(elem.email + " " + elem.invoiceno)
   }

    return (
        <div >
            <h2>All your Invoices</h2>

            {/* {flag !== true ? " data not aviable" :
<table className="table table-striped">
                    <tbody>
                    {
                        invoices.map((elem, ind) => {
                            return (
                                <div>
                                    <tr>
                                    <tr key={ind}>
                                        <th>Invoice Number</th>
                                        <td>{elem.invoiceno}</td>

                                    </tr>
                                    <tr>
                                        <th>Invoice Ampunt</th>
                                        <td>{elem.invoiceamount}</td>
                                        <th>Invoice Status</th>
                                        <td>{elem.invoicestatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Sender Name</th>
                                        <td>{elem.sendername}</td>
                                        <th>Receiever Name</th>
                                        <td>{elem.receivername}</td>
                                    </tr>
                                    <tr>
                                        <th>Sender add</th>
                                        <td>{elem.senderadd}</td>
                                        <th>Receiever add</th>
                                        <td>{elem.receiveradd}</td>
                                    </tr>
                                    <tr>
                                        <th>Invoice Date</th>
                                        <td>{elem.invoicedate}</td>
                                        <th>Due Date</th>
                                        <td>{elem.duedate}</td>
                                    </tr>
                                    </tr>
                                    <tr>Product List</tr>
                                    <tr>
                                  

                                        {
                                            product.map((item, ind) => {
                                                if (item.invoiceno == elem.invoiceno) {
                                                    return (
                                                        <tr>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                                <th>Discount</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                            <tr>
                                                            <td>{item.title}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.discount}</td>
                                                            <td>{item.amount}</td>
                                                            </tr>
                                                            
                                                        </tr>
                                                      
                                                    )
                                                }
                                            })
                                        }

                                    </tr>


                                    <br />
                                </div>

                            )
                        })
                    }
                </tbody>
                </table>


            } */}


            {flag !== true ? " data not aviable" :
                <div >

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Invoice Number</th>
                                <th scope="col">Invoice Amount</th>
                                <th scope="col">Invoice Status</th>
                                <th scope="col">Receiver Name</th>
                                <th scope="col">Receiver Address</th>
                                <th scope="col">Invoice Date</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Product</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoices.map((elem, ind) => {
                                    return (
                                        <tr>      <td>{elem.invoiceno}</td>
                                            <td>{elem.invoiceamount}</td>
                                            {(update === true && invno === elem.invoiceno) ?
                                             <td>  <input placeholder="status" type="text" onChange={(e)=>setStatus(e.target.value)}   class="form-control"/></td>
                                             : 
                                             <td>{elem.invoicestatus}</td>
                                             }
                                            
                                            <td>{elem.receivername}</td>
                                            <td>{elem.receiveradd}</td>
                                            <td>{elem.invoicedate}</td>
                                            <td>{elem.duedate}</td>
                                            <td><a href="#">product</a></td>
                                            <td>
                                                {(edit === true )? 
                                                <button onClick={()=>changeStatus(elem)} className='btn btn-success'>edit</button>
                                                 :    <button onClick={()=>updateStatus(elem)} className='btn btn-success'>Update</button>}
                                                 &nbsp;<button onClick={()=>deleteInvoice(elem)} className='btn btn-danger'>delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>}
        </div>
    )
}
