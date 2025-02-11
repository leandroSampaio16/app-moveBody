import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [Medidas,SetMedidas]=useState({
        data:null,
        error: null,
        load:true
    })

    const PageCompararGet =async(Id)=>{
        SetMedidas({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await APIconnection.get("/PageComparar?id="+Id+"")
        const responseData = JSON.parse(JSON.stringify(response.data));
        const isEmpty = responseData.every && responseData.every(innerArray => innerArray.length === 0);
        
        if (isEmpty) {
          SetMedidas({
            data: null,
            error: "sem data",
            load: false
          });
        }
        else{
            SetMedidas({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        SetMedidas({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[Medidas,PageCompararGet]
}