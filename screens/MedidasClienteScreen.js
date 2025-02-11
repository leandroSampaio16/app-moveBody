import Body from "react-native-body-highlighter";
import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, Image,TouchableOpacity,Modal,Pressable, ActivityIndicator,  PanResponder } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { tokens, useMode} from "../theme";
import { AsyncStorage } from 'react-native';
import Refresh from "../Components/Refresh";

export default function MedidaClienteScreen({ navigation }) {
      
  const [refreshed, setRefreshed] = useState(false);
  const theme = useMode();
  //const colors = tokens(theme[2]);
  const [colors, setColors] = useState("")

  const [loading, setloading] = useState(true)

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
      setloading(false)
    });
  }, [voltar]);


  const dataClientes=navigation.getParam("data")

  const [pressedMuscleIndex, setPressedMuscleIndex] = useState("")
  const [chooseMuscle, setchooseMuscle] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [isEsquerda, setisEsquerda] = useState(true)
  const [isMedidaCorporal, setisMedidaCorporal] = useState(true)
  const [isPage, setisPage] = useState(1)

  const data = [
    { slug: pressedMuscleIndex, intensity: 1 },
];


const panResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 0) {
        setisPage(prevPage => prevPage === 1 ? 2 : prevPage - 1);
      } else {
        setisPage(prevPage => prevPage === 2 ? 1 : prevPage + 1);
      }
    }
  })
);

const bottomSheetModalRef = useRef(null);
const [isOpen, setIsOpen] = useState(false);
const snapPoints = ["40%"];

function handlePresentModal() {

  bottomSheetModalRef.current?.present();
  setTimeout(() => {
    setIsOpen(true);
  }, 100);
}


const handlePress = (muscle) => {
    if(muscle.slug!="head" && muscle.slug!="triceps" && muscle.slug!="knees")
    setPressedMuscleIndex(muscle.slug)
    setchooseMuscle(false)
    console.log(`${muscle.slug} pressed!`);
  };



const colorsEffect = [
     "#868dfb",
];



 /* const data = [
    { slug: "chest", intensity: 1 },
    { slug: "abs", intensity: 1 },
    { slug: "biceps", intensity: 1 },
    { slug: "triceps", intensity: 1 },
    { slug: "quadriceps", intensity: 1 },
    { slug: "hamstrings", intensity: 1 },
  ];

  const handlePress = (muscle) => {
    setPressedMuscle(muscle.slug);
    console.log(`${muscle.slug} pressed!`);
  };*/
  
  const handleRefresh = () => {


    theme[1].toggleColorMode()

    AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));


    setColors(tokens(theme[2]))
  }
  if (loading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
  
  if(colors!=="" && colors!==null && colors!==undefined){
  return (
    <BottomSheetModalProvider>
    <View  style={{
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
  onPress={()=>{navigation.navigate("HistoricoFisicoScreen",{voltar: tokens(theme[2])})}}
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



     <View style={styles.containerOptionsPage}>

<TouchableOpacity activeOpacity={1} style={[isMedidaCorporal ? {
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]
}: styles.containerNotSelectedPage]} onPress={()=>{if(!isMedidaCorporal){setisMedidaCorporal(true)}}}>
  <Text style={{color:colors.grey[100],fontSize:16}}>Medidas</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={1} style={[isMedidaCorporal ? styles.containerNotSelectedPage : {
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]
}]} onPress={()=>{if(isMedidaCorporal){setisMedidaCorporal(false)}}}>
  <Text style={{color:colors.grey[100],fontSize:16}}>Medidas 2</Text>
</TouchableOpacity>
</View>


{isMedidaCorporal ? (
  // Code to be rendered if isMedidaCorporal is true
  <View style={styles.Welcome}>


    <View >
      <Text style={[!chooseMuscle ? {
          fontFamily: 'System',
          fontSize:26,
          color:colors.grey[100]
      } : { fontFamily: 'System',fontSize:26,color:colors.redAccent[400]}]}>Selecione um músculo</Text>
      </View>
      <View  style={styles.containerBody}>
     <Body
      text="This is some text that will be highlighted."
      data={data}
      colors={colorsEffect}
      onMusclePress={handlePress}
      scale={2.3}
      frontOnly={true}
    />
    </View>


    <TouchableOpacity style={{
          marginTop:"8.5%",
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
    }} onPress={()=>{if(pressedMuscleIndex!=""){handlePresentModal()}else{setchooseMuscle(true)}}}>
        <Text style={{ fontSize:20,
      color:colors.grey[100],
      fontWeight:"400"}}>Analisar</Text>
      </TouchableOpacity>




      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >    
         <View  style={{flexDirection:"row", height:"100%"}}>
              <View  style={{justifyContent:"center", height:"95%", marginHorizontal:"5%"}}>
     <Body
      text="This is some text that will be highlighted."
      data={data}
      colors={colorsEffect}
      scale={1.2}
      frontOnly={true}
    />
    </View>



    <View style={{ flexDirection:"column", alignItems:"center", flex:1}}>

    <View style={{
  alignItems:"center",
  marginHorizontal:"5%", marginTop:"5%"}}>
     
    <Text style={{fontSize:30, fontWeight:"500",color:'black',fontWeight:"bold", marginTop:"5%"}}> {
  (() => {
    switch(pressedMuscleIndex) {
      case "chest": return "Peitoral";
      case "obliques": return "Dorsal";
      case "front-deltoids": return "Costas";
      case "neck": return "Pescoço";
      case "abductors": return "Quadril";
      case "abs": return "Cintura";
      case "biceps": return "Braço";
      case "forearm": return "Antebraço";
      case "quadriceps":return "Perna";
      case "calves":return "Gemeos";
    }
  })()
}
    </Text>
    <Text style={{fontSize:14, fontWeight:"500", color:"gray",fontWeight:"bold",marginBottom:"10%"}}>Medida Feita</Text>
     </View>

    {  (pressedMuscleIndex === "biceps" || pressedMuscleIndex === "forearm"|| pressedMuscleIndex === "quadriceps"|| pressedMuscleIndex === "calves") ? (

<View style={styles.containerOptions}>
<TouchableOpacity activeOpacity={1} style={[isEsquerda ? {  marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]} : styles.containerNotSelected]} onPress={()=>{if(!isEsquerda){setisEsquerda(true)}}}>
<Text style={{color:colors.grey[100],fontSize:16}}>Esquerdo</Text>
</TouchableOpacity>

<TouchableOpacity activeOpacity={1} style={[isEsquerda ? styles.containerNotSelected :  {marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]}]} onPress={()=>{if(isEsquerda){setisEsquerda(false)}}}>
<Text style={{color:colors.grey[100],fontSize:16}}>Direito</Text>
</TouchableOpacity>
</View>
):    
null
    }
      <Text style={{fontFamily: 'System',fontSize:20,color:colors.grey[400],marginTop:"7%"}}>
      {
    (() => {
      switch(pressedMuscleIndex) {
        case "chest": return dataClientes.Peito  + " cm";
        case "obliques": return dataClientes.Dorsal  + " cm";
        case "front-deltoids": return dataClientes.Costas  + " cm";
        case "neck": return dataClientes.Pescoco  + " cm";
        case "abductors": return dataClientes.Quadril  + " cm";
        case "abs": return dataClientes.Cintura  + " cm";
        case "biceps": if(isEsquerda){
          return dataClientes.BracoEsq  + " cm"
        }
        else{
          return dataClientes.BracoDire  + " cm"
        }
        case "forearm": if(isEsquerda){
          return dataClientes.AntebracoEsq  + " cm"
        }
        else{
          return dataClientes.AntebracoDire + " cm"
        }
        case "quadriceps": if(isEsquerda){
          return dataClientes.CoxaEsq + " cm"
        }
        else{
          return dataClientes.CoxaDire  + " cm"
        }
        case "calves": if(isEsquerda){
          return dataClientes.GemeoEsq + "cm"
        }
        else{
          return dataClientes.GemeoDire + " cm"
        }
      }
       
    })()
  }
      </Text>

</View>


</View>
        </BottomSheetModal>
  

  </View>
) : (

<View style={styles.container}  {...panResponder.current.panHandlers}>{isPage === 1 ? (
 
 <View>
<View style={{width:"90%", alignItems:"center", justifyContent:"center"}}>
  <Text style={{
    fontSize:28,
    color:colors.grey[100],
    marginBottom:"12%"
 }}>Composição Corporal</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Peso:</Text>
    <Text style={styles.value}>{dataClientes.Peso}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Altura:</Text>
    <Text style={styles.value}>{dataClientes.Altura}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>%H2O:</Text>
    <Text style={styles.value}>{dataClientes.H2O}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Peso Massa óssea:</Text>
    <Text style={styles.value}>{dataClientes.PesoMassaOssea}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Bioimpedância:</Text>
    <Text style={styles.value}>{dataClientes.Bioimpedancia}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Gordura Viceral:</Text>
    <Text style={styles.value}>{dataClientes.gorduraViceral}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Peso Massa Muscular:</Text>
    <Text style={styles.value}>{dataClientes.PesoMassaMuscular}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Taxa Metabólica Basal:</Text>
    <Text style={styles.value}>{dataClientes.TaxaMetabolicaBasal}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Idade Metabólica:</Text>
    <Text style={styles.value}>{dataClientes.IdadeMetabolica}</Text>
  </View>

  <View style={{width:"90%", height:"3.4%", marginTop:"2%", alignItems:"center", justifyContent: 'center', flexDirection: "row"}}> 

  <View style={isPage === 1 ? {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"rgba(118, 104, 203, 1)", marginHorizontal:"2.5%"} : {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"gray", marginHorizontal:"2.5%"}}>
  </View>

  <View style={isPage === 1 ? {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"gray", marginHorizontal:"2.5%"} : {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"rgba(118, 104, 203, 1)", marginHorizontal:"2.5%"}}>
  </View>

  </View>

</View>


) : isPage === 2 ? (
  <View>

<View style={{width:"90%", alignItems:"center", justifyContent:"center"}}>
 <Text style={{
    fontSize:28,
    color:colors.grey[100],
    marginBottom:"12%"
 }}>Análise Corporal</Text>
 </View>

  <View style={styles.row}>
    <Text style={styles.label}>Escoliose:</Text>
    <Text style={styles.value}>{dataClientes.Escoliose}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Alinha/o Joelhos:</Text>
    <Text style={styles.value}>{dataClientes.AlinhaJoelho}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Femural:</Text>
    <Text style={styles.value}>{dataClientes.Femural}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>ST.&R:</Text>
    <Text style={styles.value}>{dataClientes.STR}</Text>
  </View>

  <View style={{width:"90%", height:"3.4%", marginTop:"2%", alignItems:"center", justifyContent: 'center', flexDirection: "row"}}> 

  <View style={isPage === 1 ? {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"rgba(118, 104, 203, 1)", marginHorizontal:"2.5%"} : {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"gray", marginHorizontal:"2.5%"}}>
  </View>

  <View style={isPage === 1 ? {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"gray", marginHorizontal:"2.5%"} : {width:20, height:20, backgroundColor:"red", borderRadius:50, backgroundColor:"rgba(118, 104, 203, 1)", marginHorizontal:"2.5%"}}>
  </View>

  </View>


</View>

) : isPage === 3 ? (
  <View style={styles.container}>
 
</View>

) : (
  <View></View>
)}


</View>
  
 


)}


    

    
     </View>
     </BottomSheetModalProvider>
  );
}
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    marginTop:"13%",
   marginLeft:"14%",
    width:"100%"
  },
  title: {
  
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: "7%",
  },
  label: {
    width:"55%",
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',

  },
  value: {
    marginLeft:"15%",
    width:"50%",
    fontSize:16,
    color:'gray'
  },


  containerTextsModal:{
    marginTop:"-10%",
    alignItems:"center",
    width:"120%"
  },
  containerOptions:{
    flexDirection:'row',
    height:"11%",
    marginHorizontal:"5%",
    marginBottom:"5%",
    borderRadius:20,
    backgroundColor:"gray"
  },

  containerOptionsPage:{
    flexDirection:'row',
    marginTop:"3%",
    width:"80%",
    height:"4.5%",
    borderRadius:20,
    backgroundColor:"gray"
  },


  containerNotSelectedPage:{
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",

  },
  containerSelectedPage:{
  
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonCloseModal: {
    marginTop:"20%",
    width:"90%",
    height:"15%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'rgba(118, 104, 203, 1)',
    shadowOffset: {
      height: 4,
      width: 1
    },
    shadowColor: "#000000",
    shadowOpacity: '0.8',
    shadowRadius: '2',
  },
  textStyle: {
    color: 'white',
    fontSize:16,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgb(45,45,51)',
    width:"70%",
    height:"40%",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 1
    },
    shadowColor: "#000000",
    shadowOpacity: '0.8',
    shadowRadius: '2',
  },
  ButtonText:{
   
  },
 Button:{

  },
    containerBody:{
        marginTop:"10%"
    },
    Welcome:{
        marginTop:"5%",
        width:"100%",
        alignItems:"center"
      },
    
      TitleText:{
      
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
  
  Body: {
    
  
  },

}) ;





