// import { View, Text } from "react-native";
// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Adopt from "../screens/others/Adopt";
// import Donate from "../screens/others/Donate";
// import Add_Pet from "../screens/others/Add_Pet";
// import Favourite from "../screens/others/Favourite";
// import Message from "../screens/others/Message";
// import Home from "../bottom/BottomHome";
// import SideBar from "./Sidebar";
// const DrawerNAvigator = () => {
//   const Drawer = createDrawerNavigator();

//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <SideBar {...props} />}
//       initialRouteName="Adopt"
//     >
//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: false }}
//       />

//       <Drawer.Screen name="Adopt" component={Adopt}  />
//       <Drawer.Screen name="Donate" component={Donate} />
//       <Drawer.Screen name="Add_Pet" component={Add_Pet} />
//       <Drawer.Screen name="Favourite" component={Favourite} />
//       <Drawer.Screen name="Message" component={Message} />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNAvigator;

import {View, Text} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Adopt from '../screens/others/Adopt';
import Donate from '../screens/others/Donate';
import Add_Pet from '../screens/others/Add_Pet';
import Favourite from '../screens/others/Favourite';
import Message from '../screens/others/Message';
// import Home from "../bottom/BottomHome";
import HomeSide from '../screens/others/HomeSide';
import BottomProfile from '../bottom/Profile';
import BottomFavourite from '../bottom/Favourite';

import SideBar from './Sidebar';
// import Favourites from "../screens/donations/Favourites";
import Favourites from '../screens/donations/Favourites';
// import MyDonations from "../screens/donations/MyDonations";
import DonateData from '../screens/donations/DonateData';
import DonationRequests from '../screens/donations/DonationRequests';
import MyDonations from '../screens/donations/MyDonations';
import UpdatePassword from '../screens/auth/UpdatePassword';
import PetDetails from '../screens/details/AdoptedPetDetails';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeSide" component={HomeSide} />
      <Drawer.Screen name="Adopt" component={Adopt} />
      <Drawer.Screen name="MyDonations" component={MyDonations} />
      {/* <Drawer.Screen
        name="MyDonations"
        component={BottomFavourite}
        options={{
          drawerItem: ({ focused, onPress }:any) => (
            <DrawerItem
              focused={focused}
              onPress={() => onPress('BottomFavourite')}
              label="Favourites"
            />
          ),
        }}
      /> */}
      <Drawer.Screen name="DonateData" component={DonateData} />
      {/* <Drawer.Screen name="Favourites" component={Favourites} /> */}
      {/* <Drawer.Screen
        name="Favourites"
        component={BottomFavourite}
        options={{
          drawerItem: ({ focused, onPress }: any) => (
            <DrawerItem
              focused={focused}
              onPress={() => onPress("BottomProfile")}
              label="Profile"
            />
          ),
        }}
      /> */}
      <Drawer.Screen name="DonationRequests" component={DonationRequests} />
      <Drawer.Screen name="UpdatePassword" component={UpdatePassword} />
      <Drawer.Screen
          name="PetDetailss"
          component={PetDetails}
          options={{headerShown: false}}
        />
      {/* <Drawer.Screen
        name="Profile"
        component={BottomProfile}
        options={{
          drawerItem: ({ focused, onPress }: any) => (
            <DrawerItem
              focused={focused}
              onPress={() => onPress("BottomProfile")}
              label="Profile"
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
