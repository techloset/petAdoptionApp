import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { useAppSelector } from '../../../hooks/hooks';
import { RootState } from '../../../store/store';

const handleLogout=()=>{
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}

const Logout = () => {
  const userData = useAppSelector((state: RootState) => state.user.userData);
  return (
    <View >
      <TouchableOpacity style={{height:50,width:100,backgroundColor:'black',borderRadius:20}} onPress={handleLogout}><Text  style={{color:'white'}}>logout</Text></TouchableOpacity>
    </View>
  )
}

export default Logout