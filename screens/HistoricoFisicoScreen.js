import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image,ActivityIndicator, Button   } from 'react-native'
import Medidas from "../Components/Medidas";
import GetMedidas from "../hooks/GetMedidas";
import GetTesteForcaCliente from "../hooks/GetTesteForcaCliente";
import Forca  from "../Components/Forca";
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import Refresh from "../Components/Refresh";
import ChartComponent from "../Components/ChartComponent";

export default function HistoricoFisicoScreen({ navigation }) {
      

  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")


  const voltar = navigation.getParam("voltar")

  useEffect(() => {
    AsyncStorage.getItem('colorMode').then((data) => {
      console.log("entrou")
      if (!data) {
        setColors(tokens(theme[2]))
        AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));
      } else {
        // Notification data exists, update isOn value
        setColors(JSON.parse(data))
      }
    });
  }, [voltar]);


  const [dataClientes,setDataClientes]=useState("")

  const [loading,setload]= useState(true)   
  
 const [loadAssync,setLoadAssync] = useState(true)

  const [isConnected, setIsConnected] = useState(true);
  const [refreshed, setRefreshed] = useState(false);


  useEffect(() => {
    const getData = async () => {
      const dataClientes = await AsyncStorage.getItem('clientData');
      const parsedDataClientes = JSON.parse(dataClientes);
    
  setDataClientes(parsedDataClientes)
  setLoadAssync(false)
};
getData();
}, []);


  const[{data,error,load},MedidasGet]=GetMedidas(dataClientes["IdClienteInfo"])
  const[{dataForca,errorForca,loadForca},TesteForcaGet]=GetTesteForcaCliente(dataClientes["IdClienteInfo"])



  useEffect(() => {
    if (!loadAssync) {
    MedidasGet(dataClientes["IdClienteInfo"]);
    }
  }, [loadAssync, refreshed]);
 

  useEffect(() => {
    if (!loadAssync) {
    TesteForcaGet(dataClientes["IdClienteInfo"]);
    }
  }, [loadAssync,refreshed] );



  const [dataAssyncMedidas,setdataAssyncMedidas]=useState("")
  const [dataAssyncForca,setdataAssyncForca]=useState("")

  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('medidas');
        const AssyncData2 = await AsyncStorage.getItem('forca');
        setdataAssyncMedidas(JSON.parse(AssyncData))
        setdataAssyncForca(JSON.parse(AssyncData2))

        if (isConnected) {

        
if(!load && error == null && !loadForca && errorForca == null){

      if (AssyncData && AssyncData2) {

            if (AssyncData==JSON.stringify(data) && AssyncData2==JSON.stringify(dataForca)) {
              console.log("match")

              setdataAssyncMedidas(JSON.parse(AssyncData))
              setdataAssyncForca(JSON.parse(AssyncData2))

             setload(false);
             setIsConnected(true);
            } 
            else {
            
              await AsyncStorage.setItem('medidas', JSON.stringify(data));
              await AsyncStorage.setItem('forca', JSON.stringify(dataForca));
              setdataAssyncMedidas(JSON.parse(AssyncData))
              setdataAssyncForca(JSON.parse(AssyncData2))
            //  const response=await APIconnection.get("/ClientesColaboradores")
             // ClientesData=JSON.parse(JSON.stringify(response.data))   
              // Navigate to home page after saving data to AsyncStorage
              setload(false)
              setIsConnected(true);
            }
          
    } else {
  
      await AsyncStorage.setItem('medidas', JSON.stringify(data));
      await AsyncStorage.setItem('forca', JSON.stringify(dataForca));
      setdataAssyncMedidas(JSON.parse(AssyncData))
      setdataAssyncForca(JSON.parse(AssyncData2))
            // Data is not available in AsyncStorage, fetch from API
          //  const response=await APIconnection.get("/ClientesColaboradores")
           // ClientesData=JSON.parse(JSON.stringify(response.data))   
            // Navigate to home page after saving data to AsyncStorage
            setload(false)
            setIsConnected(true);
            //navigation.navigate('Home');
          }
        }
        else{
          console.log("algo correu mal")
        }
        } else {

          if (AssyncData && AssyncData2) {
            //  console.log("entrou")    
              setload(false)
              setIsConnected(true);
              // Data is available in AsyncStorage, navigate to home page
            } 
            else{
              setIsConnected(false);
              setload(false)
              // No internet connection, show appropriate message or UI
              console.log('No internet connection');
            }
    
        }
   
    };
    checkInternetConnectivity();
  }, [refreshed, isConnected, load, loadForca, loading]);

  // Function to handle manual refresh
  const handleRefresh = () => {


    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
  }
  




  const [isPersonal, setisPersonal] = useState(true)

  if (loading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}>
      <Text style={{ fontSize: 24, color:"rgba(118, 104, 203, 1)" }}>No internet connection</Text>
      <Button title="Refresh" onPress={handleRefresh} />
      </View>
    );
  } else {
if(dataClientes !== "" && !loading){
  return (

    <View   style={{
      width:"100%",
    height:"100%",
    flex: 1,
    backgroundColor: colors.background[100],
    alignItems: 'center'
    }}>

< Refresh setRefreshed={setRefreshed} colors={colors} refreshed={refreshed} />

<View style={{width:"100%", marginBottom:"5%", height:"10%", flexDirection:"row", justifyContent: 'space-between',}}>
<TouchableOpacity 
  style={styles.HeaderIcon} 
  onPress={()=>{navigation.navigate("home",{voltar: tokens(theme[2])})}}
>
     <Image style={styles.VoltarIcon} source={require('../assets/voltarIcon.png')}/>
     <Text style={{marginLeft:"2%", paddingTop:0,fontSize:14,color:colors.grey[400]}} >Voltar</Text>
 
     </TouchableOpacity>



     <TouchableOpacity 
  style={{  flex: 1,  
    alignItems: 'flex-end',
    flexDirection:"row",
    marginLeft:"50%"}} 
  onPress={handleRefresh}
>

<Image
  style={{
    marginLeft:"30%",
    width:"40%",
    height:"26%",
  }}
  source={require('../assets/day-and-night.png')}
/>

 
     </TouchableOpacity>
     </View>
   
     <View style={styles.Header}>
 
     <Image
          source={{
            uri:dataClientes["perfil"],
          }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 200 / 2
          }}
          />
      </View>

      <View style={styles.Welcome}>
      <Text style={{
          fontFamily: 'System',
          fontSize:26,
          color:colors.grey[100]
      }}>Supervisionado pelo</Text>
      <Text style={{
           paddingTop:"1%",
           fontSize:16,
                color:colors.grey[400]
      }}>{dataClientes["nome"]}</Text>
      </View>

      <View style={{
        marginLeft:"55%",
           width:"20%",
           height:"5%",
           borderRadius:20,
           marginTop:"5%",
      }}>   
      

      <TouchableOpacity 
  style={{flexDirection:"row", justifyContent: 'space-between' }} 
  onPress={()=> navigation.navigate("Compare",{voltar: dataClientes})}
>
<Text style={{ paddingTop:"10%",fontSize:14,color:colors.grey[400]}} >Comparar</Text>
<Image
  style={{

    width:25,
    height:25,
    marginHorizontal:"8%"
  }}
  source={require('../assets/grafico-de-barras.png')}
/>

 
     </TouchableOpacity>

      </View>

      <View style={{
           marginBottom:"5%",
           flexDirection:'row',
           width:"90%",
           height:45,
           borderRadius:20,
        
           backgroundColor:colors.primary[400]
      }}>

<TouchableOpacity activeOpacity={1} style={[isPersonal ? {    marginVertical:"1%",
    height:"82%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]} : styles.containerNotSelected]} onPress={()=>{if(!isPersonal){setisPersonal(true)}}}>
  <Text style={{color:colors.blueAccent[100],fontSize:16}}>Medidas</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={1} style={[isPersonal ? styles.containerNotSelected :{    marginVertical:"1%",
    height:"82%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]}]} onPress={()=>{if(isPersonal){setisPersonal(false)}}}>
  <Text style={{color:colors.blueAccent[100],fontSize:16}}>Testes de Força</Text>
</TouchableOpacity>
</View>
{isPersonal ? 

    <View style={styles.Planos}>
        <Medidas colors={colors} data={dataAssyncMedidas} loading={loadAssync} error={error} />
    </View>


:


<View style={styles.Planos}>
        <Forca colors={colors} data={dataAssyncForca} loading={loadAssync} error={errorForca} />
    </View>


}
    
    </View>

  );}
  
  else return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
      
  }
}

const styles = StyleSheet.create({
  containerOptions:{
 
  },
  containerNotSelected:{
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",

  },
  containerSelected:{

  },
  Planos:{
    alignItems:"center",
    width:"90%",
    height:"50%",
  },
  Welcome:{
    marginTop:"8%",
    width:"100%",
    alignItems:"center"
  },
  TitleText:{
  
  },

  SmallText:{
   
 
  },
 Header:{
    width:"80%",
    height:"10%",
    alignItems:"center",
    marginTop:"5%"
  },
  HeaderIcon:{
    flex: 1,  
    alignItems: 'flex-end',
    flexDirection:"row",
    marginLeft:"5%"
   
  },
  VoltarIcon:{
    marginLeft:"2%",
    width:"20%",
    height:"25%",
 
  },
  VoltarIcon1:{
    marginLeft:"45%",
    width:"20%",
    height:"25%",
 
  },
});





