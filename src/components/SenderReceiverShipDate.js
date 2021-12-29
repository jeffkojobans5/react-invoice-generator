import React , { useContext } from 'react';
// CONTEXT 
import {InvoiceContext} from '../contexts/invoice'
// PROPS
import TextAreas from '../props/Textareas'
import TextInput from '../props/Inputs'

const SenderReceiverShipDate = () => {
    const invoice = useContext(InvoiceContext)[0]
    const handleInvoiceChange = useContext(InvoiceContext)[3]

    return (
        <>
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
        </>
    )
}

export default SenderReceiverShipDate