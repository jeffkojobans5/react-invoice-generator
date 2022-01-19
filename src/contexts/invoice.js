import React , { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from "jspdf";
import axios from 'axios';


export const InvoiceContext = React.createContext()

export const InvoiceProvider = ( {children} ) => {

  const [ currency , setCurrency] = React.useState('GHS')
  const [ currencySym , setCurrencySym] = React.useState('₵')
  const [ currencyName , setCurrencyName] = React.useState('Ghanaian cedis')
  const [ currencyFlag , setCurrencyFlag] = React.useState('🇬🇭')

  function currencyApi () {
    axios.get(`https://restcountries.com/v3.1/currency/${currency}`).then(resp => {
      const res = resp.data[0]
      setCurrencyFlag(res['flag']);
      setCurrencyName(res['currencies'][currency]['name']);
      setCurrencySym(res['currencies'][currency]['symbol']);

      console.log(resp.data);

    }).catch((error)=>{
      console.log(new Error)
    })
  }

  // U1E3B74AA
  const handleCurrency = (e) => {
    setCurrency((e.target.value).toUpperCase());
  }      
  
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

      const [official , setOfficial ] = React.useState({
        invoice ,
      })
    
      const [info , setInfo] = React.useState({
        "data": {
            "id": new Date().valueOf(),
            "firstname": "",
            "lastname": "",
            "handle": ""
        },
        "meta": {}
    })

      const saveInvoice = () => {
        axios.post('http://localhost:1337/api/cals' , info ).then(resp => {
        console.log('master afa');
        }).catch((error)=>{
          console.log('wagyimi dodo');
        })
      }

      React.useEffect(()=> {
        let holdTotal = 0;
        for (let detail in details) {
          holdTotal += details[detail]['amount']
        }
        setTotalAmount(holdTotal)  
        console.log(details);
      },[details])


      React.useEffect(()=> {
        currencyApi()                
      },[currency])
    
      // React.useEffect(()=> {
        // handleCurrency()
      // },[currency])      


    return (
        <InvoiceContext.Provider 
        value={ [ 
          invoice , 
          details , 
          totalAmount , 
          handleInvoiceChange , 
          deleteDetails , 
          mouseLeave , 
          mouseIn , 
          handleDetails , 
          addNewDetails , 
          downloadPdf , 
          handleCurrency,  //10
          currencyFlag ,  
          currencyName ,
          currency,
          currencySym,
          saveInvoice                                 
          ]} 
          >

            {children}   
        </InvoiceContext.Provider>
    )
};


