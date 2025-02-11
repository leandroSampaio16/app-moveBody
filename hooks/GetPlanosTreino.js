import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [PlanosTreino,SetPlanosTreino]=useState({
        data:null,
        error: null,
        load:true
    })

    const PlanosTreinoGet =async(Id)=>{
        SetPlanosTreino({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await APIconnection.get("/PlanosTreino?Id="+Id+"")
        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            SetPlanosTreino({
                data:null,
                error:"sem data",
                load:false
            })   
        }
        else{
            SetPlanosTreino({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        SetPlanosTreino({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[PlanosTreino,PlanosTreinoGet]
}