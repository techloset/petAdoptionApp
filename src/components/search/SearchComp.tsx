import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SearchBarIcon } from "../../asset/search-icon-white.png";
const SearchIconWhite = require("../../asset/search-icon-white.png");
const SearchComp = ({ containerStyle,handleSearch,onPress } :any) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput style={styles.input} placeholder="Search for a pet" autoCapitalize="none" autoCorrect={false} onChangeText={handleSearch} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={SearchIconWhite} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "red",
    // flexDirection: 'row',
    //  flexWrap: 'wrap',
    display: "flex",
     alignItems:'center',
     justifyContent:'center',
    // flexDirection:"col",
    marginTop: 30,
    height: 54,
    
  },
  input: {
    borderRadius: 20,
    // borderWidth: 1,
    paddingHorizontal: 20,
    height: 44,
    width: "100%",
    backgroundColor:'#e5e5e5',
  },
  button: {
    height: 54,
    // width: 82,
    backgroundColor: "black",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width:'20%',
    // marginLeft:200,
    position:'absolute',
    left:'85%',
  },
  image: {
    height: 30.22,
    width: 30.22,

  },
});





// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
// import SearchIconWhite from '../../asset/search-icon-white.png';

// const SearchComp = ({ containerStyle, handleSearch }) => {
//   const [searchText, setSearchText] = useState('');

//   const handleSearchButtonPress = () => {
//     // Check if the search text is empty
//     if (searchText.trim() === '') {
//       // If empty, call handleSearch with an empty string to show all items
//       handleSearch('');
//     } else {
//       // If not empty, call handleSearch with the search text
//       handleSearch(searchText);
//     }
//   };

//   return (
//     <View style={[styles.container, containerStyle]}>
//       <TextInput
//         style={styles.input}
//         placeholder="Search for a pet"
//         autoCapitalize="none"
//         autoCorrect={false}
//         onChangeText={setSearchText}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSearchButtonPress}>
//         <Image source={SearchIconWhite} style={styles.image} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SearchComp;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row', // Changed flexDirection to 'row'
//     alignItems: 'center',
//     justifyContent: 'space-between', // Changed justifyContent to 'space-between'
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'red',
//     marginTop: 30,
//     height: 54,
//   },
//   input: {
//     flex: 1, // Added flex: 1 to make the input occupy remaining space
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     height: 44,
//     backgroundColor: '#e5e5e5',
//   },
//   button: {
//     marginLeft: 10, // Added marginLeft to create space between input and button
//     height: 44,
//     width: 44,
//     backgroundColor: 'black',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     height: 30.22,
//     width: 30.22,
//   },
// });
