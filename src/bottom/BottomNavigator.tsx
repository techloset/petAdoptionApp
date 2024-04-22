// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image, StyleSheet,View } from "react-native";
// import BottomHome from "./BottomHome";
// import BottomSearch from "./BottomSearch";
// import BottomFavourite from "./BottomFavourite";
// import BottomProfile from "./BottomProfile";

// const HomeIcon = require("../asset/Vector.png");
// const SearchIcon = require("../asset/searrch-icon.jpg");
// const FavoriteIcon = require("../asset/favourite.jpg");
// const ProfileIcon = require("../asset/profile.jpg");
// const HomeIconFocused = require("../asset/homeFocused.png");
// const SearchIconFocused = require("../asset/searchFocused-removebg-preview.png");
// const FavoriteIconFocused = require("../asset/favouriteFocuesed.png");
// const ProfileIconFocused = require("../asset/profileFocused.png");

// // new components for display below when image active
// import activeHome from "../components/activeIcons/HomeActive";
// import activeSearch from "../components/activeIcons/SearchActive";
// import activeFavourite from "../components/activeIcons/FavouriteActive";
// import activeProfile from "../components/activeIcons/ProfileActive";
// // new components end

// const BottomNavigator = () => {
//   const Bottom = createBottomTabNavigator();

//   return (
//     // <View style={{ height: 82 }}>
//     <Bottom.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused }) => {
//           let iconSource;
//           let iconStyle;

//           // Determine which icon and style to display based on the route name
//           switch (route.name) {
//             case "BottomHome":
//               iconSource = focused ? HomeIconFocused : HomeIcon;
//               // iconSource = focused ? <View>activeHome</View> : HomeIcon;
//               iconStyle = focused ? styles.homeIconFocused : styles.homeIcon;
//               break;
//             case "BottomSearch":
//               iconSource = focused ? SearchIconFocused : SearchIcon;
//               iconStyle = focused
//                 ? styles.searchIconFocused
//                 : styles.searchIcon;
//               break;
//             case "BottomFavourite":
//               iconSource = focused ? FavoriteIconFocused : FavoriteIcon;
//               iconStyle = focused
//                 ? styles.favoriteIconFocused
//                 : styles.favoriteIcon;
//               break;
//             case "BottomProfile":
//               iconSource = focused ? ProfileIconFocused : ProfileIcon;
//               iconStyle = focused
//                 ? styles.profileIconFocused
//                 : styles.profileIcon;
//               break;
//             default:
//               break;
//           }

//           return <Image source={iconSource} style={iconStyle} />;
//         },
//       })}
//       tabBarOptions={{
//         showLabel: false, // Hide the labels
//         // style: { height: 182 },
//       }}
//     >
//       {/* <Bottom.Screen name="Home" component={Home} options={{headerShown:false}}/> */}
//       <Bottom.Screen
//         name="BottomHome"
//         component={BottomHome}
//         options={{ headerShown: false }}
//       />
//       <Bottom.Screen
//         name="BottomSearch"
//         component={BottomSearch}
//         options={{ headerShown: false }}
//       />
//       <Bottom.Screen
//         name="BottomFavourite"
//         component={BottomFavourite}
//         options={{ headerShown: false }}
//       />
//       <Bottom.Screen
//         name="BottomProfile"
//         component={BottomProfile}
//         options={{ headerShown: false }}
//       />
//     </Bottom.Navigator>
//     // <View/>
//   );
// };

// const styles = StyleSheet.create({
//   homeIcon: {
//     width: 36,
//     height: 36,
//     resizeMode: "contain",
//     // Add styles for the regular home icon here
//   },
//   homeIconFocused: {
//     width: 48,
//     height: 36,
//     // Add styles for the focused home icon here
//   },
//   searchIcon: {
//     width: 36,
//     height: 36,
//     resizeMode: "contain",
//     // Add styles for the regular search icon here
//   },
//   searchIconFocused: {
//     width: 72,
//     height: 72,
//     // Add styles for the focused search icon here
//   },
//   favoriteIcon: {
//     width: 36,
//     height: 36,
//     resizeMode: "contain",
//     // Add styles for the regular favorite icon here
//   },
//   favoriteIconFocused: {
//     width: 48,
//     height: 36,
//     // Add styles for the focused favorite icon here
//   },
//   profileIcon: {
//     width: 36,
//     height: 36,
//     resizeMode: "contain",
//     // Add styles for the regular profile icon here
//   },
//   profileIconFocused: {
//     width: 48,
//     height: 36,
//     // Add styles for the focused profile icon here
//   },
// });

// export default BottomNavigator;

import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PetSearch from '../bottom/Search';
import Favorites from '../bottom/Favourite';
import Profile from '../bottom/Profile';
import Home from '../bottom/Home';
import {Image, StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: navs.navigation,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}: any) => (
              <View
                style={[
                  navs.tabIconContainer,
                  focused ? navs.tabIconFocused : navs.tabIconUnfocused,
                ]}>
                {focused ? (
                  <Image source={require('../asset/activeHome.png')} />
                ) : (
                  <Image source={require('../asset/inactiveHome.png')} />
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="PetSearch"
          component={PetSearch}
          options={{
            tabBarIcon: ({focused}: any) => (
              <View
                style={[
                  navs.tabIconContainer,
                  focused ? navs.tabIconFocused : navs.tabIconUnfocused,
                ]}>
                {focused ? (
                  <Image source={require('../asset/activeSearch.png')} />
                ) : (
                  <Image source={require('../asset/inactiveSearch.png')} />
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}: any) => (
              <View
                style={[
                  navs.tabIconContainer,
                  focused ? navs.tabIconFocused : navs.tabIconUnfocused,
                ]}>
                {focused ? (
                  <Image source={require('../asset/activeUnion.png')} />
                ) : (
                  <Image source={require('../asset/inactiveUnion.png')} />
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}: any) => (
              <View
                style={[
                  navs.tabIconContainer,
                  focused ? navs.tabIconFocused : navs.tabIconUnfocused,
                ]}>
                {focused ? (
                  <Image source={require('../asset/activeProfile.png')} />
                ) : (
                  <Image source={require('../asset/inactiveProfile.png')} />
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigator;

const navs = StyleSheet.create({
  navigation: {
    backgroundColor: 'white',
    height: 70,
    width: 'auto',
  },

  tabIconContainer: {
    width: 68,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabIconFocused: {
    backgroundColor: 'black',
  },
  tabIconUnfocused: {
    backgroundColor: 'transparent',
  },
});
