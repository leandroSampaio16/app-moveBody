import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image,ActivityIndicator, Button, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, Alert   } from 'react-native'
import Medidas from "../Components/Medidas";
import GetMedidas from "../hooks/GetMedidas";
import GetTesteForcaCliente from "../hooks/GetTesteForcaCliente";
import Forca  from "../Components/Forca";
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { tokens, useMode} from "../theme";
import Refresh from "../Components/Refresh";
import ChartComponent from "../Components/ChartComponent"
import Autocomplete from 'react-native-autocomplete-input';
import GetPageCompare from "../hooks/GetPageCompare";

export default function Compare({ navigation }) {

    const [avlFm , setAvlFm] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const voltar = navigation.getParam("voltar")
    const [loading,setload]= useState(true)   
    console.log(voltar)
    const[{data,error,load},PageCompararGet]=GetPageCompare(voltar.IdClienteInfo)
    const [dataAssync,setdataAssync]=useState("")
    useEffect(() => {
        PageCompararGet(voltar.IdClienteInfo)
        }, [ refreshed]);
        
        useEffect(() => {

            const checkInternetConnectivity = async () => {
        
                const { isConnected } = await NetInfo.fetch();
                const AssyncData = await AsyncStorage.getItem('pageComparar');
                setdataAssync(JSON.parse(AssyncData))
             
        
        
                if (isConnected) {
        
                 
          
        
        if((!load && error == null) || (!load && error == "sem data")){
            
              if (AssyncData) {
        
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
                    
                      await AsyncStorage.setItem('pageComparar', JSON.stringify(data));
                      setdataAssync(data)
                    //  const response=await APIconnection.get("/ClientesColaboradores")
                     // ClientesData=JSON.parse(JSON.stringify(response.data))   
                      // Navigate to home page after saving data to AsyncStorage
                      setload(false)
                      setIsConnected(true);
                    }
                  
            } else {
          
              await AsyncStorage.setItem('pageComparar', JSON.stringify(data));
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
           
          }, [refreshed, isConnected, load]);

;


const options = [
  { label: "Peso", name: "Peso" },
  { label: "Altura", name: "Altura" },
  { label: "Quadril", name: "Quadril" },
  { label: "Coxa Direita", name: "CoxaDire" },
  { label: "Costas", name: "Costas" },
  { label: "Coxa Esquerda", name: "CoxaEsq" },
  { label: "Antebraço Esquerdo", name: "AntebracoEsq" },
  { label: "Braço Esquerdo", name: "BracoEsq" },
  { label: "Antebraço Direito", name: "AntebracoDire" },
  { label: "Cintura", name: "Cintura" },
  { label: "Braço Direito", name: "BracoDire" },
  { label: "Gêmeo Esquerdo", name: "GemeoEsq" },
  { label: "Gêmeo Direito", name: "GemeoDire" },
  { label: "Peito", name: "Peito" },
  { label: "Dorsal", name: "Dorsal" },
  { label: "Pescoço", name: "Pescoco" },

 /* { label: "%H2O", name: "H20" },
  { label: "Peso Massa Ossea", name: "PesoMassaOssea" },
  { label: "Bioimpedancia", name: "Bioimpedancia" },
  { label: "Gordura Viceral", name: "GorduraViceral" },
  { label: "PesoMassa Muscular", name: "PesoMassa Muscular" },
  { label: "Taxa Metabolica Basal", name: "TaxaMetabolicaBasal" },
  { label: "Idade Metabolica", name: "IdadeMetabolica" }*/
];
    
      const options1 = [
        { label: "Supino", name: "Supino" },
        { label: "Agachamento", name: "Agachamento" },
        { label: "Levantamento Terra", name: "Terra" },
      ];
    
      const [selectedOption, setSelectedOption] = useState(null);

      const handleOptionChange = (option) => {
        setSelectedOption(option);
      };

    const [refreshed, setRefreshed] = useState(false);

    const handleRefresh = () => {
      

        theme[1].toggleColorMode()
    
        AsyncStorage.setItem('colorMode', JSON.stringify(tokens(theme[2])));
    
    
        setColors(tokens(theme[2]))
      }

   
  


      const [query, setQuery] = useState('');
      const filteredOptions = !avlFm
  ? options1
  : options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    
    const theme = useMode();
    //const colors = tokens(theme[2]);
    const [colors, setColors] = useState("")



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

  if (loading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"141b2d" }}><ActivityIndicator size="large" marginVertical={30} /></View>);
    
  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(33, 33, 38, 1)" }}>
      <Text style={{ fontSize: 24, color:"rgba(118, 104, 203, 1)" }}>No internet connection</Text>
      <Button title="Refresh" onPress={handleRefresh} />
      </View>
    );
  } else {
    
  if(colors){



     
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          backgroundColor: colors.background[100],
          alignItems: 'center',
        }}
       
      >
        <Refresh setRefreshed={setRefreshed} colors={colors} refreshed={refreshed} />

        <View
          style={{
            width: '100%',
            marginBottom: '5%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-end',
              flexDirection: 'row',
              marginLeft: '5%',
            }}
            onPress={() => {
              navigation.navigate('HistoricoFisicoScreen', { voltar: tokens(theme[2]) });
            }}
          >
            <Image style={{ marginLeft: '2%', width: '20%', height: '25%' }} source={require('../assets/voltarIcon.png')} />
            <Text style={{ marginLeft: '2%', paddingTop: 0, fontSize: 14, color: colors.grey[400] }}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-end',
              flexDirection: 'row',
              marginLeft: '50%',
            }}
            onPress={handleRefresh}
          >
            <Image
              style={{
                marginLeft: '30%',
                width: '40%',
                height: '26%',
              }}
              source={require('../assets/day-and-night.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection:'row',
    marginTop:"5%",
    width:"80%",
    height:"4.5%",
    borderRadius:20,
    backgroundColor:"gray"}}>

<TouchableOpacity activeOpacity={1} style={[avlFm ? {
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]
}: { marginVertical:"1%",
height:"85%",
flex:1,
borderRadius:30,
alignItems:"center",
justifyContent:"center",}]} onPress={()=>{if(!avlFm){setAvlFm(true)}}}>
  <Text style={{color:colors.grey[100],fontSize:16}}>Medidas</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={1} style={[avlFm ? {  marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",} : {
    marginVertical:"1%",
    height:"85%",
    flex:1,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:"1%",
    backgroundColor:colors.blueAccent[400]
}]} onPress={()=>{if(avlFm){setAvlFm(false)}}}>
  <Text style={{color:colors.grey[100],fontSize:16}}>Testes de Força</Text>
</TouchableOpacity>
</View>


        <View style={{ flex: 1, paddingHorizontal: 20, width: '100%', marginTop:"20%" }}>
        <Autocomplete
           placeholder={selectedOption ? selectedOption : "Pesquisar por nome"}
           placeholderTextColor={colors.grey[400]}
            data={filteredOptions}
            value={query}
            style={{backgroundColor: colors.primary[400], color:colors.grey[100], borderColor: colors.primary[400],
                borderWidth: 0,}}
            onChangeText={setQuery}
            flatListProps={{
                style:{height: 70, backgroundColor: colors.primary[400],        borderColor: colors.primary[400],
                borderWidth: 0,},
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: ({ item }) =>  <TouchableOpacity  onPress={() => {
                setSelectedOption(item.name);
                console.log(item.name);
                setQuery(item.label); // Set the query to selected option's label
              }}style={{height:30}}><Text style={{color:colors.grey[100], marginTop:10}}>{item.label}</Text></TouchableOpacity>,

              
            }}
            renderTextInput={(props) => (
              <TextInput
                style={{
                  height: 40,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
                {...props}
              />
            )}
          />
    
        </View>


{selectedOption && (
    <View style={{ width: '100%', marginBottom:"40%"}}>
        < ChartComponent colors={colors} selectedPart={selectedOption} avlFm={avlFm} data={dataAssync}/>
        </View>
       )}
      </View>
    </TouchableWithoutFeedback>
    )
    } 

  }
}