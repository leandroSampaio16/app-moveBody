
import React, { useState,useEffect, useRef } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image, FlatList , ActivityIndicator, Button  } from 'react-native'
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import GetExercicios from "../hooks/GetExercicios";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { tokens, useMode} from "../theme";
import Refresh from "../Components/Refresh";

function PlanoTreinoInfoScreen({navigation}) {


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


  const dataClientes=navigation.getParam("data")

  const [datainfo,setDataClientes]=useState("")

  useEffect(() => {
    const getData = async () => {
      const dataClientes = await AsyncStorage.getItem('ExerciciosIdPlanoInfoSegunda');
      const parsedDataClientes = JSON.parse(dataClientes);
      
  setDataClientes(parsedDataClientes)
};
getData();
}, [refreshed]);


  const [isConnected, setIsConnected] = useState(true);
  const [refreshed, setRefreshed] = useState(false);
  const [loading,setload]= useState(true)   
  const repeticoes = dataClientes.ListaRepeticoesExercicio.split(";")
  const [dataAssync,setdataAssync]=useState("")

  const[{data,error,load},ExerciciosGet]=GetExercicios(dataClientes.ListaExercicios)

  useEffect(() => {
   
      ExerciciosGet(dataClientes.ListaExercicios);
    
  }, [dataClientes.ListaExercicios, refreshed]);

  useEffect(() => {

    const checkInternetConnectivity = async () => {

        const { isConnected } = await NetInfo.fetch();
        const AssyncData = await AsyncStorage.getItem('Exercicios'+dataClientes.Day);
     

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
            
              await AsyncStorage.setItem('Exercicios'+dataClientes.Day, JSON.stringify(data));
              setdataAssync(data)

            //  const response=await APIconnection.get("/ClientesColaboradores")
             // ClientesData=JSON.parse(JSON.stringify(response.data))   
              // Navigate to home page after saving data to AsyncStorage
              setload(false)
              setIsConnected(true);
            }
          
    } else {
  
      await AsyncStorage.setItem('Exercicios'+dataClientes.Day, JSON.stringify(data));
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
    checkInternetConnectivity();
  }, [refreshed, isConnected, load]);





  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const [itemSelected, setItemSelected] = useState({});
  const [indexSelected, setIndexSelected] = useState("")
  const snapPoints = ["60%"];


  function handlePresentModal() {

    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }


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
if(dataClientes !== "" && !loading && dataAssync !== "" && dataAssync?.length !== 0 && dataAssync!==""){

//#AFB7D4

  return (
    <BottomSheetModalProvider>
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
  onPress={()=>{navigation.navigate("PlanoTreinoScreen",{voltar: tokens(theme[2])}) }}
>
     <Image style={styles.VoltarIcon} source={require('../assets/voltarIcon.png')}/>
     <Text style={{marginLeft:"2%", paddingTop:0,fontSize:14,color:'gray'}} >Voltar</Text>
 
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


   
     
     <View style={{width:"100%",height:"100%", marginTop:"5%", backgroundColor:colors.primary[400],borderTopLeftRadius: 50, borderTopRightRadius: 50  }}>

     <Text style={{ fontSize:30, fontWeight:"500", color:colors.blueAccent[400] ,margin:20}}>{dataClientes.NomePlanoTreino}</Text>

     <View style={{width:"100%", flexDirection:"row"}}>

     <View style={{width:"50%", height: 30, borderRightWidth:1, borderRightColor:"#C7C9FF" }}>
     < Text style={{fontSize:18, fontWeight:"500", color:colors.grey[100], marginLeft:20, marginTop:-2}}>{dataClientes.nomeGrupoPlanos}</Text>
     < Text style={{fontSize:14, fontWeight:"500", color:colors.grey[400], marginLeft:20, marginTop:0}}>Objetivo</Text>
     </View>
  <View style={{width:"50%",  height: 30}}>
  < Text style={{fontSize:18, fontWeight:"500", color:colors.grey[100], marginLeft:20, marginTop:-2}}>{dataClientes.DuracaoPlanoTreino}</Text>
  < Text style={{fontSize:14, fontWeight:"500", color:colors.grey[400], marginLeft:20, marginTop:0}}>Duração</Text>

  </View>
  
     </View>
     <View style={{width:"100%", alignItems:"center",marginTop:15}}><View style={{width:"90%",  height: 1, backgroundColor:"#C7C9FF"}}></View></View>

     <View style={{width:"100%",marginLeft:20,marginTop:25, marginBottom:10, flexDirection:"row"}}>
     <Text style={{ fontSize:20, fontWeight:"500", color:colors.grey[100]}}>Exercícios</Text>
     <Text style={{ fontSize:14,margin:5, color:colors.grey[400]}}>({dataAssync?.length})</Text>
     </View>

      <FlatList style={{width:"100%"}}
 data={dataAssync.filter(item => item[0].ativo !== 1)}
      renderItem={({ item, index }) => {

        return(
          <View style={{width:"100%", alignItems: 'center'}}>
       <TouchableOpacity   onPress={() => {
          handlePresentModal();
          setIndexSelected(index);
          setItemSelected(item);
        }} style={{
        
    width: "90%",
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderBottomColor: "#C7C9FF",
    borderBottomWidth: index === dataAssync?.length - 1 ? 0 : 1
}}>
          <View style={styles.viewFlat}>
          <Image style={{
               width:110,
               height: 120,
               borderRadius:5,
               backgroundColor:colors.blueAccent[400]
          }} source={{ uri: item[0].source }} />

          <View style={{ flexDirection: 'column' }}>
  <View style={{margin:10}}>
    <Text style={{ fontSize:20, fontWeight:"500",color:colors.grey[100]}}>{item[0].nome}</Text>
  </View>

  <View style={{marginLeft:10, marginTop:0}}>
    <Text style={{ fontSize:16,margin:5, color:colors.grey[400]}}>{repeticoes[index]}</Text> 
  </View>
</View>


          </View>
          </TouchableOpacity>

   
          </View>
        )


      }}
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
        Vertical
    />



<BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >        
        <View style={{ alignItems:"center", width:"100%" }}>
        <View style={{ width:"100%" }}>
        <Text style={{ fontSize:26, fontWeight:"500", margin:"5%", marginBottom:0}}>{itemSelected[0]?.nome}</Text>
      
        </View>
        <View style={{flexDirection:"row", alignItems:"center", width:"100%" }}>

        <View style={{flexDirection:"row", flex:1, margin:"5%", marginTop:"3%"}}>

            <Text style={{ fontSize:16, fontWeight:"500", color:"black"}}>Reps</Text>
            <Text style={{  fontSize:16,margin:5, color:"gray", margin:"5%", marginTop:"1%"}}>{repeticoes[indexSelected]}</Text>

            </View>

            <View style={{flexDirection:"row", flex:1, margin:"5%", marginTop:"3%"}}>

            <Text style={{ fontSize:16, fontWeight:"500", color:"black"}}>Rest</Text>
            <Text style={{ flex:1, fontSize:16,margin:5, color:"gray", margin:"5%", marginTop:"1%"}}>{itemSelected[0]?.rest}</Text>
            
     </View>

        </View>
 <Image style={{ width:"90%",
    height: "70%",
    borderRadius:5,
    backgroundColor:colors.blueAccent[400]}} source={{ uri: itemSelected[0]?.source }} />

</View>
        
        </BottomSheetModal>



</View>
    </View>
    </BottomSheetModalProvider>
  );}
  
  else return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
      
  }
  }


 


const styles = StyleSheet.create({
    image:{
width:222,
height:260,
    },
  Body: {

  },
  Video:{
 
 },


 viewFlat:{
  borderRadius:15,
  width:"100%",
  marginBottom:10,
  flexDirection:"row",
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

export default PlanoTreinoInfoScreen





