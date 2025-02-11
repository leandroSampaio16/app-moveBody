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


function AulasGrupoInfo({data,loading,error,dia, colors}) {




  let dayOfWeek;
switch (dia) {
  case "Segun":
    dayOfWeek = "Monday";
    break;
  case "Terc":
    dayOfWeek = "Tuesday";
    break;
  case "Quart":
    dayOfWeek = "Wednesday";
    break;
  case "Quint":
    dayOfWeek = "Thursday";
    break;
  case "Sext":
    dayOfWeek = "Friday";
    break;
  case "Sabad":
    dayOfWeek = "Saturday";
    break;
  default:
    dayOfWeek = "";
}

let filteredData
if(!loading && error === null && data !== null){
   filteredData = data.filter(item => item.day_of_week === dayOfWeek);
}





    if (loading) return <ActivityIndicator size="large" marginVertical={30} />;
    if(error == "sem data"){
      return ( 
        <View  style={{alignItems:"center",marginTop:"10%"}}>
    <Text style={{fontFamily: 'System',fontSize:18,color:colors.grey[100]}}>Não temos nenhuma aula de Grupo hoje</Text>
    </View>
    )
    }
    else if(error!=null){
        return (
            <View  style={{alignItems:"center",marginTop:"10%"}}>
        <Text style={{fontFamily: 'System',fontSize:18,color:colors.grey[100]}}>Algo deu errado</Text>
        </View>
        )
    } 
if(!loading){

  if(data == null){
    return (
      <View  style={{alignItems:"center",marginTop:"10%"}}>
      <Text style={{fontFamily: 'System',fontSize:18,color:colors.grey[100]}}>Não temos nenhuma aula de Grupo hoje</Text>
      </View>

      );
  }
      if (filteredData.length === 0) {
        return (
        <View  style={{alignItems:"center",marginTop:"10%"}}>
        <Text style={{fontFamily: 'System',fontSize:18,color:colors.grey[100]}}>Não temos nenhuma aula de Grupo hoje</Text>
        </View>

        );
      } else {
        return (
          <FlatList
            style={styles.EventOfDayFlatList}
            data={filteredData}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{
                  flexDirection:'row',
                  borderRadius:20,
                  width:370,
                  height:40,
                  marginHorizontal:10,
                  borderWidth: 1.5,
                  alignItems:"center",
              backgroundColor: colors.primary[400],
              borderColor: colors.blueAccent[400],
                  marginTop:"6%",  
                 
                }}>
                  <Text style={{fontFamily: 'System',
        fontSize:20,
        color: colors.grey[100],
        paddingLeft:"7%",
        flex:4,
        }}>{item.title}</Text>
                  <Text style={{  flex:2,
        fontSize:14,
        color: colors.grey[400],
        }}>{item.horario}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        );
      }
  
}
}


  const styles = StyleSheet.create({
    EventOfDayFlatList:{
      width:"100%",
      height:"20%"
  
    },
    EventOfDay:{
   
      },
    EventName:{

      },
      EventSchedule:{
        flex:2,
        fontSize:14,
        color:'gray'
      },
  });

  export default withNavigation(AulasGrupoInfo)