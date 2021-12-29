import React , { useContext } from 'react';
import  { InvoiceContext } from '../contexts/invoice';
import TextInput from '../props/Inputs'
import TextAreas from '../props/Textareas'
import { BsFillTrashFill } from "react-icons/bs";

const InvoiceRows = () => {

    const details = useContext(InvoiceContext)[1]
    const deleteDetails = useContext(InvoiceContext)[4]
    const mouseLeave = useContext(InvoiceContext)[5]
    const mouseIn = useContext(InvoiceContext)[6]
    const handleDetails = useContext(InvoiceContext)[7]

    return (
        <>
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
        </>        
    )
}



export default InvoiceRows