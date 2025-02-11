import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image, Linking, ActivityIndicator, Button   } from 'react-native'
import GetPtInfo from "../hooks/GetPtInfo";
import SwipePt from "../Components/SwipePt";
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import { color } from "react-native-reanimated";
import Refresh from "../Components/Refresh";

export default function PTScreen({ navigation }) {
      
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
  const [dataAssync,setdataAssync]=useState("")

  useEffect(() => {
    const getData = async () => {
      const dataClientes = await AsyncStorage.getItem('clientData');
      const parsedDataClientes = JSON.parse(dataClientes);
    
  setDataClientes(parsedDataClientes)
  setLoadAssync(false)
};
getData();
}, [refreshed]);

  const[{data,error,load},PTDataGet]=GetPtInfo()
  
  useEffect(() => {
    PTDataGet();
  }, [refreshed]);
  
  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
 
        const AssyncData = await AsyncStorage.getItem('ptInfo');
        setdataAssync(JSON.parse(AssyncData))
     


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
            
              await AsyncStorage.setItem('ptInfo', JSON.stringify(data));
              setdataAssync(data)
            //  const response=await APIconnection.get("/ClientesColaboradores")
             // ClientesData=JSON.parse(JSON.stringify(response.data))   
              // Navigate to home page after saving data to AsyncStorage
              setload(false)
              setIsConnected(true);
            }
          
    } else {

      await AsyncStorage.setItem('aulasGrupo', JSON.stringify(data));
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
  }, [refreshed, isConnected, load]);

  // Function to handle manual refresh
  const handleRefresh = () => {


    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
  }
  
  

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
        <View style={{
          width:"100%",
          height:"100%",
          flex: 1,
          backgroundColor: colors.background[100],
          alignItems: 'center',
        }}>


    
< Refresh setRefreshed={setRefreshed} colors={colors} refreshed={refreshed} />


          <View style={{width:"100%", marginBottom:"5%", height:"10%", flexDirection:"row", justifyContent: 'space-between',}}>
<TouchableOpacity 
  style={styles.HeaderIcon} 
  onPress={()=>{ navigation.navigate("home",{voltar: tokens(theme[2])})}}
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
            {
              dataAssync != null ?
                <>
                  <Text style={{fontSize:22, color:colors.blueAccent[400], marginHorizontal:"-14%", marginTop:0}}>Personal Trainers</Text>
                </>
              : null
            }
          </View>
          {
            dataAssync != null ?
              <View style={{
                alignItems:"center",
                borderRadius:30,
                marginTop:"9%",
                width:"90%",
                backgroundColor:colors.primary[400],
                height:"75%",
              }}>
                <SwipePt
  colors={colors}
  data={dataAssync.filter(item => item.ativo !== 1)}
  loading={loading}
  error={error}
  dataClientes={dataClientes}
/>
              </View>
            : null
          }
        </View>
      )}
  
      else return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
         
    }
  }


const styles = StyleSheet.create({
  Body: {
   
  },
  Swipe:{
   
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
  Header:{

    width:"100%",
    height:"5%",
    alignItems: 'center',
   
  },

});





