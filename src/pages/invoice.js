// COMPONENTS
import React from 'react'
import DownloadSelectCurrency from '../components/DownloadSelectCurrency';
import AddItemTotal from '../components/AddItemTotal';
import InvoiceRows from '../components/InvoiceRows'
import InvoiceHeader from '../components/InvoiceHeader';
import SenderReceiverShipDate from '../components/SenderReceiverShipDate';
import LogoInvoiceNumber from '../components/LogoInvoiceNumber'

function Invoice() {


  return (
    <div className="box-border font-Poppins min-h-screen bg-white-100 flex flex-row justify-center items-center p-2">
      <div className="container mt-5 mx-auto w-5/6 m-10 flex flex-col sm:flex-col md:flex-row">
       <div className="form w-full bg-white  rounded p-2 md:w-4/6 ">
        <LogoInvoiceNumber />
        <div className="invoice-date flex flex-col md:flex-row"> 
          <SenderReceiverShipDate />
        </div>
        <div className="main mt-7"> 
           <InvoiceHeader/>
           <InvoiceRows />
          <div className="invoice-fields flex">
            <AddItemTotal />
          </div>     
        </div> 
      </div> 
      <div className="convert md:w-2/6 md:p-2 md:ml-2">
          <DownloadSelectCurrency />
      </div>        
    </div>
</div>    
  )
}
 
export default Invoice;
