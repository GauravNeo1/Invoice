import React,{useState} from 'react'
import { addFile } from '../config/Myservice';
import { addFileupdate } from '../config/Myservice';

export default function Settinginvoice() {
    const [orgname, setOrgname]=useState(" ");
    const [orgadd, setOrgadd]=useState(" ");
    const [flagadd ,setFlagadd]=useState(true);
    const [flagupdate ,setFlagupdate]=useState(false);

    const handlesetting=(e)=>{
        e.preventDefault();
        if(!orgname || ! orgadd){
            alert("Plz fill required filed");
        }
        else
        {
            let formData={
                email:"g@gmail.com",
                orgname:orgname,
                orgaddress:orgadd,
                orglogo:"undefined"
            }
            addFile(formData)

        }

    }

    const handleupdate=(e)=>{
        e.preventDefault();
        if(!orgname || ! orgadd){
            alert("Plz fill required filed");
        }
        else
        {
            let formData={
                email:"g@gmail.com",
                orgname:orgname,
                orgaddress:orgadd,
                orglogo:"undefined"
            }
            addFileupdate(formData)

        }

    }


    const changeAdd=()=>{
        setFlagupdate(false);
        setFlagadd(true);
    }

    const changeUpdate=()=>{
        setFlagupdate(true);
        setFlagadd(false);
    }
    
     
  
   
    return (
        <div style={{ backgroundColor:"rgb(255, 248, 220)",position: 'fixed', marginTop:'0px',backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
        <div  style={{marginTop:"50px", marginBottom:"50px", marginLeft:"20%", textAlign:"center", backgroundColor: "white", width:"60%", borderRadius: "20px", opacity:"0.8"}}>
             <div style={{paddingTop:"30px" , paddingBottom:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue",borderRadius: "20px"}}>



             <div class="form-row">
    <div class="form-group col-md-2">
    <button className='btn btn-primary' onClick={changeAdd}> Add </button>
    <br/>
    
         <button className='btn btn-primary' onClick={changeUpdate}>Update</button>
    </div>
    <div class="form-group col-md-8">
      

    {flagadd === true ? 

<form className="col-md-12 cen" onSubmit={handlesetting} method="post" action='http://localhost:8899/api/posts/fileupload' enctype="multipart/form-data">
    <h4> Add Sender Information </h4>
    <br />
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Organization Logo</label>
        <div class="col-sm-9">
        <input placeholder="Email/Username" type="file" name="invoice" class="form-control"/>
        </div>
    </div>
   
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Organization Name</label>
        <div class="col-sm-9">
        <input placeholder="enter organization name" type="text" onChange={(e)=>setOrgname(e.target.value)}   class="form-control"/>
        </div>
    </div>
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Organization Address</label>
        <div class="col-sm-9">
        <input placeholder="enter organization address" type="text" onChange={(e)=>setOrgadd(e.target.value)}   class="form-control"/>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
    </form>

    : "" }
  
     { flagupdate === true ? 
  <div>
  <form className="col-md-12 cen" onSubmit={handleupdate} method="post" action='http://localhost:8899/api/posts/fileupdate' enctype="multipart/form-data">
  <h4>Update Sender Information </h4>
    <br />
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label"> Organization Logo</label>
        <div class="col-sm-9">
        <input placeholder="Email/Username" type="file" name="invoice" class="form-control"/>
        </div>
    </div>
   
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Organization Name</label>
        <div class="col-sm-9">
        <input placeholder="enter organization name" type="text" onChange={(e)=>setOrgname(e.target.value)}   class="form-control"/>
        </div>
    </div>
    <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Organization Address</label>
        <div class="col-sm-9">
        <input placeholder="enter organization address" type="text" onChange={(e)=>setOrgadd(e.target.value)}   class="form-control"/>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
    </form>
    </div>
    : "" }
    </div>
  </div>

       
             
            
       </div>
       </div>
       </div>
    )
}
