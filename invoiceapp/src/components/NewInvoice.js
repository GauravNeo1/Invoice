import React, {useState, useEffect} from 'react'
import { getSenderData } from '../config/Myservice';
import { useSelector, useDispatch } from 'react-redux'



export default function NewInvoice() {
  
    const loginEmail = useSelector((state) => state.loginEmail);
   
    const [invoiceno, setInvoiceno] = useState(7);

    // let LoginUser = localStorage.getItem('LoginUser')
    // LoginUser = JSON.parse(LoginUser);
   

    // let Invoiceno = localStorage.getItem('Invoiceno')
    // Invoiceno = JSON.parse(Invoiceno);

   
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    
  
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [discount, setDsicount] = useState();
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState();
    const [totalamount, setTotalamount] = useState(0);

    const [receivername, setReceivername] = useState();
    const [receiveradd, setReceiveradd] = useState();

    // const [invoicedate, setInvoicedate] = useState();
   
    const [duedate, setDuedate] = useState();

    const [postdata, setPostdata] = useState();


    useEffect(() => {
        getSenderData("g@gmail.com")
            .then(res => {
                console.log(res.data);
                setPostdata(res.data.loginuser);
              
            })
    }, [])


   
   

  
//    console.log(postdata.email)
    // To add items
    const addItem = (e) => {
        e.preventDefault();
       
        if (!title) {

        } else {
            let tempamount = ((parseInt(price) - ((parseInt(price) * parseInt(discount))/100)) * parseInt(quantity));
            let temptotalamount = totalamount + tempamount;
            setTotalamount(temptotalamount)
            setItems([...items, {invoice:invoiceno, email:postdata.email, title:title, quantity:quantity, price:price, discount:discount, amount:tempamount}]);
            setTitle('');
            setQuantity('');
            setPrice('');
            setDsicount('');
        }
    }

    const deleteItem = (id) => {
        const updateItem = items.filter((elem, ind) => {
            return ind !== id;
        });
        setItems(updateItem);
    }


    const finalsubmit=(e)=>{
        e.preventDefault();
        if(!items  || !receiveradd || !receivername){
            alert("plz fiel")
        }
        else{

            let formData={
                invoiceno : invoiceno,
                invoicestatus : "unpaid",
                senderlogo: postdata.orglogo,
                senderemail: postdata.email,
                sendername: postdata.orgname,
                senderadd: postdata.orgaddress,
                receivername: receivername,
                receiveradd: receiveradd,
                invoicedate: date,
                duedate: duedate,
                invoiceamount:totalamount
            }
            console.log(formData)
            let formArr = [];
            let data = localStorage.getItem('InvoiceData')
            data = JSON.parse(data);
            console.log("InvoiceData", data);
            if (data !== null) {
                formArr = [...data];
            }
    
            formArr.push(formData);
            let loginData = localStorage.setItem("InvoiceData", JSON.stringify(formArr));
            let product = localStorage.setItem("InvoiceProduct", JSON.stringify(items));
            console.log("Data", loginData);
            console.log("items", product);
        }
        window.location.href="./confirminvoice";
    }
    return (
        <div class="form-row">
        <div class="form-group col-md-5">
        <div style={{ backgroundColor:"rgb(255, 248, 220)",position: 'fixed', marginTop:'0px',backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
           <div  style={{marginTop:"20px", marginBottom:"50px", marginLeft:"3%", textAlign:"center", backgroundColor: "white", width:"38%", borderRadius: "20px", opacity:"0.8"}}>
                <div style={{paddingTop:"10px" , paddingBottom:"15px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue",borderRadius: "20px"}}>
                    <h5>Fill data</h5>
            <form>
            <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Receiver_Name</label>
                       <div class="col-sm-8">
                       <input placeholder="enter receiver name" type="text" value={receivername} onChange={(e) => setReceivername(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Receiver_Address</label>
                       <div class="col-sm-8">
                       <input placeholder="enter receiver address" type="text" value={receiveradd} onChange={(e) => setReceiveradd(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Due Date</label>
                       <div class="col-sm-8">
                       <input placeholder="enter due date" type="date" value={duedate} onChange={(e) => setDuedate(e.target.value)}   class="form-control"/>
                       </div>
                   </div>

               <form className="col-md-12 cen" >
                  <h6>Add Product here:</h6>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Title</label>
                       <div class="col-sm-7">
                       <input placeholder="enter title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Qty</label>
                       <div class="col-sm-7">
                       <input placeholder="enter quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Price</label>
                       <div class="col-sm-7">
                       <input placeholder="enter price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                   <div class="form-group row">
                       <label  class="col-sm-3 col-form-label">Disc</label>
                       <div class="col-sm-7">
                       <input placeholder="enter discount" type="number" value={discount} onChange={(e) => setDsicount(e.target.value)}   class="form-control"/>
                       </div>
                   </div>
                 
                 
                   <button type="submit" onClick={addItem} class="btn btn-primary">Add Product</button>
                   </form>
                   <br />
                   <button type="submit" onClick={finalsubmit} class="btn btn-success">Submit</button>
                   </form>


                 
                 
           </div>
           </div>
           </div>
        </div>





        <div class="form-group col-md-7">
          <div style={{ backgroundColor:"rgb(255, 248, 220)",position: 'fixed', marginTop:'0px',backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
           <div  style={{marginTop:"40px", marginBottom:"50px", marginLeft:"2%", textAlign:"center", backgroundColor: "white", width:"50%", borderRadius: "20px", opacity:"0.6"}}>
                <div style={{paddingTop:"10px" , paddingBottom:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue",borderRadius: "20px"}}>
           <h3>Invoice Data</h3>
            <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Receiver Name : </label>
            <label for="inputEmail3" class="col-sm-7 col-form-label">{receivername}</label>
            
            <br />
                   <label for="inputEmail3" class="col-sm-4 col-form-label">Receiver Address : </label>
            <label for="inputEmail3" class="col-sm-7 col-form-label">{receiveradd}</label>

            <label for="inputEmail3" class="col-sm-4 col-form-label">Due Date : </label>
            <label for="inputEmail3" class="col-sm-7 col-form-label">{duedate}</label>

            <label for="inputEmail3" class="col-sm-4 col-form-label">Total Amount : </label>
            <label for="inputEmail3" class="col-sm-7 col-form-label">{totalamount}</label>
            {loginEmail}
                   </div>

              
                   <div>
                             
                             <div className='container'>
                                 <table className='table table-striped' >
                                     <thead>
                                         <tr>
                                             {/* <th>Sr.No</th> */}
                                             <th>title</th>
                                             <th>Qty</th>
                                             <th>price</th>
                                             <th>discount</th>
                                             <th>amount</th>
                                             <th>Action</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                     {
                     items.map((elem, ind) => {
                         return (
                                         <tr key={ind}>
                                             {/* <td>{ind+1}</td> */}
                                             <td>{elem.title}</td>
                                             <td>{elem.quantity}</td>
                                             <td>{elem.price}</td>
                                             <td>{elem.discount}</td>
                                             <td>{elem.amount}</td>

                                           
                                             <td><button className='btn btn-danger' onClick={(e) => deleteItem(ind)}>delete</button></td>
                                            
                                         </tr>
                                         )
                                     })
                                 }
                                  
                
                                     </tbody>
                                 </table>
                                 
                             </div>
             </div>
           </div>
           </div>
           </div>
        </div>
      </div>
       
    )
}
