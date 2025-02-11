import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/homeStack';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorModeContext, useMode, tokens } from "./theme";


export default function App() {


  AsyncStorage.getItem('notificationData').then((data) => {
    if (data) {
      // Parse the JSON data into an object
      const notificationData = JSON.parse(data);
    
      if(notificationData.isOn){
        console.log(notificationData.isOn)

        AsyncStorage.getItem('aulasGrupo').then((data) => {

          if (data) {
            const dataAulas = JSON.parse(data);

            dataAulas.forEach(element => {
              const date = element.date
              const horario = element.horario

            });
          }

        });

      }
      else{

      }
 
      // Calculate the date and time of the notification

  
    }
  });

  const checkInternetConnectivity = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type: ', state.type);
      console.log('Is connected? ', state.isConnected);
    });
  }
  checkInternetConnectivity()
  
  
    return (


      <Navigator />


    );

}