import { View, Text } from "react-native";
import React from "react";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";

import DrawerNavigator from "../drawer/DrawerNavigator";

const Home = ({ Favourite }: any) => {
  const Drawer = createDrawerNavigator();
  return (
   
    // <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
    //   {/* <Drawer.Screen
    //     name="BottomHome"
    //     component={BottomHome}
    //     options={{ headerShown: false }}
    //   /> */}

    //   <Drawer.Screen
    //     name="Adopt"
    //     component={Adopt}
    //     options={{ headerShown: false }}
    //   />
      
    // </Drawer.Navigator>
    <>
    <DrawerNavigator />
    </>

  );
};

export default Home;
