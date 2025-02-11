
import { StyleSheet, Text, View, TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback,Linking,Image    } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { color } from 'react-native-reanimated';


export default function DayClasses({Dia,NomeDia,active, handlePress, colors}) {

    return (
      <TouchableOpacity   onPress={handlePress} >
   
   <View style={[{ width: 60,
        height: 60,
        marginLeft:10,
        alignItems: "center",
        justifyContent: "center",}
        ,active && 
        {  width: 60,
        height: "100%",
        marginLeft:10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: colors.blueAccent[200],}]}>

        <View style={[{ width: 50,
        height: 50,
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.1,
        elevation: 3,
        marginBottom: 7,
        backgroundColor:colors.primary[400]}
          , active && 
          {   backgroundColor: colors.blueAccent[400],
          width: 50,
        height: 50,
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.1,
        elevation: 3,
        marginBottom: 7,}]} >
        
          <Text style={[{   fontFamily: 'System',
       fontSize:20,
            color:colors.grey[100]}
            , active && 
            {
              fontFamily: 'System',
              fontSize:20,
              color:colors.blueAccent[900]
            }]}>{Dia}</Text>
         
          </View>
          <Text style={[{  fontFamily: 'System',
        fontSize:14,
        color:colors.grey[100]}
            , active && 
            { fontFamily: 'System',
            fontSize:14,
            color:colors.grey[100]}]}>{NomeDia}</Text>
    </View>
      </TouchableOpacity>
    );
  }


  