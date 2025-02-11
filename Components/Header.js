import { StyleSheet, Text, View ,TextInput, Image} from 'react-native';



export default function Header({MarginTop}) {
    
 
    return (
      <View style={styles.container}>
         <Image style={styles.Image} source={require('../assets/Logo.png')}></Image>
      </View>
    );
  }



  const styles = StyleSheet.create({
    container: {
    borderRadius:15,
     width:'100%',
     height:"100%",
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: "#a4a9fc",
    
    },
    Image:{
        width:"95%",
        height:"80%"
    }
  });
  