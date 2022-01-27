import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getPosts } from '../config/Myservice';
import { addPost } from '../config/Myservice';

const regForName=RegExp(/^([A-Za-z]{3,15})$/);
    const regForEmail=RegExp(/^([a-zA-Z0-9\.-])+@([a-zA-Z0-9-]+).([a-z]{2,25})$/);
    const regForPass=RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

function Registerstore() {
    const [postdata, setPostdata] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPosts()
            .then(res => {
                // console.log(res.data);
                setPostdata(res.data);

            })
    }, [])

    const [Fname, setFname] = useState(" ");
    const [Lname, setLname] = useState(" ");
    const [Uname, setUname] = useState(" ");
    const [Email, setEmail] = useState(" ");
    const [Pass, setPass] = useState(" ");
    const [Conpass, setConPass] = useState(" ");

    const [errorFname, setErrorFname] = useState(" ");
    const [errorLname, setErrorLname] = useState(" ");
    const [errorUname, setErrorUname] = useState(" ");
    const [errorEmail, setErrorEmail] = useState(" ");
    const [errorPass, setErrorPass] = useState(" ");
    const [errorConpass, setErrorConPass] = useState(" ");

    // const handleForm = (e) => {
    //     e.preventDefault();

    //     addPost( {
    //         fname : Fname,
    //         lname : Lname,
    //         uname : Uname,
    //         email: Email,
    //         password: Pass})

    // }

    // const handleClick = (e) => {
    //     if (Uname !== " " && Email !== " " && Email !== " " && Pass !== " " && Conpass !== " ") {
    //         window.location.href = "./loginstore"
    //     }
    //     else {
    //         alert("Please fill all the fields")
    //     }
    // }



    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'fname':
                setErrorFname('');
                setFname(value);
                break;
            case 'lname':
                setErrorLname('');
                setLname(value);
                break;
            case 'uname':
                setErrorUname('');
                setUname(value);
                break;
            case 'email':
                setErrorEmail('');
                setEmail(value);
                break;

            case 'pass':
                setErrorPass('');
                setPass(value);
                break;

            case 'cpass':
                setErrorConPass('');
                setConPass(value);
                break;


        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (Fname == " " ||Lname == " " || Uname == " " || Email == " " || Pass == " " || Conpass == " ") {
            alert("Please fill all the feild");
        }

        else if (!regForName.test(Fname)) {
            setErrorFname("First_name should be more than 2 character");
        }
        else if (!regForName.test(Lname)) {
            setErrorLname("last_name should be more than 2 character");
        }
        else if (!regForName.test(Uname)) {
            setErrorUname("User_name should be more than 6 character");
        }
        else if (!regForEmail.test(Email)) {
            setErrorEmail("Enter valid Email ID");
        }
        else if (!regForPass.test(Pass)) {
            setErrorPass("Enter proper password");
        }
        else if (!regForPass.test(Conpass)) {
            setErrorConPass("Enter Proper password");
        }

        else {

            addPost( {
                        fname : Fname,
                        lname : Lname,
                        uname : Uname,
                        email: Email,
                        password: Pass})

            setFname("");
            setLname("");
            setUname("");
            setEmail("");
            setPass("");
            setConPass("");

            document.getElementById('fname').value='';
            document.getElementById('lname').value='';
            document.getElementById('uname').value='';
            document.getElementById('email').value='';
            document.getElementById('pass').value='';
            document.getElementById('cpass').value='';

            window.location.href = "./loginstore"
           
        }
    }

    return (

        <div style={{ backgroundColor:"#00CCFF",position: 'fixed', marginTop:'0px',backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
        <div  style={{marginTop:"30px", marginBottom:"50px", marginLeft:"30%", textAlign:"center", backgroundColor: "white", width:"40%", borderRadius: "20px", opacity:"0.9"}}>
             <div style={{paddingTop:"30px" , paddingBottom:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue",borderRadius: "20px"}}>
    
                <form className="col-md-12 cen" onSubmit={handleFormSubmit} method="post" action='http://localhost:8899/api/posts/addpost'>
                    <h4> Register Here </h4>
                    <br />

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Firstname</label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="first Name" onChange={handler} class="form-control" name="fname" id="fname" />
                            {errorFname && <div style={{color:"red"}}>{errorFname}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Lastname</label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="last Name" onChange={handler} class="form-control" name="lname" id="lname" />
                            {errorLname && <div style={{color:"red"}}>{errorLname}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Username</label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="User Name" onChange={handler} class="form-control" name="uname" id="uname" />
                            {errorUname && <div style={{color:"red"}}>{errorUname}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">EmailID</label>
                        <div class="col-sm-9">
                            <input placeholder="Email" type="text" onChange={handler} class="form-control" name="email" id="email" />
                          {errorEmail && <div style={{color:"red"}}>{errorEmail}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9">
                            <input placeholder="Password" type="password" onChange={handler} class="form-control" name="pass" id="pass" />
                            {errorPass && <div style={{color:"red"}}>{errorPass}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Confirm Password</label>
                        <div class="col-sm-9">
                            <input placeholder="Password" type="password" onChange={handler} class="form-control" name="cpass" id="cpass" />
                            {errorConpass && <div style={{color:"red"}}>{errorConpass}</div>}
                        </div>
                    </div>
                    <button type="submit"  class="btn btn-primary">Sign Up</button>
                    <div>
                        {/* <a href="./signin">already have an account?Login</a> */}
                        <Link to="/signin">already hav an account? Log In</Link>
                    </div>
                </form>

            </div>
           
            {/* <section className="container">
                
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                          
                            <th scope="col">Email</th>
                          
                            <th scope="col">password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postdata.pdata != undefined ? postdata.pdata.map((val, index) =>
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{val.uname}</td>
                               
                                <td>{val.email}</td>
                               
                                <td>{val.password}</td>

                                <td>
                                    <a href={`/update/${index}`} class="btn btn-success">Edit</a>&nbsp;
                                    <a onClick={() => { deletePosts(index) }} class="btn btn-danger"><span style={{ color: "red" }}>Delete</span></a>
                                </td>

                            </tr>
                        ) : ''}
                    </tbody>
                </table>
            </section> */}
        </div>
        </div>

    )
}


export default Registerstore
