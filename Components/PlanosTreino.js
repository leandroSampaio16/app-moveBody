import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { withNavigation } from 'react-navigation';

function PlanosTreino({data,loading,error,navigation, colors}) {

  const days = ["IdPlanoInfoSegunda", "IdPlanoInfoTerca", "IdPlanoInfoQuarta", "IdPlanoInfoQuinta", "IdPlanoInfoSexta", "IdPlanoInfoSabado", "IdPlanoInfoDomingo"]


  console.log("243e1dsqad")
  console.log(data)
  console.log("243e1dsqad")
    var d = new Date();
    var day =d.getDay();
    if(day == 0){
      day=0
    }
    else{
      day=day-1
    }



    let DataFlatList=[]
    let concatenatedArray = [];
    

    if (loading) return <ActivityIndicator size="large" marginVertical={30} />;
    if(error==="sem data"){
        return (
            <View  style={{alignItems:"center",marginTop:"10%"}}>
        <Text style={{fontFamily: 'System',fontSize:20,color:'white'}}>Voce ainda não tem nenhum plano</Text>
        <Text style={{fontFamily: 'System',fontSize:14,color:'gray', marginTop:"5%"}}>Fale com um dos nossos Personal Trainers</Text>
        <TouchableOpacity  onPress={() => navigation.navigate("PTScreen")} style={{backgroundColor:"rgba(118, 104, 203, 1)", height: 60, width:150, marginTop:"5%",marginBottom:"5%",borderRadius:15,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily: 'System',fontSize:20,color:'white', marginTop:"5%"}}>Contactar</Text>
        </TouchableOpacity>
        </View>
        )
    } 
    else{
    
    if(!loading && error!=="sem data" && data!==null){

      data.forEach(element => {
        element.forEach(e => {
            DataFlatList.push(e)
         })
    })
  }
    const currentDayObjects = DataFlatList.filter(x => days.indexOf(x.Day) >= day)
    const otherObjects = DataFlatList.filter(x => days.indexOf(x.Day) < day)
    concatenatedArray = currentDayObjects.concat(otherObjects)
    console.log(concatenatedArray)
    if(concatenatedArray == "")console.log("nullo")
    return (
     
       <FlatList  style={styles.FlatListHomeOptions}
    
        data={concatenatedArray} 
        renderItem={({ item, index }) => {
          return(
            <TouchableOpacity  onPress={() => navigation.navigate("PlanoTreinoInfoScreen", { data: item })}>
      <View style={{  borderRadius:15,
         width:"100%",
         height:140,
         marginTop:20,  
         backgroundColor: colors.primary[400],}}>
      <View style={styles.containerChild}>
      {index==0 && item.Day === days[day]  ? <View style={{
         width:"50%",
         marginLeft:"4%",
         alignItems:"center",
         justifyContent:"center",
         height:"100%",
         borderRadius:10,
         backgroundColor:colors.blueAccent[400]
      }}><Text style={{ fontFamily: 'System',
      fontSize:14,
      color:colors.grey[100]}}>Treino de Hoje</Text></View> : index==0 && item.Day != days[day] ? <View style={{   width:"50%",
      marginLeft:"4%",
      alignItems:"center",
      justifyContent:"center",
      height:"100%",
      borderRadius:10,
      backgroundColor:colors.blueAccent[400]}}><Text style={{fontFamily: 'System',

 
   fontSize:15,
        color:colors.grey[100]}}>Proximo Treino</Text></View>:null}

      <Text style={{
         fontFamily: 'System',
         flex:1,
         alignSelf:"flex-end",
         position:"absolute",
         right:"8%",
         fontSize:14,
         color:colors.grey[400],
         fontWeight:"bold"
      }}>{
    (() => {
      switch(item.Day) {
        case "IdPlanoInfoSegunda": return 'Segunda Feira';
        case "IdPlanoInfoTerca": return 'Terça Feira';
        case "IdPlanoInfoQuarta": return 'Quarta';
        case "IdPlanoInfoQuinta": return 'Quinta';
        case "IdPlanoInfoSexta": return 'Sexta';
        case "IdPlanoInfoSabado": return 'Sábado';
        default: return 'Qualquer Dia';
      }
    })()
  }</Text>
        </View> 
      <Text style={{fontFamily: 'System',
          marginTop:"8%",
       paddingLeft:"7%",
       fontSize:22,
            color:colors.grey[100]}}>{item.NomePlanoTreino}</Text>

      <View style={styles.TimeIconContainerParent}>
      <View style={styles.TimeIconContainer}>
     <Image style={styles.TimeIcon} source={require('../assets/timeicon.png')}/>
     <Text style={{marginLeft:"2%", paddingTop:0,fontSize:14, color:colors.grey[400],alignSelf:"flex-end",}} >{item.DuracaoPlanoTreino}</Text>
 </View>
     </View>

          </View>     
      </TouchableOpacity>
            
          
          )
        }}
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
        Vertical
        
      />
    );
    
  }
  }



  const styles = StyleSheet.create({
    FlatListHomeOptions:{
        width:"100%",
        height:"90%",
    },
    DayWorkout:{
   
    },
    DayWorkoutText:{
     
    },
    TimeIconContainerParent:{
      width:"100%",
      height:"13%",
      marginTop:"4%",
      alignItems:"flex-end"
    },
    TimeIconContainer:{
      marginEnd:"2.5%",
      width:"25%",
      height:"100%",
      flexDirection:"row",
      marginTop:0
    },
  
    TimeIcon:{
      marginLeft:"2%",
      width:"20%",
      height:"100%",
      marginRight:"10%"
   
    },
    containerChild:{
      marginTop:"5%",
      width:"100%",
      height:"15%",
      flexDirection:"row"
    },
    SmallText:{
     
    },
    container: {
      
        },
        TitleText:{
          
        },
  });

  export default withNavigation(PlanosTreino)
  