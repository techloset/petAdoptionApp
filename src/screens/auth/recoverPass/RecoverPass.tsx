// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Button,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";

// export default function RecoverPass() {
//   const [isSelected, setSelection] = useState(false);
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <Text style={styles.heading}>Recover Password</Text>

//         <View>
//           <Text style={styles.texts}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Email Address"
//             keyboardType="email-address"
//           />
//         </View>

//         <View>
//           <Text style={styles.text}>
//             Put your email above to get recover url
//           </Text>
//         </View>
//         {/* button signup */}
//         {/* <View style={{borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}}> */}
//         <View style={styles.buttonRecoverDiv}>
//           <TouchableOpacity style={styles.buttonRecover}>
//             <Text style={styles.recoverText}>Recover</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     width: "100%",
//     borderColor: "transparent",

//     justifyContent: "center",
//     // alignItems:"center",
//     backgroundColor: "transparent",
//     borderWidth: 2,
//   },
//   main: {
//     paddingHorizontal: 32,
//     borderColor: "transparent",
//     borderWidth: 2,
//   },
//   texts: {
//     fontSize: 18,
//     fontFamily: "Montserrat-Bold",
//   },

//   text: {
//     fontFamily: "Montserrat-SemiBold",
//     fontSize: 14,
//     lineHeight: 17.07,
//   },
//   heading: {
//     //    marginTop:50,
//     //    marginLeft:29,
//     marginVertical: 10,
//     fontSize: 36,
//     //   fontWeight: '800',
//     fontFamily: "Montserrat-ExtraBold",
//     lineHeight: 43,
//   },

//   input: {
//     // height: 30,
//     width: "100%",
//     // backgroundColor:'red',
//     borderWidth: 1,
//     // border
//     borderBottomWidth: 1, // Border only at the bottom
//     borderTopColor: "transparent", // Transparent top border
//     borderRightColor: "transparent", // Transparent right border
//     borderLeftColor: "transparent", // Transparent left border
//     borderBottomColor: "black",
//     paddingVertical: 2,
//     paddingHorizontal: 10,
//   },
//   forgotPassword: {
//     textAlign: "right",
//   },

//   buttonRecover: {
//     backgroundColor: "#101C1D",
//     padding: 10,
//     borderRadius: 50,
//     width: "70%",
//     height: 60,
//     // marginHorizontal:'auto',
//     display: "flex",
//     justifyContent: "center",
//     // alignItems
//     marginVertical: 20,
//   },
//   recoverText: {
//     color: "white",
//     fontSize: 20,
//     fontFamily: "Montserrat-Bold",
//     textAlign: "center",
//     lineHeight: 24.38,
//   },
//   buttonRecoverDiv: {
//     // borderWidth: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   termServies: {
//     fontFamily: "Montserrat-SemiBold",
//     fontSize: 14,
//     lineHeight: 17.07,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import auth from '@react-native-firebase/auth';
export default function RecoverPass() {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = () => {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert("Password reset email sent successfully.");
    })
    .catch((error) => {
      Alert.alert("Error sending password reset email: " + error.message);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.heading}>Recover Password</Text>

        <View>
          <Text style={styles.texts}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text style={styles.text}>
            Put your email above to get recover url
          </Text>
        </View>

        <View style={styles.buttonRecoverDiv}>
          <TouchableOpacity
            style={styles.buttonRecover}
            onPress={handleRecoverPassword}>
            <Text style={styles.recoverText}>Recover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Your existing styles remain unchanged
  container: {
    height: '100%',
    width: '100%',
    borderColor: 'transparent',

    justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  main: {
    paddingHorizontal: 32,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  texts: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },

  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 17.07,
  },
  heading: {
    //    marginTop:50,
    //    marginLeft:29,
    marginVertical: 10,
    fontSize: 36,
    //   fontWeight: '800',
    fontFamily: 'Montserrat-ExtraBold',
    lineHeight: 43,
  },

  input: {
    // height: 30,
    width: '100%',
    // backgroundColor:'red',
    borderWidth: 1,
    // border
    borderBottomWidth: 1, // Border only at the bottom
    borderTopColor: 'transparent', // Transparent top border
    borderRightColor: 'transparent', // Transparent right border
    borderLeftColor: 'transparent', // Transparent left border
    borderBottomColor: 'black',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  forgotPassword: {
    textAlign: 'right',
  },

  buttonRecover: {
    backgroundColor: '#101C1D',
    padding: 10,
    borderRadius: 50,
    width: '70%',
    height: 60,
    // marginHorizontal:'auto',
    display: 'flex',
    justifyContent: 'center',
    // alignItems
    marginVertical: 20,
  },
  recoverText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 24.38,
  },
  buttonRecoverDiv: {
    // borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termServies: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 17.07,
  },
});
