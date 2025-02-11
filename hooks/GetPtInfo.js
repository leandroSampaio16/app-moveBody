import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [PtInfo,SetPtInfo]=useState({
        data:null,
        error: null,
        load:false
    })

    const PTDataGet =async()=>{
        SetPtInfo({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await APIconnection.get("/PtInfo")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            SetPtInfo({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            SetPtInfo({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        SetPtInfo({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[PtInfo,PTDataGet]
}