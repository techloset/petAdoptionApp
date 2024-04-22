import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import splash from "../asset/Splash.jpg"


const Splash = ({navigation}:any) => {

    useEffect(()=>{
        setTimeout(()=>{
        navigation.navigate('Parent')
        },1000)
      },[])


  return (
    <View>
      {/* <Text>Splash</Text> */}
      <Image source={splash} style={{height:'100%',width:"100%"}}  />
    </View>
  )
}

export default Splash