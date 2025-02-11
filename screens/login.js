
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput,Image,TouchableOpacity,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback,Linking, Button, ActivityIndicator,    } from 'react-native'
import Header  from '../Components/Header'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react';
import * as yup from "yup"
import APIconnection from '../config/APIconnection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import GetClientesColaboradores from '../hooks/GetClientesColaboradores'

export default function LoginPage({ navigation }) {
  

  const voltar = navigation.getParam("voltar")

  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")

  const [dataClientes,setDataClientes]=useState("")
  const [loadAssync,setLoadAssync] = useState(true)

  const [isConnected, setIsConnected] = useState(true);
  const [refreshed, setRefreshed] = useState(false);




  const[{data,error,load},ClientesColaboradoresDataGet]=GetClientesColaboradores()

  useEffect(() => {

    ClientesColaboradoresDataGet();
    if(!load){
      setDataClientes(data)
    }

  }, [refreshed, voltar])

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



  useEffect(() => {
     
  const checkInternetConnectivity = async () => {
    try {


      const { isConnected } = await NetInfo.fetch();
   
      const clientesData = await AsyncStorage.getItem('clientData');

      console.log("....................")
      console.log(clientesData)
      console.log("....................")
      if (isConnected) {

if((!load && error == null) || (!load && error == "sem data")){

    if (clientesData) {

    const matchingData = data.find(data => {

      console.log("CONSEGUI");
      console.log(data);
      console.log(clientesData);
      let x = true
      const parsedClientesData = JSON.parse(clientesData);

      for (const key in data) {
        if(data[key]!=parsedClientesData[key]){
          x = false
        }
        console.log(data[key])
        console.log(parsedClientesData[key])
      }

      if(x){
        return data
      }

    });

          if (matchingData) {
            console.log("------------")
            console.log(clientesData)
            console.log(matchingData)
            console.log("------------")
           
            navigation.navigate("home", { data:""}) 

            setLoadAssync(false);
            setIsConnected(true);
          
          } 
          else {

           const  dataClientes=JSON.parse(JSON.stringify(data))  

        setDataClientes(dataClientes)

        setLoadAssync(false)
           
            // Navigate to home page after saving data to AsyncStorage
            setIsConnected(true);
          }
  } else {

          // Data is not available in AsyncStorage, fetch from API
         const  dataClientes=JSON.parse(JSON.stringify(data))  
        
      setDataClientes(dataClientes)

      setLoadAssync(false)
          // Navigate to home page after saving data to AsyncStorage
          setIsConnected(true);

          //navigation.navigate('Home');
        }
} 
    }
      else {

        if (clientesData) {
            console.log("------------")
            console.log(clientesData)
            console.log("------------")

            setLoadAssync(false)
            setIsConnected(true);
            // Data is available in AsyncStorage, navigate to home page
            navigation.navigate("home");
          } 
          else{
            setIsConnected(false);
            setLoadAssync(false)
            // No internet connection, show appropriate message or UI
           
          }
  
      }
    } catch (error) {
      console.error(error);
    }
  };

    checkInternetConnectivity();
  }, [loadAssync, refreshed, isConnected, load]);
  
  // Function to handle manual refresh
  const handleRefresh = () => {
 

    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
  }
  
  

  
    const rules=yup.object({
        cliente:yup.string().required("Este campo é obrigatório"),
        senha:yup.string().required("Este campo é obrigatório").min(6,"A senha deve conter pelo menos 6 digitos")
    }) 

    const{control,handleSubmit,formState:{errors}}=useForm({
     resolver:yupResolver(rules)
    })
    const pressHandler = async (data) => {
      if (dataClientes) {
        let flag = false;
        for (const key in dataClientes) {
          console.log("%%%%%%%%%%%%%");
          console.log(data.cliente);
          console.log(dataClientes);
          console.log("%%%%%%%%%%%%%");
 
          if (
            dataClientes[key].CodigoCliente === data.cliente &&
            dataClientes[key].Senha === data.senha && dataClientes[key].ativo!=1
          ) {
            flag = true;
            console.log("ESTA CERTO");
            await AsyncStorage.setItem("clientData", JSON.stringify(dataClientes[key]));
            navigation.navigate("home");
            break; // exit the loop once a match is found
          }
        }
    
        if (!flag) {
          alert("Senha ou Codigo Cliente incorretos");
        }
      }
    };
    

    if (load || loadAssync || colors==null) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
    if (!isConnected) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}>
        <Text style={{ fontSize: 24, color:"rgba(118, 104, 203, 1)" }}>No internet connection</Text>
        <Button title="Refresh" onPress={handleRefresh} />
        </View>
      );
    } else if(colors!==null && colors!=="") {
      

  return (

    <TouchableWithoutFeedback style={styles.Body} onPress={Keyboard.dismiss} accessible={false}>
    
    <View  style={{  width:"100%",
    height:"100%",
    flex: 1,
    backgroundColor: colors.background[100],
    alignItems: 'center',}}>







      <View style={styles.Header}>
        <Header/>
      </View>
      <KeyboardAvoidingView
    style={{  width:"100%",
    height:"100%",
    flex: 1,
    backgroundColor: colors.background[100],
    alignItems: 'center',}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    
  >
   




   
      <View style={styles.Form}>
      <Text style={{
         marginLeft: "11%",
         fontSize:16,
         color:colors.grey[100],
           marginBottom:"3%"
       }}>Código Cliente</Text>
      <Controller
       control={control}
       name="cliente"
       render={({field:{onChange,value}})=>(
       <TextInput style={{
        height: "10%",
        width: '76%',
        marginBottom:"13%",
        borderBottomWidth: 1,
        borderColor: colors.grey[100],
        marginLeft: "11%",
        fontSize:14,
        color:colors.grey[100]
      }} placeholder="Ex: c15286"  value={value}  onChangeText={onChange} secureTextEntry={false} placeholderTextColor="gray" />
       )}
       />{errors.cliente &&  <Text style={{ marginLeft: "11%",
       color:colors.redAccent[400],
        fontSize:10,
        marginTop:"-11%",
        marginBottom:"10%"}}>{errors.cliente?.message}</Text>}

       <Text style={{
         marginLeft: "11%",
         fontSize:16,
         color:colors.grey[100],
           marginBottom:"3%"
       }}>Senha</Text>
       <Controller
       control={control}
       name="senha"
       render={({field:{onChange,value}})=>(
        <TextInput style={{
          height: "10%",
          width: '76%',
          marginBottom:"13%",
          borderBottomWidth: 1,
          borderColor: colors.grey[100],
          marginLeft: "11%",
          fontSize:14,
          color:colors.grey[100]
        }} placeholder="Ex: 302548" value={value} onChangeText={onChange}  secureTextEntry={true} placeholderTextColor="gray" />
       )}
       />{errors.senha &&  <Text style={{ marginLeft: "11%",
      color:colors.redAccent[400],
       fontSize:10,
       marginTop:"-11%",
       marginBottom:"10%"}}>{errors.senha?.message}</Text>}
        
      
        
      </View>


      <TouchableOpacity style={{
         marginTop:"-5%",
         borderRadius:30,
         width:'80%',
         height:75,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.blueAccent[400], 
         shadowOffset: {
           height: 4,
           width: 1
         },
         shadowColor: "#000000",
         shadowOpacity: '0.8',
         shadowRadius: '2',
      }}  onPress={handleSubmit(pressHandler)}>
        <Text style={{
            fontSize:25,
           color:colors.grey[100],
            fontWeight:"400"
        }}>Entrar</Text>
      </TouchableOpacity>
      
      <View style={styles.Footer}>
      <Text style={{  paddingTop:"5%",
 fontSize:14,
      color:colors.grey[100]}}>Não és cliente?</Text>
      <TouchableOpacity onPress={()=>{Linking.openURL('mailto:fitarenaginasio@gmail.com?subject=Subscription Contact').catch(err => console.error('An error occurred', err));}}>
      <Text style={{ paddingTop:"2%",
 fontSize:16,
 color:colors.grey[400]}}>Contacta-nos </Text>
      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
   
  );
}
    
}

const styles = StyleSheet.create({

  Body: {
  
  
  },
  Form:{
    marginTop:"25%",
    width:"100%"
  },
  Header:{
    alignItems: 'center',
    justifyContent: 'center',
    width:320,
    height:90,
    marginTop:"35%"
  },
  ButtonText:{
  
  },
  HeaderIcon:{
    flex: 1,  
    alignItems: 'flex-end',
    flexDirection:"row",
    marginLeft:"5%"
   
  },
  Button:{
   
  },
  Footer:{
    width:'80%',
    marginTop:"8%",
  },
  FooterSmallText:{
  
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
  FooterText:{
   
  },
  input:{
  
  },
  Title:{
   
  },
  labelError:{
   
  }

});





