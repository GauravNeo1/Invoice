import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { deletePosts, getPosts } from '../config/Myservice';
import { login } from '../config/Myservice';
import { useSelector, useDispatch } from 'react-redux'





function Loginstore() {

    const dispatch = useDispatch();
    const [postdata, setPostdata] = useState([]);
    const [data, setData] = useState([]);

    

     
   const [Email_login ,setEmail_login]=useState(" ");
   const [Password_login,setPass_login]=useState(" ");
   const [flag ,setFlag]=useState(false);

   const handleLogin=(e)=>{
       e.preventDefault();
       
        // alert("logged in successfully");
               let profile={
                   email: Email_login,
                   password: Password_login,
               }
               login(profile)
               .then(res=>{
                   if(res.data.err==0){
                    dispatch({ type: "EIN", payload: {email: Email_login}});
                     setFlag(true);
                   console.log(res.data.flag)
                  
                   alert("logged in successfully");
                  
                   let loginUser = localStorage.setItem("LoginUser", Email_login);
                   window.location.href="./dashboard";
                   
                   }
                   if(res.data.err==1){
                       console.log(res.data)
                       alert("Login credentials incorrect");
                   }
               })


}

 
   return (
    <div style={{ backgroundColor:"#00CCFF",position: 'fixed', marginTop:'0px',backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
    <div  style={{marginTop:"80px", marginBottom:"50px", marginLeft:"30%", textAlign:"center", backgroundColor: "white", width:"40%", borderRadius: "20px", opacity:"0.9"}}>
         <div style={{paddingTop:"30px" , paddingBottom:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue",borderRadius: "20px"}}>


           <form className="col-md-12 cen" onSubmit={handleLogin}>
               <h4> User Login </h4>
               <br />
              
               <div class="form-group row">
                   <label  class="col-sm-3 col-form-label">EmailID</label>
                   <div class="col-sm-9">
                   <input placeholder="Email/Username" type="text" onChange={(e)=>setEmail_login(e.target.value)}   class="form-control"/>
                   </div>
               </div>
               <div class="form-group row">
                   <label  class="col-sm-3 col-form-label">Password</label>
                   <div class="col-sm-9">
                   <input placeholder="Password" type="Password" onChange={(e)=>setPass_login(e.target.value)}   class="form-control"/>
                   </div>
               </div>
               <button type="submit" class="btn btn-primary">LogIn</button>
               </form>
             
       </div>
       </div>
       </div>
   )
}


export default Loginstore
