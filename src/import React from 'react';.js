import React , { useContext } from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from "jspdf";

import TextInput from './comps/Inputs'
import TextAreas from './comps/Textareas'

import  { MovieContext }from './contexts/invoice'

function App() {
  const movies = useContext(MovieContext)[0]
  const { obj } = useContext(MovieContext)

  console.log(useContext(MovieContext)[0])
  // console.log(obj)

  const [invoice , setInvoice] = React.useState({ 
    invoiceName : "Invoice" , 
    invoiceNumber : '1' ,
    sender: "",
    billToText: "Bill To",
    shipToText: "Ship To",
    billTo: "",
    shipTo: "",
    dateStartText: "Date",
    dateStart: "2017/02/01",
    dateEndText: "Date End",
    dateEnd : "2027/02/01",
    descriptionHead: "Description",
    quantityHead: "Quantity",
    rateHead: "Rate",
    amountHead: "Amount",
  });

  const [details , setDetails] = React.useState([{ 
    id: 'iuyew879hioeiruoiu',
    description : "" , 
    quantity : 1 , 
    rate : 0 , 
    amount : 0 , 
    hvr : false 
  }])

  const [totalAmount , setTotalAmount ] = React.useState(0)

  const downloadPdf = () => {
    const doc = new jsPDF(); 
    doc.text( invoice.invoiceName, 180, 10);
    doc.text( invoice.invoiceNumber, 195, 15);
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf"); // will save the file in the current working directory    
  }

  // functions 
  const handleInvoiceChange = (e , index) => {
    setInvoice({
      ...invoice,
      [e.target.name] : e.target.value
    }) 
  }
  
  const deleteDetails = (index , id) => {
    let filter = details.filter((item) => details[index]['id'] !== item.id)
    console.log(filter)
    setDetails(filter)
  }

  
  // setMouseLeave
  const mouseLeave = (e ,index) => {
    let change = [...details];
    change[index]['hvr'] = false;
    setDetails(change)
  }  

  // hoverState 
  const mouseIn = (e, index) => {
    let change = [...details];
    change[index]['hvr'] = true;
    setDetails(change)
  }

  const handleDetails = (e , index) => {
    const detailsCopy = [...details]
    detailsCopy[index][e.target.name] = e.target.value;
    detailsCopy[index]['amount'] =  detailsCopy[index]['quantity'] * detailsCopy[index]['rate']   // handles Total Amount 
    setDetails(detailsCopy)
  }

  const addNewDetails = () => {
    setDetails([...details , { id: uuidv4() , description : "" , quantity : 1 , rate : 0 , amount : 0 , hvr : false }] )
  }

  React.useEffect(()=> {
    let holdTotal = 0;
    for (let detail in details) {
      holdTotal += details[detail]['amount']
    }
    setTotalAmount(holdTotal)    
  },[details])


  return (
    <div className="box-border font-Poppins min-h-screen bg-white-100 flex flex-row justify-center items-center p-2">
      <div className="container mt-5 mx-auto w-5/6 m-10 flex flex-col sm:flex-col md:flex-row">
       <div className="form w-full bg-white  rounded p-2 md:w-4/6 ">
        <div className="logo-invoice flex flex-col md:flex-row flex-1">
          <div className="logo h-20 w-20 bg-gray-200 md:flex-1 ">
          </div>
            {/* start of invoice no  */}
          <div className="invoice flex-1 flex flex-col justify-start items-start md:justify-end md:items-end"> 
             <TextInput name = "invoiceName" type = "text" placeholder = {invoice.invoiceName} value = {invoice.invoiceName} change = {handleInvoiceChange} className = "p-2 text-4xl border border-white rounded focus:outline-none focus:border-blue-300 text-left md:text-right w-5/6"                       
            /> {/* end of INVOICE text text */}

            {/* start of invoice No */}
            <div className="flex rounded-r-md justify-start items-start mt-5 md:items-end md:justify-end">
              <div className="inline w-10 border rounded-l-md p-1 text-center bg-gray-200">#</div>
              <TextInput name="invoiceNumber" type="number" placeholder="" value={invoice.invoiceNumber} change = {handleInvoiceChange} className="p-1 w-25 border-gray-200 focus:outline-none border rounded-r-md text-left focus:border-blue-300 md:outline-none md:text-right"   />
            </div> 
            {/* INVOICE No: */}            
          </div> 
        </div>

        <div className="invoice-date flex flex-col md:flex-row ">
          <div className="invoice flex-1">
              <TextAreas name="sender" type="textarea" placeholder="Who is this invoice from sent to (required)" value={invoice.sender} change = {handleInvoiceChange} className="p-2 w-full mt-5 h-20 text-sm rounded  border-gray-200 border text-left focus:border-blue-300 focus:outline-none md:text-left md:w-4/6 md:mt-0" />
              
              <div className="bill-ship flex flex-col md:flex-row">
                <div className="bill mr-0 md:mr-5">
                <TextInput name="billToText" type="text" placeholder="" value={invoice.billToText} change = {handleInvoiceChange} className="p-1 w-25 w-full border border-white rounded focus:outline-none  text-left focus:border-blue-300 md:outline-none md:text-left"   />      

                <TextAreas name="billTo" type="textarea" placeholder="Who is this invoice to (required)" value={invoice.billTo} change = {handleInvoiceChange} className="p-2 w-full mt-0 h-20 text-sm rounded  border-gray-200 border text-left focus:border-blue-300 focus:outline-none md:text-left md:w-full md:mt-0" />      
                </div>

                <div className="bill">
                <TextInput name="shipToText" type="text" placeholder="" value={invoice.shipToText} change = {handleInvoiceChange} className="p-1 w-25 w-full border border-white rounded focus:outline-none  text-left focus:border-blue-300 md:outline-none md:text-left"   />      

                <TextAreas name="sender" type="textarea" placeholder="(Optional)" value={invoice.sender} change = {handleInvoiceChange} className="p-2 w-full mt-0 h-20 text-sm rounded  border-gray-200 border text-left focus:border-blue-300 focus:outline-none md:text-left md:w-full md:mt-0" />      
                </div>
              </div>              
          </div>
          <div className="date flex-1 ">
        
            <div className="box justify-end flex mt-2 md:mt-5 md:justify-end md:flex">
                <TextInput name="dateStartText" type="text" placeholder="" value={invoice.dateStartText} change = {handleInvoiceChange} className="p-1 border flex-2 border-white w-full rounded focus:outline-none  text-right focus:border-blue-300  md:flex-2 "   />  
                <TextInput name="dateStart" type="text" placeholder="" value={invoice.dateStart} change = {handleInvoiceChange} className="flex-2 p-1 w-25 ml-2 border border-gray-200  w-full  rounded focus:outline-none focus:border-blue-300 md:outline-none text-right"   />                                    
            </div> 

            <div className="box justify-end flex mt-2 md:mt-5 md:justify-end md:flex">
                <TextInput name="dateEndText" type="text" placeholder="" value={invoice.dateEndText} change = {handleInvoiceChange} className="p-1 border flex-2 border-white rounded w-full focus:outline-none  text-right focus:border-blue-300  md:flex-2 "   />  
                <TextInput name="dateEnd" type="text" placeholder="" value={invoice.dateEnd} change = {handleInvoiceChange} className="flex-2 p-1 w-25 ml-2 border border-gray-200 w-full rounded focus:outline-none focus:border-blue-300 md:outline-none text-right"   />                                    
            </div>                                 
          </div>
        </div>

      <div className="main mt-7"> {/* start of main */}
        <div className="header hidden bg-gray-900 md:flex flex-col md:flex-row"> {/* start of HEADER*/}
          <div className="description w-full md:w-6/12">
            <TextInput name="descriptionHead" type="text" placeholder="" value={invoice.descriptionHead} change = {handleInvoiceChange} className="w-full text-white p-1 bg-transparent border-none focus:outline-none focus:bg-gray-700 text-left"   />            
          </div>

          <div className="quantity w-full md:w-2/12">
            <TextInput name="quantityHead" type="text" placeholder="" value={invoice.quantityHead} change = {handleInvoiceChange} className="w-full text-white p-1 bg-transparent border-none focus:outline-none focus:bg-gray-700 text-left"   />        </div>

            <div className="quantity w-full md:w-2/12">
            <TextInput name="rateHead" type="text" placeholder="" value={invoice.rateHead} change = {handleInvoiceChange} className="w-full text-white p-1 bg-transparent border-none focus:outline-none focus:bg-gray-700 text-left"   />        </div>

            <div className="quantity w-full md:w-2/12">
            <TextInput name="amountHead" type="text" placeholder="" value={invoice.amountHead} change = {handleInvoiceChange} className="w-full text-white p-1 bg-transparent border-none focus:outline-none focus:bg-gray-700 text-left md:text-center"   />        </div>

            <div className="quantity">
              <h1> he </h1>
            </div> 
          </div> {/* end of header */}

          {/* starts details */}
          {details.map((invoice , index)  => {
              return (
              <div className="details mt-20 flex flex-wrap flex-row md:flex-row md:mt-1 md:flex-nowrap" key={index} onMouseOver={ (e)=>mouseIn(e , index)} onMouseLeave={ (e)=> mouseLeave(e , index) }> {/* start of HEADER*/}
                  <div className="description w-full mr-1 md:w-6/12">
                  <TextAreas name="description" type="text"  placeholder="Description of goods or service" value={invoice.description} change = {(e)=>handleDetails(e , index)} className="w-full text-gray-800 p-1 bg-transparent border-gray-200 rounded border focus:outline-none focus:ring-1 text-left" />
                  </div>

                  <div className="quantity w-3/12 mr-1 md:w-2/12">
                    <TextInput name="quantity" type="number" placeholder="" value={invoice.quantity} change = {(e)=>handleDetails(e , index)} className="w-full text-gray-800 p-1 bg-transparent border-gray-200 rounded border focus:outline-none focus:ring-1 text-left"   />        </div>

                    <div className="price w-4/12 mr-1 md:w-2/12">
                    <TextInput name="rate" type="number" placeholder="" value={invoice.rate} change = {(e)=>handleDetails(e , index)} className="w-full text-gray-800 p-1 bg-transparent border-gray-200 rounded border focus:outline-none focus:ring-1 text-left"   />        </div>

                    <div className="quantity w-4/12 mr-1 md:w-2/12">
                    {/* <TextInput name="amount" type="number" placeholder="" value={invoice.amount} change = {(e)=>handleDetails(e , index)} className="w-full text-gray-800 p-1 bg-transparent border-gray-200 rounded border focus:outline-none focus:ring-1 text-center"   />    */}
                     <p className="text-center mt-1 "> { invoice.amount } </p> 
                    </div>

                    <div className="quantity mt-1 w-5">
                      { details.length > 1 && invoice.hvr  ? <BsFillTrashFill onClick={()=>deleteDetails(index)} className="cursor-pointer text-gray-600 transition  text-xl hover:text-red-800"/> : "   " }            
                    </div> 
              </div>
                ) /* ends details */
           })
          }



          <div className="invoice-fields flex ">
            <div className=" flex-1">
              <button type="button" onClick = { ()=>addNewDetails()} className="btn mt-5 bg-yellow-500 text-gray-800 py-1 px-3 rounded border-b-2 border-r-2"> + Add Item</button>
            </div>
            <div className="mr-2 flex-1 flex justify-end items-end md:mr-10">
              <h1> <span className="text-red-800">Total : </span>  {totalAmount} </h1>
            </div>            
          </div>     

        </div> {/* end of main */}
      </div> {/*close container */}
      <div className="convert md:w-2/6 md:p-2 md:ml-2">
      <button type="submit" onClick={downloadPdf} className="bg-red-400 text-white px-2 py-2 rounded w-full block mb-10" >  DOWNLOADS </button>
            <p>Choose Currency : <span className="text-red-700"> Ghana Cedis </span></p>
            <select className="w-full mt-5 p-2 border rounded focus:outline-none focus:ring-1" name="currency" id="select_currencySymbol">
                                                            <option value="AED" >AED</option>
                                                            <option value="AFN" >AFN</option>
                                                            <option value="ALL" >ALL</option>
                                                            <option value="AMD" >AMD</option>
                                                            <option value="ARS" >ARS</option>
                                                            <option value="AUD" >AUD</option>
                                                            <option value="AZN" >AZN</option>
                                                            <option value="BAM" >BAM</option>
                                                            <option value="BDT" >BDT</option>
                                                            <option value="BGN" >BGN</option>
                                                            <option value="BHD" >BHD</option>
                                                            <option value="BIF" >BIF</option>
                                                            <option value="BND" >BND</option>
                                                            <option value="BOB" >BOB</option>
                                                            <option value="BRL" >BRL</option>
                                                            <option value="BZD" >BZD</option>
                                                            <option value="CAD" >CAD</option>
                                                            <option value="CDF" >CDF</option>
                                                            <option value="CHF" >CHF</option>
                                                            <option value="CLP" >CLP</option>
                                                            <option value="CNY" >CNY</option>
                                                            <option value="COP" >COP</option>
                                                            <option value="CRC" >CRC</option>
                                                            <option value="CVE" >CVE</option>
                                                            <option value="CZK" >CZK</option>
                                                            <option value="DJF" >DJF</option>
                                                            <option value="DKK" >DKK</option>
                                                            <option value="DOP" >DOP</option>
                                                            <option value="DZD" >DZD</option>
                                                            <option value="EGP" >EGP</option>
                                                            <option value="ERN" >ERN</option>
                                                            <option value="ETB" >ETB</option>
                                                            <option value="EUR" >EUR</option>
                                                            <option value="GBP" >GBP</option>
                                                            <option value="GEL" >GEL</option>
                                                            <option value="GHS" >GHS</option>
                                                            <option value="GNF" >GNF</option>
                                                            <option value="GTQ" >GTQ</option>
                                                            <option value="HKD" >HKD</option>
                                                            <option value="HNL" >HNL</option>
                                                            <option value="HRK" >HRK</option>
                                                            <option value="HUF" >HUF</option>
                                                            <option value="IDR" >IDR</option>
                                                            <option value="ILS" >ILS</option>
                                                            <option value="INR" >INR</option>
                                                            <option value="IQD" >IQD</option>
                                                            <option value="IRR" >IRR</option>
                                                            <option value="ISK" >ISK</option>
                                                            <option value="JMD" >JMD</option>
                                                            <option value="JOD" >JOD</option>
                                                            <option value="JPY" >JPY</option>
                                                            <option value="KES" >KES</option>
                                                            <option value="KHR" >KHR</option>
                                                            <option value="KMF" >KMF</option>
                                                            <option value="KRW" >KRW</option>
                                                            <option value="KZT" >KZT</option>
                                                            <option value="LBP" >LBP</option>
                                                            <option value="LKR" >LKR</option> 
                                                            <option value="LTL" >LTL</option>
                                                            <option value="LVL" >LVL</option>
                                                            <option value="LYD" >LYD</option>
                                                            <option value="MAD" >MAD</option>
                                                            <option value="MDL" >MDL</option>
                                                            <option value="MGA" >MGA</option>
                                                            <option value="MKD" >MKD</option>
                                                            <option value="MUR" >MUR</option>
                                                            <option value="MXN" >MXN</option>
                                                            <option value="MYR" >MYR</option>
                                                            <option value="MZN" >MZN</option>
                                                            <option value="NAD" >NAD</option>
                                                            <option value="NGN" >NGN</option>
                                                            <option value="NIO" >NIO</option>
                                                            <option value="NOK" >NOK</option>
                                                            <option value="NPR" >NPR</option>
                                                            <option value="NZD" >NZD</option>
                                                            <option value="OMR" >OMR</option>
                                                            <option value="PAB" >PAB</option>
                                                            <option value="PEN" >PEN</option>
                                                            <option value="PHP" >PHP</option>
                                                            <option value="PKR" >PKR</option>
                                                            <option value="PLN" >PLN</option>
                                                            <option value="PYG" >PYG</option>
                                                            <option value="QAR" >QAR</option>
                                                            <option value="RSD" >RSD</option>
                                                            <option value="RUB" >RUB</option>
                                                            <option value="RWF" >RWF</option>
                                                            <option value="SAR" >SAR</option>
                                                            <option value="SDG" >SDG</option>
                                                            <option value="SEK" >SEK</option>
                                                            <option value="SGD" >SGD</option>
                                                            <option value="SOS" >SOS</option>
                                                            <option value="SYP" >SYP</option>
                                                            <option value="THB" >THB</option>
                                                            <option value="TND" >TND</option>
                                                            <option value="TOP" >TOP</option>
                                                            <option value="TRY" >TRY</option>
                                                            <option value="TTD" >TTD</option>
                                                            <option value="TWD" >TWD</option>
                                                            <option value="TZS" >TZS</option>
                                                            <option value="UAH" >UAH</option>
                                                            <option value="UGX" >UGX</option>
                                                            <option value="USD" >USD</option>
                                                            <option value="UYU" >UYU</option>
                                                            <option value="UZS" >UZS</option>
                                                            <option value="VEF" >VEF</option>
                                                            <option value="VND" >VND</option>
                                                            <option value="XAF" >XAF</option>
                                                            <option value="XOF" >XOF</option>
                                                            <option value="YER" >YER</option>
                                                            <option value="ZAR" >ZAR</option>
                                                    </select>
    </div>        
    </div>
</div>    
  )
}

 
export default App;
