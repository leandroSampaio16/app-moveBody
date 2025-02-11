import React, { useState,useEffect, useRef  } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  PanResponder
} from "react-native";
import { withNavigation } from 'react-navigation';

function Swipe({data,loading,error,navigation, dataClientes, colors}) {

  console.log(dataClientes.NomeCliente)


    const [Index, setIndex] = useState(0)


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
            setIndex(prevIndex => {
              if (prevIndex === 0) {
               
                return data.length - 1;
              }
              return prevIndex - 1;
            });
          } else {
            
            setIndex(prevIndex => (prevIndex + 1) % data.length);
          }
        }
      })
    );


    if (loading) return <ActivityIndicator size="large" marginVertical={30} />;
    if(error!=null){
        return (
            <View  style={{alignItems:"center",marginTop:"10%"}}>
        <Text style={{fontFamily: 'System',fontSize:20,color:colors.grey[100]}}>Algo correu mal</Text>
        <Text style={{fontFamily: 'System',fontSize:14,color:colors.grey[400], marginTop:"5%"}}>Voltar</Text>
        <TouchableOpacity  onPress={() => navigation.navigate("Home")} style={{backgroundColor:"rgba(118, 104, 203, 1)", height: 60, width:150, marginTop:"5%",marginBottom:"5%",borderRadius:15,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily: 'System',fontSize:20,color:colors.grey[100], marginTop:"5%"}}>Contatar</Text>
        </TouchableOpacity>
        </View>
        )
    } 
    else{
    return (
      <View style={styles.SwipeContaner}  {...panResponder.current.panHandlers}>     
          <View style={styles.PtInfo}>
              <View style={styles.PtInfoChild}>
                  <Text style={{color:colors.grey[100], flex:1, fontSize:24}}>{data[Index].nome}</Text>
              
                      <Text style={{color:colors.grey[400], fontSize:14, marginRight:"5%", marginTop:"2%"}}>{data[Index].DataNasc}</Text>
                      <TouchableOpacity style={{height:22, width:22, marginRight:"21%", marginTop:"1.5%" , zIndex:2}} onPress={()=>{Linking.openURL("https://www.instagram.com/"+data[Index].insta+"")}}>
                          <Image style={{width:"100%", height:"100%"}} source={require('../assets/instagramIcon.png')}/>
                      </TouchableOpacity>
               
              </View>
              <View style={{width:280, marginTop:"3%", zIndex:1}}>
                  <Text style={{color:colors.grey[400], fontSize:14}}>{data[Index].descr}</Text>
              </View>
          </View>
          <Image  source={{
            uri:data[Index].capa,
          }} style={styles.backgroundImage}/>
          <TouchableOpacity style={{ marginHorizontal:"8%",
      marginTop:30,
      borderRadius:30,
      width:'85%',
      height:50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.blueAccent[400], 
      shadowOffset: {
        height: 4,
        width: 1
      },
      shadowColor: "#000000",
      shadowOpacity: '0.8',
      shadowRadius: '2',}} onPress={()=>{Linking.openURL('mailto:'+data[Index].email+'?subject=Contact by '+ dataClientes.NomeCliente).catch(err => console.error('An error occurred', err));}}>
                  <Text style={{
                        fontSize:20,
                        color:colors.grey[100],
                        fontWeight:"400"
                  }}>Contatar</Text>
            </TouchableOpacity>
     </View>
      
    )
  }
}

  const styles = StyleSheet.create({
    Button:{
     
    },
    
    ButtonText:{
  
    },
    PtInfoChild:
    {
      justifyContent:"center",
      flexDirection:"row",
      width:"100%"
    },
    PtInfo:{
      width:"100%",
      marginTop:"12%",
      marginLeft:"10%"
    },
    SwipeContaner:{
      width:"100%",
      height:"88%",
    },
    backgroundImage:{
      zIndex:-1,
      width:"82%",
      marginTop:"8%",
      marginHorizontal:"9%",
      borderRadius:20,
      height:"70%",
      resizeMode: 'cover',
      justifyContent: 'center',
    }
  });

  export default withNavigation(Swipe)
  