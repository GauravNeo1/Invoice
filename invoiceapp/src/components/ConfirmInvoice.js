import React, { useState, useEffect } from 'react'
import { addInvoice, addInvoiceProduct } from '../config/Myservice';
import { addInvoiceproduct } from '../config/Myservice';
import { sendEmail } from '../config/Myservice';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


export default function ConfirmInvoice() {
    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [flag, setFlag] = useState(0)
    let invoiceData = localStorage.getItem('InvoiceData')
    useEffect(() => {
        let invoiceData = localStorage.getItem('InvoiceData')
        invoiceData = JSON.parse(invoiceData);
        setData(invoiceData)
        setFlag(true)

        let invoiceProduct = localStorage.getItem('InvoiceProduct')
        invoiceProduct = JSON.parse(invoiceProduct);
        setProduct(invoiceProduct)

    }, [])

    {
        console.log(product)
    }


    const confirmed = () => {
        addInvoice(data)
        addInvoiceProduct(product)
    }

    // const generatePDF = () => {
    //     var doc = new jsPDF("p", "pt", "a4");
    //     doc.html(document.querySelector("#contend"), {
    //         callback: function (pdf) {
    //             pdf.save("invoice.pdf");
    //         }
    //     });
    // };

    const printDocument=()=>{
        const input = document.getElementById('contend');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
            const filedata = pdf.output("blob");
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            sendEmail(formData).then((res)=>{
                console.log(res)
            })
          });
        }

    const sendemailto = () => {
        let profile = {
            invoiceData: data,
            productData: product
        }
        sendEmail(profile)
    }


    return (
        <div style={{ marginTop: '0px', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover', width: '100vw', height: 'auto' }}>
            <div style={{ marginTop: "20px", marginBottom: "50px", marginLeft: "20%", textAlign: "center", backgroundColor: "white", width: "60%", opacity: "0.8" }}>
                <div style={{ paddingTop: "0px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue" }}>
                    {/* Gaurav */}
                    <div id="contend">

                        {flag !== true ? " data not aviable" :

                            // <>
                            //     <h1>{data[0].sendername}</h1>
                            //     <p>{data[0].senderadd}</p>
                            // </>
                            <>
                                <div style={{ backgroundColor: "lightgrey", width: '100%', height: '150px', paddingTop: "10px", paddingRight: "0px" }}>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <img src="../MyImages/orglogo.jpg" alt="No_logo_found" width="100" height="100" />

                                        </div>
                                        <div class="form-group col-md-6" style={{ justifyContent: "right" }}>
                                            <h1>INVOICE</h1>
                                            <h6>No.</h6>
                                            <h5>{data[0].invoiceno}</h5>

                                        </div>
                                    </div>

                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">FROM</label>
                                        <b><h6>{data[0].sendername}</h6></b>
                                        <h6>{data[0].senderadd}</h6>
                                        <br />
                                        <label for="inputEmail4">BILL TO</label>
                                        <b><h6>{data[0].receivername}</h6></b>
                                        <h6>{data[0].receiveradd}</h6>
                                    </div>

                                    <div class="form-group col-md-6" >
                                        <label for="inputEmail4">STATUS</label>
                                        <b><h4>{data[0].invoicestatus}</h4></b>
                                        <br />
                                        <label for="inputEmail4">DATE</label>
                                        <h6>{data[0].invoicedate}</h6>
                                        <br />
                                        <label for="inputEmail4">DUE DATE</label>
                                        <h6>{data[0].duedate}</h6>
                                        <br />
                                        <label for="inputEmail4">AMOUNT</label>
                                        <b><h4>NGN {data[0].invoiceamount}</h4></b>


                                    </div>
                                </div>
                            </>


                        }



                        {flag !== true ? " data not aviable" :
                            <div className='container'>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Disc(%)</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            product.map((elem, ind) => {
                                                return (
                                                    <tr key={ind}>

                                                        <td>{elem.title}</td>
                                                        <td>{elem.quantity}</td>
                                                        <td>{elem.price}</td>
                                                        <td>{elem.discount}</td>
                                                        <td>{elem.amount}</td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>



                        }

                    </div>
                    <div>
                        <button className='btn btn-success' onClick={confirmed}>Confirm and Send</button>
                        <br />
                        <br />
                        <button onClick={sendemailto} className='btn btn-primary'>send email</button> &nbsp;
                        {/* <button onClick={generatePDF} className='btn btn-primary'>Download PDF</button> */}
                        <button onClick={printDocument} className='btn btn-primary'> html2canvas</button>
                    </div>


                    {/* <button onClick={confirmed}>Confirmed</button> */}
                </div>
            </div>
        </div>
    )
}
