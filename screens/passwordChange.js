
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

export default function PasswordChange({ navigation }) {
  

  const voltar = navigation.getParam("voltar")
  const dataClientes = navigation.getParam("data")


  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")

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

  async function atualizarClientes(values) {
   
  }


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


  
  // Function to handle manual refresh
  const handleRefresh = () => {
 

    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
  }
  
  

  
    const rules=yup.object({
      email: yup
    .string()
    .required('Este campo é obrigatório')
    .email('Digite um email válido'),
      senha1: yup
      .string()
      .required('Este campo é obrigatório')
      .min(6, 'A senha deve conter pelo menos 6 digitos'),
    senha2: yup
      .string()
      .required('Este campo é obrigatório')
      .min(6, 'A senha deve conter pelo menos 6 digitos')
      .test('match', 'As senhas não coincidem', function (value) {
        return value === this.parent.senha1;
      }),
    }) 

    const{control,handleSubmit,formState:{errors}}=useForm({
     resolver:yupResolver(rules)
    })

    async function pressHandler(data) {

      console.log("------------")
      console.log(data)
      console.log(dataClientes.IdClienteInfo)
      console.log("------------")
  
  
      const formData = new FormData();
      formData.append('IdClienteInfo', dataClientes.IdClienteInfo);
      formData.append('Nome', dataClientes.NomeCliente);
      formData.append('Senha', data.senha1);
      formData.append('Email', data.email);
      let jsonObject = {};
    
      for (const part of formData.getParts()) {
          jsonObject[part.fieldName] = part.string;
      }
      try {
        const response = await APIconnection.post('/UpdateClientesApp', jsonObject);
    
          clearData() // delete all stored data
          navigation.navigate('login');
      
      } catch (error) {
        console.error(error);
      }

  
    }
    
    const [showPassword, setShowPassword] = useState(true);



    if (colors==null) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
   
   else if(colors!==null && colors!=="") {
      

  return (

    <TouchableWithoutFeedback style={{
      width:"100%",
      height:"100%",
      flex: 1,
      backgroundColor: colors.background[100],
      alignItems: 'center',
  }} onPress={Keyboard.dismiss} accessible={false}>
    
   
    <View  style={{
        width:"100%",
        height:"100%",
        flex: 1,
        backgroundColor: colors.background[100],
        alignItems: 'center',
    }}>

    <View style={{width:"100%", marginBottom:"5%", height:"10%", flexDirection:"row", justifyContent: 'space-between',}}>

 


<TouchableOpacity 
  style={styles.HeaderIcon} 
  onPress={async () => {

    navigation.navigate("InformacoesPessoaisScreen",{voltar: tokens(theme[2])})
  }}
>
     <Image style={styles.VoltarIcon} source={require('../assets/voltarIcon.png')}/>
     <Text style={{marginLeft:"2%", paddingTop:0,fontSize:14,color:colors.grey[100]}} >Voltar</Text>
 
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




      <View style={{width:"100%",height:"100%",alignItems:"center", marginTop:"10%"}}>

   
      <View style={{  flexDirection:'row',
    width:"86%",

    marginTop:"15%",
    borderBottomWidth: 1,
    borderColor: "gray",}}>


<View style={{ 
    flex:10,
    height:"100%"}}>
<Text style={{color:colors.grey[100],fontSize:14}}>Senha</Text>

<Controller
control={control}
name="email"
render={({field:{onChange,value}})=>(
<TextInput
editable={true}
style={
 {
paddingTop:"5%",
paddingBottom:"2%",
color:colors.grey[100],
fontSize:16,
}}
defaultValue={dataClientes.EmailCliente}
value={value}
caretHidden={true}
placeholder="Tipo email necessário"
placeholderTextColor="gray" onChangeText={onChange}
/>
)}
/>{errors.email &&  <Text style={{ 
  marginTop:"5%",
      color:colors.redAccent[400],
       fontSize:10,
   
    }}>{errors.email?.message}</Text>}



</View>
</View>

   <View style={{  flexDirection:'row',
    width:"86%",
    height:"7%",
    marginTop:"15%",
    borderBottomWidth: 1,
    borderColor: "gray",}}>


<View style={{ 
    flex:10,
    height:"100%"}}>
<Text style={{color:colors.grey[100],fontSize:14}}>Senha</Text>

<Controller
control={control}
name="senha1"
render={({field:{onChange,value}})=>(
<TextInput
editable={true}
style={
 {
paddingTop:"5%",
color:colors.grey[100],
fontSize:16,
}}
defaultValue={dataClientes.Senha}
value={value}
secureTextEntry={showPassword}
caretHidden={true}
placeholder="No mínimo 6 caracteres"
placeholderTextColor="gray" onChangeText={onChange}
/>
)}
/>{errors.senha1 &&  <Text style={{ 
  marginTop:"5%",
      color:colors.redAccent[400],
       fontSize:10,
   
    }}>{errors.senha1?.message}</Text>}



</View>

<TouchableOpacity style={{ marginLeft:"6%",paddingTop:"5%",
    flex:2,
    height:"100%"}} onPress={()=> {setShowPassword(!showPassword)}}>
<Image style={{height:"50%",width:"60%"}}  source={showPassword ? require('../assets/show.png'): require('../assets/hide.png')}/>
</TouchableOpacity>
</View>


   
<View style={{  flexDirection:'row',
    width:"86%",

    marginTop:"15%",
    borderBottomWidth: 1,
    borderColor: "gray",}}>


<View style={{ 
    flex:10,
    height:"100%"}}>
<Text style={{color:colors.grey[100],fontSize:14}}>Repetir Senha</Text>

<Controller
control={control}
name="senha2"
render={({field:{onChange,value}})=>(
<TextInput
editable={true}
style={
 {
paddingTop:"5%",
color:colors.grey[100],
fontSize:16,
}}
value={value}
secureTextEntry={showPassword}
caretHidden={true}
placeholder="No mínimo 6 caracteres"
placeholderTextColor="gray" onChangeText={onChange}
/>
)}
/>
{errors.senha2 &&  <Text style={{ 
  marginTop:"5%",
      color:colors.redAccent[400],
       fontSize:10,
   
    }}>{errors.senha2?.message}</Text>}


</View>

</View>






      <TouchableOpacity style={{
         marginTop:"25%",
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
        }}>Alterar Senha</Text>
      </TouchableOpacity>
    




      <StatusBar style="auto" />
    </View>
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
    marginTop:"15%"
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





