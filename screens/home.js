import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,Image,FlatList,TouchableOpacity,ActivityIndicator,Button,  RefreshControl,   ScrollView,    } from 'react-native';
import Header  from '../Components/Header' 
import HomeOption from '../Components/HomeOptions';
import DayClasses from '../Components/DayClasses';
import axios from "axios"
import GetAulasGrupo from "../hooks/GetAulasGrupo";
import AulasGrupoInfo from "../Components/AulasGrupoInfo";
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import { color } from "react-native-reanimated";
import Refresh from "../Components/Refresh";

export default function Home({ navigation }) {







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

  useEffect(() => {
    const getData = async () => {
      const dataClientes = await AsyncStorage.getItem('clientData');
      const parsedDataClientes = JSON.parse(dataClientes);
      
  setDataClientes(parsedDataClientes)
};
getData();
}, [refreshed]);






  var d = new Date();
  var day =d.getDay();
  if(day==0){
    day==6
  }
  
  const WeekClasses = [
    {
      Dia:"2",
      NomeDia:"Segun",
    
    },
    {
     Dia:"3",
      NomeDia:"Terc",
  
    },
    {
      Dia:"4",
      NomeDia:"Quart",
   
    },
    {
      Dia:"5",
      NomeDia:"Quint",
   
    },
    {
      Dia:"6",
      NomeDia:"Sext",
    },
    {
      Dia:"7",
      NomeDia:"Sabad",
    },
    
  ];

  const[term,setTerm]=useState(day === 0 ? 2 : day+1)


  const [dia, setDia] = useState(WeekClasses[day === 0 ? 0 : day-1].NomeDia);


  const[Null,setNull]=useState(false)
  

  const[{data,error,load},AulasDataGet]=GetAulasGrupo()


  useEffect(() => {
    AulasDataGet();
  }, [refreshed])


  const [loading,setload]= useState(true)   
  
  const [dataAssync,setdataAssync]=useState("")

  const [isConnected, setIsConnected] = useState(true);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('aulasGrupo');
        setdataAssync(JSON.parse(AssyncData))
     


        if (isConnected) {
          
          AulasDataGet();

if((!load && error == null) || (!load && error == "sem data")){
      console.log("ESTOU AQUIII BOIIIII")
      console.log(data)
      if (AssyncData) {


          console.log("---------------")
          console.log(AssyncData)
          console.log("---------------")
          console.log("&&&&&&&&&&&&")
          console.log(data)
          console.log("&&&&&&&&&&&&")


            if (AssyncData==JSON.stringify(data)) {
              console.log("match")
              console.log(AssyncData)
              console.log(JSON.stringify(data))
              
              setdataAssync(data)
              setIsConnected(true);
             setload(false);
            
            } 
            else {
            console.log("notmatch")
            console.log(AssyncData)
            console.log(JSON.stringify(data))
            
              await AsyncStorage.setItem('aulasGrupo', JSON.stringify(data));
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
 
      setTimeout(() => {
        checkInternetConnectivity();
      }, 1000);
     
  }, [refreshed, isConnected]);

  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('aulasGrupo');
        setdataAssync(JSON.parse(AssyncData))
     


        if (isConnected) {
         

if((!load && error == null) || (!load && error == "sem data")){
      console.log("ESTOU AQUIII BOIIIII")
      console.log(data)
      if (AssyncData) {


          console.log("---------------")
          console.log(AssyncData)
          console.log("---------------")
          console.log("&&&&&&&&&&&&")
          console.log(data)
          console.log("&&&&&&&&&&&&")


            if (AssyncData==JSON.stringify(data)) {
              console.log("match")
              console.log(AssyncData)
              console.log(JSON.stringify(data))
              
              setdataAssync(data)
              setIsConnected(true);
             setload(false);
            
            } 
            else {
            console.log("notmatch")
            console.log(AssyncData)
            console.log(JSON.stringify(data))
            
              await AsyncStorage.setItem('aulasGrupo', JSON.stringify(data));
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
 
      setTimeout(() => {
        checkInternetConnectivity();
      }, 1000);
     
  }, [load, data]);



  
  const [firstLoad, setFirstLoad] = useState(false);
  // Function to handle manual refresh
  const handleRefresh = () => {
 

    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
   
  }
  
  



  const commonCategories = [
    {
     
      name:"Plano de Treino",
      Href:"PlanoTreinoScreen"
    },
    {
     
      name:"Personal Trainers",
      Href:"PTScreen"
     
    },
    {
      
      name:"Histórico Físico",
        Href:"HistoricoFisicoScreen"
    },
    {
      
      name:"Informações Pessoais",
        Href:"InformacoesPessoaisScreen"
    },
  ];

  const clearData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => key !== 'colorMode');
      await AsyncStorage.multiRemove(filteredKeys);
      console.log('Data cleared successfully.');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };
 
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
    <View  style={{
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
  onPress={async () => {

   navigation.navigate("login",{voltar: tokens(theme[2])})      
   clearData();   
  }}
>
     <Image style={styles.VoltarIcon} source={require('../assets/logoutIcon.png')}/>
     <Text style={{marginLeft:"2%", paddingTop:0,fontSize:14,color:colors.grey[100]}} ></Text>
 
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
        <Header />
      </View>

      <View style={styles.Welcome}>
      <Text style={{   fontFamily: 'System',
    fontSize:22,
    color:colors.grey[100]
    }}>Bem vindo</Text>
      <Text style={{ 
    paddingTop:"1%",
 fontSize:14,
 color:colors.grey[400]}}>{dataClientes["NomeCliente"]}</Text>
      </View>

      <FlatList  style={styles.FlatListDayPlans}
    
    data={WeekClasses} 
    keyExtractor={(category) => category.NomeDia}
    contentContainerStyle={{alignItems:"center",}}
    renderItem={({ item, index }) => {
      return(

        <DayClasses Dia={item.Dia} NomeDia={item.NomeDia} colors={colors} active={item.Dia==term} handlePress={()=>{setTerm(item.Dia); setDia(item.NomeDia)}}></DayClasses>

      )
    }}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    horizontal   
  />

{!loading && (
<View style={styles.EventOfDayFlatList}>
    <AulasGrupoInfo data={dataAssync} dia={dia} loading={loading} colors={colors} error={error}></AulasGrupoInfo>
</View>
)}




      <FlatList  style={styles.FlatListHomeOptions}
    
        data={commonCategories} 
        keyExtractor={(category) => category.name}
        renderItem={({ item, index }) => {
          return(

            <HomeOption data={dataClientes} colors={colors} TextContainer={item.name} RoutePage={item.Href} Index={index}></HomeOption>
          
          )
        }}
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
        Vertical
        
      />
    

      </View>
     
      
  );
}
  
else return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
}}

const styles = StyleSheet.create({
  HeaderIcon:{
    flex: 1,  
    alignItems: 'flex-end',
    flexDirection:"row",
    marginLeft:"5%"
   
  },
  EventOfDayFlatList:{
    width:"100%",
    height:80

  },
  EventName:{
    fontFamily: 'System',
    fontSize:20,
    color:'gray',
    paddingLeft:"7%",
    flex:4,
  },
  EventSchedule:{
    flex:2,
    fontSize:14,
    color:'gray'
  },
  TitleText:{
    fontFamily: 'System',
    fontSize:22,
    color:'white'
  },

  SmallText:{
  
  },
  Welcome:{
    marginTop:"10%",
    width:"100%",
    alignItems:"center"
  },
  FlatListDayPlans:{
    marginTop:"10%",
    width:"100%",
    height:"20%",
    borderBottomWidth: 1,
    borderBottomColor:"rgb(45,45,51)",
    borderTopWidth: 1,
    borderTopColor:"rgb(45,45,51)",
  },
  FlatListHomeOptions:{
    marginTop:"5%",
    width:"90%",
    overflow:"hidden"
  },
  Header:{
    width:"80%",
    height:"10%",
    marginTop:"4%"
  },
  VoltarIcon:{
    marginLeft:"2%",
    width:"20%",
    height:"25%",
 
  },
  VoltarIcon1:{
  
 
  },
  Body: {
    
  
  },
});