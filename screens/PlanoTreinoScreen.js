import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image, ActivityIndicator, Button, Linking  } from 'react-native'
import GetPlanosTreino from "../hooks/GetPlanosTreino";
import PlanosTreino from "../Components/PlanosTreino";
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import Refresh from "../Components/Refresh";

export default function PlanoTreinoScreen({ navigation }) {
      
  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")

  const voltar = navigation.getParam("voltar")

  useEffect(() => {
    AsyncStorage.getItem('colorMode').then((data) => {
     
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

  const[{data,error,load},PlanosTreinoGet]=GetPlanosTreino(dataClientes["idPlanoTreino"])


  useEffect(() => {
    if (!loadAssync) {
      PlanosTreinoGet(dataClientes["IdClienteInfo"]);
    }
  }, [loadAssync,refreshed] );



  const [dataAssync,setdataAssync]=useState("")


  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('planosTreino');
    

        if (isConnected) {
          if (!loadAssync) {
          PlanosTreinoGet(dataClientes["IdClienteInfo"]);
        }
if(!load && error == null){

      if (AssyncData) {
          
            if (AssyncData==JSON.stringify(data)) {
              console.log("match")

              setdataAssync(JSON.parse(AssyncData))

             setload(false);
             setIsConnected(true);
            
            } 
            else {
            
              await AsyncStorage.setItem('planosTreino', JSON.stringify(data));
              setdataAssync(data)

            //  const response=await APIconnection.get("/ClientesColaboradores")
             // ClientesData=JSON.parse(JSON.stringify(response.data))   
              // Navigate to home page after saving data to AsyncStorage
              setload(false)
              setIsConnected(true);
            }
          
    } else {
  
      await AsyncStorage.setItem('planosTreino', JSON.stringify(data));
      setdataAssync(data)

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

          if (AssyncData) {
              setdataAssync(JSON.parse(AssyncData))
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
   setTimeout(() => {
        checkInternetConnectivity();
      }, 1000);

  }, [refreshed, isConnected, loadAssync]);


  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('planosTreino');
    

        if (isConnected) {

        
if(!load && error == null){

      if (AssyncData) {
          
            if (AssyncData==JSON.stringify(data)) {
              console.log("match")

              setdataAssync(JSON.parse(AssyncData))

             setload(false);
             setIsConnected(true);
            
            } 
            else {
            
              await AsyncStorage.setItem('planosTreino', JSON.stringify(data));
              setdataAssync(data)

            //  const response=await APIconnection.get("/ClientesColaboradores")
             // ClientesData=JSON.parse(JSON.stringify(response.data))   
              // Navigate to home page after saving data to AsyncStorage
              setload(false)
              setIsConnected(true);
            }
          
    } else {
  
      await AsyncStorage.setItem('planosTreino', JSON.stringify(data));
      setdataAssync(data)

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

          if (AssyncData) {
              setdataAssync(JSON.parse(AssyncData))
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
    setTimeout(() => {
      checkInternetConnectivity();
    }, 1000);

  }, [load]);

  // Function to handle manual refresh
  const handleRefresh = () => {



    
    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));

    setColors(tokens(theme[2]))


  }
  


  if (loading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d"}}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}>
      <Text style={{ fontSize: 24, color:"rgba(118, 104, 203, 1)" }}>No internet connection</Text>
      <Button title="Refresh" onPress={handleRefresh} />
      </View>
    );
  } else {

    if((dataAssync[0][0].ativoSemanal ==1 && !loading && colors !=="") || (dataAssync==null && !loading && colors !=="")){
      return (

        <View  style={{ width:"100%",
        height:"100%",
        flex: 1,
        backgroundColor: colors.background[100],
        alignItems: 'center',}}>
    
    < Refresh setRefreshed={setRefreshed} colors={colors} refreshed={refreshed} />
    
    <View style={{width:"100%", marginBottom:"5%", height:"10%", flexDirection:"row", justifyContent: 'space-between',}}>
    <TouchableOpacity 
      style={styles.HeaderIcon} 
      onPress={()=>{navigation.navigate("home",{voltar: tokens(theme[2])}) }}
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
          <Text style={{    fontFamily: 'System',
        fontSize:26,
        color:colors.grey[100]}}>Supervisionado pelo</Text>
          <Text style={{ paddingTop:"1%",
     fontSize:16,
          color:colors.grey[400]}}>{dataClientes["nome"]}</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center', marginTop: '15%', width:"80%" }}>
    <Text style={{ fontSize: 16, color: 'gray', marginBottom: '5%' }}>
      Você não possui um plano de treino, fale com o seu PT.
    </Text>
    <TouchableOpacity
      style={{ backgroundColor:colors.blueAccent[400], padding: "5%", borderRadius: 5, marginTop:"5%" }}
      onPress={() =>
        Linking.openURL(
          `mailto:${dataClientes.email}?subject=Subscription Contact`
        ).catch((err) => console.error('An error occurred', err))
      }
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Contatar</Text>
    </TouchableOpacity>
  </View>

          </View>
      )
    }
if(dataClientes !== "" && !loading && colors !=="" && dataAssync!==null && dataAssync[0][0].ativoSemanal !=1){

  console.log("panelasssssss")
  return (

    <View  style={{ width:"100%",
    height:"100%",
    flex: 1,
    backgroundColor: colors.background[100],
    alignItems: 'center',}}>

< Refresh setRefreshed={setRefreshed} colors={colors} refreshed={refreshed} />

<View style={{width:"100%", marginBottom:"5%", height:"10%", flexDirection:"row", justifyContent: 'space-between',}}>
<TouchableOpacity 
  style={styles.HeaderIcon} 
  onPress={()=>{navigation.navigate("home",{voltar: tokens(theme[2])}) }}
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
      <Text style={{    fontFamily: 'System',
    fontSize:26,
    color:colors.grey[100]}}>Supervisionado pelo</Text>
      <Text style={{ paddingTop:"1%",
 fontSize:16,
      color:colors.grey[400]}}>{dataClientes["nome"]}</Text>
      </View>

    

      {
            dataAssync !== null ?
            <View style={styles.Planos}>
               <PlanosTreino data={dataAssync.filter(item => item[0].ativo !== 1)} colors={colors} loading={loadAssync} error={error} />
              </View>
            : null
          }
      
 

    </View>

  );}
  
  else return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
      
}
}

const styles = StyleSheet.create({

  Body: {
   
  },
  Planos:{
    alignItems:"center",
    marginTop:"10%",
    width:"90%",
    height:"60%",
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





