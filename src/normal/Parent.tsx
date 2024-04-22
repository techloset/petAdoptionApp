import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '../bottom/BottomNavigator';
const Parent = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
      <BottomNavigator />
      {/* <DrawerNAvigator /> */}
    </View>
  );
};

export default Parent;
