import React , { useContext } from 'react'

// PROPS
import TextInput from '../props/Inputs'

// CONTEXT
import  { InvoiceContext } from '../contexts/invoice'


const InvoiceHeader = () => {
    const invoice = useContext(InvoiceContext)[0]
    const handleInvoiceChange = useContext(InvoiceContext)[3]

    return (
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
          </div>        
    )
}


export default InvoiceHeader