import React, { useState, useEffect } from 'react'
import { getStats } from '../config/Myservice';


export default function Home() {
    const [totalInvoices, setTotalinvoices] = useState(0);
  
  
  useEffect(() => {
    let email="g@gmail.com";
    console.log(email)
    getStats(email)
    .then(res=>{
      if(res.data.err==0){
        // console.log(res.data.invoicedata.length)
        // console.log("Count invoice : " + res.data.invoicedata.length)
        setTotalinvoices(res.data.invoicedata)
      
      }
      if(res.data.err==1){
          console.log(res.data)
         
      }
  })
  let len = totalInvoices.length;
  let Invoiceno = localStorage.setItem("Invoiceno", len );
  console.log(totalInvoices[0])


}, [])

var amount =0;
var paid = 0;
var unpaid= 0;
var partiallypaid = 0;
for(let i=0;i<totalInvoices.length;i++)
{
    if(totalInvoices[i].invoicestatus === "unpaid")
    {
         amount += totalInvoices[i].invoiceamount
         unpaid += 1;
        
    }
    else if(totalInvoices[i].invoicestatus === "paid")
    {
         paid += 1;
        
    }
    else if(totalInvoices[i].invoicestatus === "partiallypaid")
    {
        amount += (totalInvoices[i].invoiceamount/2)
         partiallypaid += 1;
        
    }
}



   
    return (
        <div style={{ backgroundColor: "rgb(255, 248, 220)", position: 'fixed', marginTop: '0px', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
            <div style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "20%", textAlign: "center", backgroundColor: "white", width: "60%", borderRadius: "20px", opacity: "0.6" }}>
                <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "20px" }}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <h3>Total Invoice</h3>
                            <h1>{totalInvoices.length}</h1>
                        </div>
                        <div class="form-group col-md-6">
                            <h3>Amount remaining</h3>
                            <h1>{amount}</h1>
                        </div>
                    </div>
                    <br />
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <h3>Unpaid Invoice</h3>
                            <h1>{unpaid}</h1>
                        </div>
                        <div class="form-group col-md-4">
                        <h3>Paid Invoice</h3>
                            <h1>{paid}</h1>
                        </div>
                        <div class="form-group col-md-4">
                        <h3> Partially paid Invoice</h3>
                            <h1>{partiallypaid}</h1>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
