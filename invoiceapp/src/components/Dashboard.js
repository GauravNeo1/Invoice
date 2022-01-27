import React, { useState, useEffect } from 'react'
import { Outlet, Link} from 'react-router-dom';
import { getStats } from '../config/Myservice';



export default function Dashboard() {
  const [totalInvoices, setTotalinvoices] = useState(0);
  useEffect(() => {
    let email="g@gmail.com";
    console.log(email)
    getStats(email)
    .then(res=>{
      if(res.data.err==0){
        console.log(res.data.invoicedata)
        // console.log("Count invoice : " + res.data.invoicedata.length)
        setTotalinvoices(res.data.invoicedata.length)
     
      
      }
      if(res.data.err==1){
          console.log(res.data)
         
      }
  })

}, [])




  return (

    <div>
      <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <a class="navbar-brand" href="#">INVOICE App</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-3">
    <li class="nav-item active">
      <Link class="nav-link" to="/dashboard/Home">Home </Link>
      </li>
      <li class="nav-item active">
      <Link class="nav-link" to="/dashboard/newinvoice">Create Invoice </Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to="/dashboard/settinginvoice">Setting</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to="/dashboard/userinvoice">Your Invoice's </Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to="/dashboard/confirminvoice">Confirm Invoice </Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      
      <button  class="btn btn-outline-danger my-2 my-sm-0 mr-3" > <Link  to="/signin">Logout</Link></button>
    </form>
  </div>
</nav>
</div>

      {/* Dashboard
     <br />
     Total Invoices :  {
        totalInvoices
      } */}
      <div>
      
        <br />
        <br />
        <Outlet />
      </div>

    </div>

  )
}
