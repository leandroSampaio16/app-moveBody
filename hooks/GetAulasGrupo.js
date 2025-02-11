import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [AulasGrupo,SetAulasGrupo]=useState({
        data:null,
        error: null,
        load:true
    })

    const AulasDataGet =async()=>{
        SetAulasGrupo({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await APIconnection.get("/EventosOfWeek")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
 
        if(isEmpty){
         
            SetAulasGrupo({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            SetAulasGrupo({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        SetAulasGrupo({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[AulasGrupo,AulasDataGet]
}