import React , { useContext } from "react";
// CONTEXT 
import {InvoiceContext} from '../contexts/invoice'
// PROPS
import TextInput from '../props/Inputs'

const LogoInvoiceNumber = () => {

    const invoice = useContext(InvoiceContext)[0]
    const handleInvoiceChange = useContext(InvoiceContext)[3]

    return (
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
    )
}

export default LogoInvoiceNumber