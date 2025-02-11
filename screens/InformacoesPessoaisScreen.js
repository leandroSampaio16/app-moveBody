import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Keyboard,TouchableWithoutFeedback,Linking,Alert    } from 'react-native'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import APIconnection from "../config/APIconnection";
import NetInfo from '@react-native-community/netinfo';
import { AsyncStorage } from 'react-native';
import { tokens, useMode} from "../theme";
import { color } from "react-native-reanimated";
import Refresh from "../Components/Refresh";

export default function InformacoesPessoaisScreen({ navigation }) {

  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")
  const [refreshed, setRefreshed] = useState(false);

  const handleRefresh = () => {


    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
   
  }
  


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

  useEffect(() => {
    AsyncStorage.getItem('notificationData').then((data) => {
      const notificationData = JSON.parse(data);
      setIsOn(notificationData?.isOn);
    });
  }, []);

  const dataClientes=navigation.getParam("data")

  const [isOn, setIsOn] = useState("")
  const [isPersonal, setisPersonal] = useState(true)
  const [isShow, setisShow] = useState(true)


  useEffect(() => {
    AsyncStorage.getItem('notificationData').then((data) => {
      if (!data) {
        // Create notification data if it does not exist
        AsyncStorage.setItem('notificationData', JSON.stringify({ isOn: isOn }));
      } else {
        // Notification data exists, update isOn value
        const notificationData = JSON.parse(data);
        notificationData.isOn = isOn;
        AsyncStorage.setItem('notificationData', JSON.stringify(notificationData));
      }
    });
  }, [isOn]);

console.log(isOn)


  const[isSenha,setisSenha]=useState(false)
  const[isEmail,setisEmail]=useState(false)
  const[isConnected,setisConnected]=useState(false)
  const checkInternetConnectivity = () => {
    NetInfo.fetch().then(state => {
      setisConnected(state.isConnected)
    });
  }
  checkInternetConnectivity()

  const rules=yup.object({
    NomeCliente:yup.string().required("Este campo é obrigatório").default(dataClientes.NomeCliente),
    Senha:yup.string().required("Este campo é obrigatório").min(6,"A senha deve conter pelo menos 6 digitos").default(dataClientes.Senha),
    Email:yup.string().required("Este campo é obrigatório").email("Formato de email inválido").default(dataClientes.EmailCliente)
}) 

const{control,handleSubmit,formState:{errors}}=useForm({
 resolver:yupResolver(rules)
})


const customAlert = () => {
  Alert.alert(
    'Dados Atualizados',
    null,
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  )
}




if(colors!=="" && colors!==null && colors!==undefined){
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

    navigation.navigate("home",{voltar: tokens(theme[2])})
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

     <View style={styles.Welcome}>
      <Text style={{
         fontFamily: 'System',
         fontSize:26,
         color:colors.grey[100]
      }}>Informacões Pessoais</Text>
      </View>

      <View style={[{    alignItems:"center",
    flexDirection:'row',
    width:"90%",
    borderRadius:15,
    height:60,
    marginTop:"4%",
    backgroundColor:colors.primary[400],}, {marginTop:"15%"}]}>
      <Text style={{marginLeft:"5%",color:colors.grey[100],fontSize:16,flex:5}}>Notificações</Text>
      <TouchableOpacity style={[ isOn==false ? {
          backgroundColor:colors.grey[400],
          width:"10%",
          height:"50%",
          marginRight:"7%",
          borderRadius:20,
          flex:1
      }:{ 
    backgroundColor:colors.blueAccent[400],
    width:"10%",
    height:"50%",
    marginRight:"7%",
    borderRadius:20,
    flex:1}]} onPress={()=> {if(isOn){setIsOn(false)}else{setIsOn(true)}}}>
      <View style={isOn==false ? styles.containerSwitchCirclePressed:styles.containerSwitchCircle}></View>
      </TouchableOpacity>
      </View>

      <View style={{
           marginBottom:"5%",
           flexDirection:'row',
           width:"90%",
           height:45,
           borderRadius:20,
           marginTop:"9%",
           backgroundColor:colors.primary[400]
      }}>

      <TouchableOpacity activeOpacity={1} style={[isPersonal ? { marginVertical:"1%",
    height:"82%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]} : styles.containerNotSelected]} onPress={()=>{if(!isPersonal){setisPersonal(true)}}}>
        <Text style={{color:colors.grey[100],fontSize:16}}>Utilizador</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={[isPersonal ? styles.containerNotSelected :  {marginVertical:"1%",
    height:"82%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]}]} onPress={()=>{if(isPersonal){setisPersonal(false)}}}>
        <Text style={{color:colors.grey[100],fontSize:16}}>Personal Trainer</Text>
      </TouchableOpacity>
      </View>


      {isPersonal ? (

  <View style={{width:"100%",height:"100%",alignItems:"center"}}>

    {isConnected ? (
   <View style={{width:"100%",height:"100%",alignItems:"center"}}>
   <View style={styles.containerInformations}>
   <Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/user.png')}/>
   <View style={styles.containerItem}>
   <Text style={{color:colors.grey[400],fontSize:14}}>Nome</Text>
   <Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.NomeCliente}</Text>
   </View>
   </View>
   <View style={styles.containerInformations}>
   <Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/impressao-digital.png')}/>
   <View style={styles.containerItem}>
   <Text style={{color:colors.grey[400],fontSize:14}}>Código Cliente</Text>
   <Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.CodigoCliente}</Text>
   </View>
   </View>


 <View style={isSenha ? styles.containerInformationsFocus : styles.containerInformations}>

       <Image style={[!isSenha ? {height:"50%",flex:1,marginVertical:"3%"} : {height:"12%",flex:1,marginVertical:"5%",marginLeft:"5%"}]}  source={require('../assets/senha.png')}/>
       <View style={[!isSenha ? styles.containerItem : {  marginLeft:"6%",marginTop:"4%",flex:10,height:"100%"}]}>
       <Text style={{color:colors.grey[400],fontSize:14}}>Senha</Text>

       <Controller
 control={control}
 name="Senha"
 render={({field:{onChange,value}})=>(
<TextInput
  editable={false}
  style={[
    !isSenha ? {
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    } : { paddingTop: "2%", color: colors.grey[400], fontSize: 16, width: "90%", height: "10%" },
  ]}
  defaultValue={dataClientes.Senha}
  value={value}
  secureTextEntry={isShow}
  onBlur={() => setisSenha(false)}
  caretHidden={true}
  placeholderTextColor='green' // Set the desired color for the asterisks
/>
 )}
 />{errors.Senha &&  <Text style={styles.labelError}>{errors.Senha?.message}</Text>}


   
</View>

<TouchableOpacity style={[!isSenha ? {height:"50%",flex:1.2,marginVertical:"3%",marginEnd:"2%"} : {height:"10%",flex:1.2,marginVertical:"5%",marginEnd:"4%"}]} onPress={()=> {if(isShow){setisShow(false)}else{setisShow(true)}}}>
<Image style={{height:"100%",width:"100%"}}  source={isShow ? require('../assets/show.png'): require('../assets/hide.png')}/>
</TouchableOpacity>
  </View>


   <View style={[!isEmail ? styles.containerInformations : styles.containerInformationsFocus]}>
   <Image style={[!isEmail ? {height:"50%",flex:1,marginVertical:"3%"} : {height:"50%",flex:1,marginVertical:"5%",marginLeft:"5%"}]} source={require('../assets/mail.png')}/>
   <View style={[!isEmail ? styles.containerItem : {  marginLeft:"6%",marginTop:"4%",flex:10,height:"100%"}]}>
   <Text style={{color:colors.grey[400],fontSize:14}}>Email</Text>
   <Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.EmailCliente}</Text>
   </View>
   </View>
   <TouchableOpacity style={{
    marginTop:"9%",
    borderRadius:30,
    width:'80%',
    height:60,
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
}}
onPress={()=>navigation.navigate("PasswordChange",{voltar: tokens(theme[2]), data:dataClientes})}

>
     <Text style={{
     fontSize:20,
     color:colors.grey[100],
     fontWeight:"400"
}}>Alterar Senha</Text>
   </TouchableOpacity>
   </View>
    ) : (
    <View style={{width:"100%",height:"100%",alignItems:"center"}}>
<View style={styles.containerInformations}>
<Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/user.png')}/>
<View style={styles.containerItem}>
<Text style={{color:colors.grey[400],fontSize:14}}>Nome</Text>
<Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.NomeCliente}</Text>
</View>
</View>
<View style={styles.containerInformations}>
<Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/impressao-digital.png')}/>
<View style={styles.containerItem}>
<Text style={{color:colors.grey[400],fontSize:14}}>Código Cliente</Text>
<Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.CodigoCliente}</Text>
</View>
</View>
<View style={[!isSenha ? styles.containerInformations : styles.containerInformationsFocus]}>
<Image style={[!isSenha ? {height:"50%",flex:1,marginVertical:"3%"} : {height:"50%",flex:1,marginVertical:"5%",marginLeft:"5%"}]}  source={require('../assets/senha.png')}/>
<View style={[!isSenha ? styles.containerItem : {  marginLeft:"6%",marginTop:"4%",flex:10,height:"100%"}]}>
<Text style={{color:colors.grey[400],fontSize:14}}>Senha</Text>
<Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.Senha}</Text>
</View>
</View>
<View style={[!isEmail ? styles.containerInformations : styles.containerInformationsFocus]}>
<Image style={[!isEmail ? {height:"50%",flex:1,marginVertical:"3%"} : {height:"50%",flex:1,marginVertical:"5%",marginLeft:"5%"}]} source={require('../assets/mail.png')}/>
<View style={[!isEmail ? styles.containerItem : {  marginLeft:"6%",marginTop:"4%",flex:10,height:"100%"}]}>
<Text style={{color:colors.grey[400],fontSize:14}}>Email</Text>
<Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:colors.grey[400]}]}>{dataClientes.EmailCliente}</Text>
</View>
</View>
<TouchableOpacity style={{
    marginTop:"9%",
    borderRadius:30,
    width:'80%',
    height:60,
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
}} disabled={true}>
  <Text style={{
     fontSize:20,
     color:colors.grey[100],
     fontWeight:"400"
}}>Alterar Senha</Text>
</TouchableOpacity>
</View>
    )}                                                  


  </View>


) : (
  <View style={{width:"100%",height:"100%",alignItems:"center"}}>

<View style={styles.containerInformations}>

<Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/user.png')}/>
<View style={styles.containerItem}>
<Text style={{color:"gray",fontSize:14}}>Nome</Text>
<Text   style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:"gray"}]}>{dataClientes.nome}</Text>
</View>
</View>

<View style={styles.containerInformations}>

<Image style={{height:"50%",flex:1,marginVertical:"2%"}} source={require('../assets/telefone.png')}/>
<View style={styles.containerItem}>
<Text style={{color:"gray",fontSize:14}}>Telemóvel</Text>
<Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:"gray"}]}>{dataClientes.telefone}</Text>
</View>
</View>

<View style={styles.containerInformations}>

     <Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/instagram.png')}/>
     <View style={styles.containerItem}>
     <Text style={{color:"gray",fontSize:14}}>Instagram</Text>
     <Text style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:"gray"}]}>{dataClientes.insta}</Text>
</View>
</View>

 <View style={styles.containerInformations}>

     <Image style={{height:"50%",flex:1,marginVertical:"3%"}} source={require('../assets/mail.png')}/>
     <View style={styles.containerItem}>
     <Text style={{color:"gray",fontSize:14}}>Email</Text>
  <Text   style={[{
      paddingTop:"2%",
      color:colors.grey[100],
      fontSize:16,
    },{color:"gray"}]}>{dataClientes.email}</Text>
</View>

</View>

<TouchableOpacity style={{
    marginTop:"9%",
    borderRadius:30,
    width:'80%',
    height:60,
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
}} onPress={()=>{Linking.openURL('mailto:'+dataClientes.email+'?subject=Contact by '+dataClientes.NomeCliente).catch(err => console.error('An error occurred', err));}}>
<Text style={{
     fontSize:20,
     color:colors.grey[100],
     fontWeight:"400"
}}>Contactar</Text>
</TouchableOpacity>

</View>
)}


    </View>
   
</TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({

  labelError:{
    color:"#ff375b",
    fontSize:10,
    marginBottom:"10%"
  },

  ButtonText:{
 
  },
 Button:{
  
  },
  containerItem:{
    marginLeft:"6%",
    flex:10,
    height:"100%"
  },
  input:{
 
 
  },
  containerInformationsFocus:{
    flexDirection:'row',
    width:"100%",
    height:"40%",
    position:"absolute",
    top:"8.5%",
    backgroundColor:"rgb(45,45,51)"
  },
  containerInformations:{
    flexDirection:'row',
    width:"86%",
    height:"7%",
    marginTop:"4.5%",
    borderBottomWidth: 1,
    borderColor: "gray",
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
  containerOptions:{
 
  },

  containerSwitchCirclePressed:{
     width:"55%",
    height:"100%",
    borderRadius:50,
    backgroundColor:"white"
  },
  containerSwitchBackPressed:{
  
  },
  containerSwitchCircle:{
    width:"55%",
    height:"100%",
    marginLeft:"50%",
    borderRadius:50,
    backgroundColor:"white"
  },
  containerSwitchBack:{
   
  },
  containerSwitch:{

  },
  Body: {
  
  
  },
  HeaderIcon:{
    flex: 1,  
    alignItems: 'flex-end',
    flexDirection:"row",
    marginLeft:"5%"
   
  },
  
  Welcome:{
    marginTop:"5%",
    width:"100%",
    alignItems:"center"
  },

  TitleText:{
   
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





