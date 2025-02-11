import React from "react";
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

function Medidas({data,loading,error,navigation, colors}) {



   /* let DataFlatList=[]
    if(!loading && error==null){
      data.forEach(element => {
        element.forEach(e => {
            DataFlatList.push(e)
         })
    })
}

   
    console.log("----------")
    console.log(DataFlatList)*/
   

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
    
    return (
     
       <FlatList  style={styles.FlatListHomeOptions}
    
        data={data} 
        renderItem={({ item, index }) => {
          return(
            <TouchableOpacity  onPress={() => navigation.navigate("MedidaClienteScreen", { data: item })}>
      <View style={{   borderRadius:15,
        width:"100%",
         height:140,
         marginTop:20,  
         backgroundColor: colors.primary[400],}}>
      <View style={styles.containerChild}>
      
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
         if(item.DataAvaliacao!=null){
            let dateArray = item.DataAvaliacao.split("T00");
            return dateArray[0]
         }
         else{
            return "Sem data"
         }
        

    })()
  }</Text>
  <View style={{
      width:"50%",
      marginLeft:"4%",
      alignItems:"center",
      justifyContent:"center",
      height:"100%",
      borderRadius:10,
      backgroundColor:colors.blueAccent[400]
  }}><Text style={{
    fontFamily: 'System',
    fontSize:14,
    color:colors.grey[100]
  }}>Avaliado por {item.nome}</Text></View>
</View>
 <Text style={{
       fontFamily: 'System',
       marginTop:"10%",
    paddingLeft:"7%",
    fontSize:22,
         color:colors.grey[100]
 }}>Avaliação nº {item.NumeroAvaliacao}</Text>
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

  const styles = StyleSheet.create({
    TitleText:{
   
      },
    SmallText:{
      
      },
     containerChild:{
      marginTop:"5%",
      width:"100%",
      height:"15%",
      flexDirection:"row"
    },
    CriadorText:{
     
      },
    Criador:{
      
      },
    FlatListHomeOptions:{
        width:"100%",
        height:"90%",
    },
    container: {
     
        },
  });

  export default withNavigation(Medidas)
  