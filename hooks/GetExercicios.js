import { useState } from "react"
import APIconnection from '../config/APIconnection'

export default()=>{

    const [Exercicios,SetExercicios]=useState({
        data:null,
        error: null,
        load:true
    })

    const ExerciciosGet =async(Ids)=>{
  
        SetExercicios({
            data:null,
            error:null,
            load:true
        })  
        
        try{
        const response = await APIconnection.get("/GetExercicios?ids="+Ids+"");
        const responseData = JSON.parse(JSON.stringify(response.data));
        
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            SetExercicios({
                data:null,
                error:"sem data",
                load:false
            })   
        }
        else{
            SetExercicios({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        SetExercicios({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[Exercicios,ExerciciosGet]
}