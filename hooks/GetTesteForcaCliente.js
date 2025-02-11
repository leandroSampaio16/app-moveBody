import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [TesteForca,SetTesteForca]=useState({
        dataForca:null,
        errorForca: null,
        loadForca:true
    })

    const TesteForcaGet =async(Id)=>{
        SetTesteForca({
            dataForca:null,
            errorForca:null,
            loadForca:true
        })  
        try{
        const response=await APIconnection.get("/TesteForcaCliente?Id="+Id+"")
        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            SetTesteForca({
                dataForca:null,
                errorForca:"sem data",
                loadForca:false
            })   
        }
        else{
            SetTesteForca({
                dataForca:JSON.parse(JSON.stringify(response.data)),
                errorForca:null,
                loadForca:false
            })    
        }
    }
    catch(error){
        SetTesteForca({
            dataForca:null,
            errorForca:error,
            loadForca:false
        })
    }
      
      }
      return[TesteForca,TesteForcaGet]
}