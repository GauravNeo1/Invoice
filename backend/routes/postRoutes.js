const fs = require('fs');
const express = require('express');


const router = express.Router();

const signupModel = require('../db/signupSchema');
const senderModel = require('../db/senderSchema');
const invoiceModel = require('../db/invoiceSchema');
const productModel = require('../db/productSchema');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gaurav9zx@gmail.com',
        pass: 'Gaurav@neo1'
    }
});
// router.get("/fetchpost", (req, res) => {
   
//     res.json(" Added")
   

// })
router.post("/addpost", (req, res) => {

    let fname = req.body.fname;
    let lname = req.body.lname;
    let uname = req.body.uname;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    let ins = new signupModel({ fname: fname , lname: lname , uname: uname , email: email, password: password });
    console.log(ins)
    ins.save((err) => {
        if (err) { res.json("Already Added") }
        else {
            res.json(" Data Added")
        }
    })
})



router.post("/loginstore", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    signupModel.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else {
            res.json({ "err": 0, "msg": "Login Success", "flag" : "true" })
        }
        console.log("mail correct")
    })
    console.log(req.body)
})


router.post("/fileupload",(req,res)=>{
    let email = req.body.email;
    let orgname = req.body.orgname;
    let orgaddress = req.body.orgaddress;
    let orglogo = req.body.orglogo;
    let ins = new senderModel({  email: email, orgname: orgname, orgaddress: orgaddress, orglogo: orglogo });
    console.log(ins)
    ins.save((err) => {
        if (err) { res.json("Already Added") }
        else {
            res.json(" Data Added")
        }
    })
})


router.post("/fileupdate",(req,res)=>{
    let email = req.body.email;
    let orgname = req.body.orgname;
    let orgaddress = req.body.orgaddress;
    let orglogo = req.body.orglogo;
    // let ins = new senderModel({  email: email, orgname: orgname, orgaddress: orgaddress, orglogo: orglogo });
    console.log(req.body)
    senderModel.updateOne({ email: email}, { $set: { orgname: orgname, orgaddress: orgaddress, orglogo: orglogo } }, (err) => {
        if (err) throw err;
        else {
            res.end("Category Updated");
            
        }
    })

    invoiceModel.updateMany({ email: email}, { $set: { sendername: orgname, senderadd: orgaddress, senderlogo: orglogo } }, (err) => {
        if (err) throw err;
        else {
            res.end("Category Updated");
            
        }
    })
})

router.get("/fetchsenderdata/:data", (req, res) => {
    console.log(req.params.data)
    let email = req.params.data
    senderModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Error" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "No Data Found" })
        }
        else {
            res.json({ "loginuser" : data })
        }
      
    })

})

router.post("/addinvoice", (req, res) => {
    console.log(req.body[0].sendername)
    let email = req.body[0].senderemail;
    let senderlogo = req.body[0].senderlogo;
    let sendername = req.body[0].sendername;
    let senderadd = req.body[0].senderadd;
    let receivername = req.body[0].receivername;
    let receiveradd = req.body[0].receiveradd;
    let invoicedate = req.body[0].invoicedate;
    let invoiceamount = req.body[0].invoiceamount;
    let duedate = req.body[0].duedate;
    // let invociestatus = req.body[0].invociestatus
    // let invoiceno = req.body[0].invoiceno
    let invociestatus = "unpaid";
    let invoiceno = 1;
    let ins = new invoiceModel({  email: email, invoicestatus: invociestatus, invoiceno: invoiceno, senderlogo: senderlogo, sendername: sendername, senderadd: senderadd, receivername: receivername, receiveradd: receiveradd, invoiceamount: invoiceamount, invoicedate: invoicedate, duedate: duedate });
    ins.save((err) => {
        if (err) { res.json("Already Added") }
        else {
            res.json(" Data Added")
        }
    })
    console.log(ins)

   
})

router.post("/addinvoiceproduct", (req, res) => {
    if(req.body !== null){
        {
         req.body.map((elem, ind) => {
                  
                              let email = elem.email;
                            //   let invoiceno = elem.invoiceno;
                            let invoiceno = 1;
                              let title = elem.title;
                              let quantity = elem.quantity;
                              let price = elem.price;
                              let discount = elem.discount;
                              let amount = elem.amount;
                            
                              let ins = new productModel({  email: email, invoiceno: invoiceno, title: title, quantity: quantity, price: price, discount: discount, amount: amount });
                              ins.save((err) => {
                                if (err) { res.json("Already Added") }
                                else {
                                    res.json(" Data Added")
                                }
                            })
                            //    console.log(ins)
                                    
            
                             
                            })
                        }
    }
    else{
        console.log("No Data found")
    }

    
})


router.get("/fetchstas/:data", (req, res) => {
    // console.log(req.params.data)
    let email= req.params.data;
    invoiceModel.find({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Error" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "No Data Found" })
        }
        else {
            res.json({ "err": 0, "invoicedata" : data })
        }
      
    })
    //  fetch paid, unpiad and partiallypad data and totla invoice realted to email    (....dashboard....)
   

})



router.get("/fetchproduct/:data", (req, res) => {
    console.log(req.params.data)
    let email= req.params.data;
    productModel.find({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Error" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "No Data Found" })
        }
        else {
            res.json({ "err": 0, "productdata" : data })
        }
      
    })
   

})


router.post("/addstatus", (req, res) => {

    let email = req.body.email;
    let invoiceno = req.body.invoiceno;
    let invoicestatus = req.body.status
    invoiceModel.updateOne({ email: email, invoiceno : invoiceno}, { $set: { invoicestatus : invoicestatus } }, (err) => {
        if (err) throw err;
        else {
            res.end("Category Updated");
            
        }
    })
})


// router.post("/sendemail", (req, res) => {
// //  console.log(req.body)
//  let invoiceData = req.body.invoiceData[0];
//  let productData = req.body.productData;
//  console.log(invoiceData.sendername)
//  console.log(productData)



//  var mailOptions = {
//     from: 'gaurav9zx@gmail.com',
//     to: 'gaurav9zx@gmail.com',
//     subject: `Invoice App`,
//     html: `
    
//     <html>

// <head>
//     <style>
//         .flex-container { display: flex; align-items: stretch; }
//         .flex-container>div { color: black; margin: 10px; }
//         .left { text-align: left;  padding-left: 5px; }
//         .right { text-align: right; padding-right: 5px; }
//         #customers { border-collapse: collapse; width: 100%; }
//         #customers td, #customers th { border: 1px solid #ddd; padding: 8px; }
//     </style>
// </head>
// <body>
//     <div
//         style="margin-top: 20px; margin-bottom: 50px; margin-left: 20%; text-align: center; background-color: white; width: 60%; opacity: 0.8">
//         <div
//             style="padding-top: 0px; padding-bottom: 30px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue">
//             <div style="background-color: lightgrey; width: 100%; height: 160px; padding-top: 5px; padding-right: 0px">
//                 <div class="flex-container">
//                     <div style="flex-grow: 5" class="left">
//                         <img src="../MyImages/orglogo.jpg" alt="No_logo_found" width="100" height="100" />
//                     </div>
//                     <div style="flex-grow: 5" class="right">
//                         <h1>INVOICE</h1>
//                         <h4>No.</h4>
//                         <h3>${invoiceData.invoiceno}</h3>
//                     </div>
//                 </div>
//             </div>
//             <div class="flex-container">
//                 <div style="flex-grow: 5" class="left">
//                     <label for="inputEmail4">FROM</label>
//                     <b>
//                         <h6>${invoiceData.sendername}</h6>
//                     </b>
//                     <h6>${invoiceData.senderadd}</h6>

//                     <label for="inputEmail4">BILL TO</label>
//                     <b>
//                         <h6>${invoiceData.receivername}</h6>
//                     </b>
//                     <h6>${invoiceData.receiveradd}</h6>
//                 </div>
//                 <div style="flex-grow: 5" class="right">
//                     <label for="inputEmail4">STATUS</label>
//                     <b>
//                         <h4>${invoiceData.invoicestatus}</h4>
//                     </b>
//                     <label for="inputEmail4">DATE</label>
//                     <h6>${invoiceData.invoicedate}</h6>
//                     <label for="inputEmail4">DUE DATE</label>
//                     <h6>${invoiceData.duedate}</h6>
//                     <label for="inputEmail4">AMOUNT</label>
//                     <b>
//                         <h4>NGN ${invoiceData.invoiceamount}</h4>
//                     </b>
//                 </div>
//             </div>
//             <div>
//                 <table id="customers">
//                     <thead>
//                         <tr style="background-color: lightgrey;">
//                             <th scope="col">Item</th>
//                             <th scope="col">Qty</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Disc(%)</th>
//                             <th scope="col">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                    
//                         {
//                         product.map((elem, ind) => {
//                         return (
//                         <tr key={ind}>
//                             <td>{elem.title}</td>
//                             <td>{elem.quantity}</td>
//                             <td>{elem.price}</td>
//                             <td>{elem.discount}</td>
//                             <td>{elem.amount}</td>
//                         </tr>
//                         )
//                         })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
// </body>
// </html>
    
    
//     `,
   
// };

// transporter.sendMail(mailOptions, function (error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + email);
//     }
// });
 

// })



router.post("/sendemail", upload.single("file"), (req, res) => {
    console.log(req.body)
    var mailOptions = {
            from: 'gaurav9zx@gmail.com',
            to: 'gaurav9zx@gmail.com',
            subject: `Invoice App`,
            text: "Invoice detail",
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: req.file.buffer,
                },
            ],
    };

    transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + email);
            }
        });
})


module.exports = router;



