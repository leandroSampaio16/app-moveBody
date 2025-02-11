
import { StyleSheet, Text, View,TouchableOpacity    } from 'react-native';
import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';

function HomeOption({TextContainer,Index,navigation,RoutePage,data, colors}) {

  const [isPressed, setIsPressed] = useState(false);

    return (
      <TouchableOpacity onPress={() => navigation.navigate(RoutePage,{data:data})} onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}  >
      <View style={[{  borderRadius:15,
         width:'100%',
         height:120,
         justifyContent: 'center',
         marginTop:"7%",  
         backgroundColor: colors.primary[400],}
        , isPressed && 
        { 
          backgroundColor: colors.blueAccent[400],
        borderRadius:15,
        width:'100%',
        height:120,
        justifyContent: 'center',
        marginTop:"7%",
        }, Index==0 ? { marginTop:0}:{marginTop:"7%"}]}>
          <Text style={{          fontFamily: 'System',
       paddingLeft:"7%",
       fontSize:20,
       color:colors.grey[100]}}>{TextContainer}</Text>
          </View>     
      </TouchableOpacity>
    );
  }

  
  export default withNavigation(HomeOption)