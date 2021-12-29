import React , { useContext  } from 'react'
import  { InvoiceContext } from '../contexts/invoice'


const AddItemTotal = () => {

    const totalAmount = useContext(InvoiceContext)[2]
    const addNewDetails = useContext(InvoiceContext)[8]
    
    return (
        <>
            <div className=" flex-1">
              <button type="button" onClick = { ()=>addNewDetails()} className="btn mt-5 bg-yellow-500 text-gray-800 py-1 px-3 rounded border-b-2 border-r-2"> + Add Item</button>
            </div>
            <div className="mr-2 flex-1 flex justify-end items-end md:mr-10">
              <h1> <span className="text-red-800">Total : </span>  {totalAmount} </h1>
            </div>        
        </>        
    )
}

export default AddItemTotal