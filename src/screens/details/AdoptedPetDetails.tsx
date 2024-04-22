import React from 'react';
import favouriteIcon from '../../asset/favouritePetDetails.png';
import goBackPetDetails from '../../asset/goBackPetDetails.png';
import backgroundImg from '../../asset/images/dog1.jpg';
import searchIcon from '../../asset/searchIconDetailPage.png';
// import serverTimeStamp fro
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import topRectangle from '../../asset/top-info-rectangle.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {auth, firestore} from '../../config/firebase';
import {useAppSelector} from '../../hooks/hooks';

const PetDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item}: any = route.params;
  const userNewData = useAppSelector(state => state.user.userData);
  // console.log("userNewData",userNewData);

  const currentUserEmail = auth().currentUser?.email;
  const loggedEmail = item.email;

  const handleAdoptNow = () => {
    if (currentUserEmail === loggedEmail) {
      // Alert if the current user is the owner of the pet
      Alert.alert(
        'Error',
        'This pet is donated by you. You already have this pet.',
      );
    } else {
      // Send item data to Firestore collection
      firestore()
        .collection('requests')
        .add({
          ...item,
          requesterEmail: userNewData?.email, // Add the email of the current user as requesterEmail
          requesterImage: userNewData?.image, // Add the email of the current user as requesterEmail
          requesterName: userNewData?.userName, // Add the email of the current user as requesterEmail
          createTime: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Alert.alert(
            'Success',
            'Your request has been submitted successfully.',
          );
        })
        .catch(error => {
          console.error('Error adding document: ', error);
          Alert.alert(
            'Error',
            'An error occurred while processing your request. Please try again later.',
          );
        });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Your existing JSX code */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Image source={goBackPetDetails} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={favouriteIcon} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.bgImageDiv}>
        {/* <ImageBackground
          source={{uri: item.imageUrl}}
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
        /> */}
        {/* </ImageBackground>  */}
        <ImageBackground
          source={{uri: item.imageUrl}}
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
        >
          <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={goBackPetDetails} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={favouriteIcon} />
        </TouchableOpacity>
      </View>
        
        
        </ImageBackground>
      </View>
      <View style={styles.detailDiv}>
        <View style={styles.topRectangleDiv}>
          <Image source={topRectangle} style={styles.topRectangle} />
        </View>
        <View style={styles.topInfoDiv}>
          <View style={styles.breedANDTypeDiv}>
            <View>
              <Text style={styles.breed}>{item.breed}</Text>
            </View>
            <View>
              <Text style={styles.type}>{item.selectedType}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.price}>{item.amount}</Text>
          </View>
        </View>
        <View style={styles.secondInfoDiv}>
          <View style={styles.ageDiv}>
            <Text style={styles.ageHeading}>{item.age}</Text>
            <Text style={styles.age}>4</Text>
          </View>
          <View style={styles.genderDiv}>
            <Text style={styles.genderHeading}>Gender</Text>
            <Text style={styles.gender}>{item.selectedGenderStatusType}</Text>
          </View>
          <View style={styles.weightDiv}>
            <Text style={styles.weightHeading}>Weight</Text>
            <Text style={styles.weight}>{item.weight}</Text>
          </View>
          <View style={styles.vaccineDiv}>
            <Text style={styles.vaccineHeading}>Vaccine</Text>
            <Text style={styles.vaccine}>{item.selectedVaccineStatusType}</Text>
          </View>
        </View>
        <View style={styles.ownerInfoDiv}>
          <View style={styles.leftDiv}>
            <View style={styles.ownerImgDiv}>
              <Image
                source={{uri: item.userImage}}
                style={styles.ownerImg}
                resizeMode="cover"
              />
            </View>
            <View style={styles.ownerNameRoleDiv}>
              <View>
                <Text style={styles.ownerName}>{item.userName}</Text>
              </View>
              <View>
                <Text style={styles.ownerRole}>Owner</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightDiv}>
            <Text
            // style={styles.ownerLocation}
            >
              {item.location}{' '}
              <Image
                source={searchIcon}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </Text>
          </View>
        </View>
        <View style={styles.descriptionDiv}>
          <ScrollView>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </ScrollView>
        </View>
        <View style={styles.lastButtonDiv}>
          <TouchableOpacity style={styles.lastButton} onPress={handleAdoptNow}>
            <Text style={styles.lastButtonText}>Adopt Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // marginTop: 30,
  },
  header: {
    // height: '4%',
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bgImageDiv: {
    height: '44%', // Increased the height to accommodate the detailDiv
    borderWidth: 1,
    width: '100%',
  },
  detailDiv: {
    height: '60%', // Decreased the height to make it climb up
    marginBottom: 100,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: '-10%', // Adding some negative margin to the top
    paddingTop: 10, // Adding some padding to the top of the content
  },
  topRectangleDiv: {
    height: '2%',
    // width:50,
    width: '100%',
    alignItems: 'center',
  },
  topRectangle: {
    height: 5,
    width: 54,
    // width:50,
  },
  topInfoDiv: {
    width: '100%',
    height: '15%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  breedANDTypeDiv: {},
  breed: {
    fontSize: 24,
    lineHeight: 29.26,
  },
  type: {
    fontSize: 14,
    lineHeight: 17.07,
  },
  price: {
    fontSize: 24,
    lineHeight: 29.26,
  },
  secondInfoDiv: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ageDiv: {
    backgroundColor: '#fef6ea',
    width: 75,
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  age: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  ageHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: 'rgba(246, 165, 48, 1)',
  },

  genderDiv: {
    backgroundColor: '#fef6ea',
    width: 75,
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  gender: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  genderHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: 'rgba(246, 165, 48, 1)',
  },
  weightDiv: {
    backgroundColor: '#fef6ea',
    width: 75,
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  weight: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  weightHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: 'rgba(246, 165, 48, 1)',
  },
  vaccineDiv: {
    backgroundColor: '#fef6ea',
    width: 75,
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  vaccine: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  vaccineHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: 'rgba(246, 165, 48, 1)',
  },
  ownerInfoDiv: {
    // backgroundColor: "blue",
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftDiv: {
    backgroundColor: 'transparent',
    height: '100%',
    // borderWidth: 1,
    // borderColor: "black",
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  ownerImgDiv: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
  },
  ownerImg: {
    height: '100%',
    width: '100%',
  },
  ownerNameRoleDiv: {
    marginLeft: 10,
    // borderWidth:2,
  },
  ownerName: {},
  ownerRole: {},
  rightDiv: {
    backgroundColor: 'transparent',
    height: '100%',
    // borderWidth: 1,
    // borderColor: "black",
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 40,
  },
  // ownerLocation: {
  //   height: "40%",
  //   width: "80%",
  //   borderWidth: 2,
  //   borderColor: "green",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginLeft: "auto",
  // },
  descriptionDiv: {
    height: '20%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 15.85,
  },
  lastButtonDiv: {
    height: '23%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastButton: {
    height: 74,
    width: '90%',
    backgroundColor: 'rgba(16, 28, 29, 1)',
    borderRadius: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24.38,
  },
});

// import React, { useState, useEffect } from "react";
// import favouriteIcon from "../../asset/favouritePetDetails.png";
// import goBackPetDetails from "../../asset/goBackPetDetails.png";
// import backgroundImg from "../../asset/images/dog1.jpg";
// import searchIcon from "../../asset/searchIconDetailPage.png";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import topRectangle from "../../asset/top-info-rectangle.png";
// import { useRoute } from '@react-navigation/native';
// import { auth, firestore } from "../../config/firebase";

// const PetDetails = () => {
//   const route = useRoute();
//   const { item } = route.params;
//   const currentUserEmail = auth().currentUser?.email;
//   const loggedEmail = item.email;
//   const [userData, setUserData] = useState({ userName: '', profileImageUrl: '' });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userSnapshot = await firestore()
//           .collection('users')
//           .where('email', '==', currentUserEmail)
//           .get();

//         if (!userSnapshot.empty) {
//           const userData = userSnapshot.docs[0].data();
//           setUserData({
//             userName: userData.userName,
//             profileImageUrl: userData.profileImageUrl
//           });
//         } else {
//           // Handle case where user data is not found
//           console.error("User data not found for email:", currentUserEmail);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         // Handle error gracefully
//       }
//     };

//     if (currentUserEmail) {
//       fetchUserData();
//     }
//   }, [currentUserEmail]);

//   const handleAdoptNow = async () => {
//     if (!currentUserEmail) {
//       // Handle case where current user is not logged in
//       return Alert.alert('Error', 'You need to be logged in to adopt a pet.');
//     }

//     if (currentUserEmail === loggedEmail) {
//       // Alert if the current user is the owner of the pet
//       return Alert.alert('Error', 'This pet is donated by you. You already have this pet.');
//     }

//     try {
//       await firestore().collection('requests').add({
//         ...item,
//         requesterEmail: currentUserEmail,
//         userName: userData.userName,
//         userImage: userData.profileImageUrl,
//       });
//       Alert.alert('Success', 'Your request has been submitted successfully.');
//     } catch (error) {
//       console.error('Error adding document:', error);
//       Alert.alert('Error', 'An error occurred while processing your request. Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Your existing JSX code */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Image source={goBackPetDetails} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={favouriteIcon} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.bgImageDiv}>
//         <Image
//           source={{ uri: item.imageUrl }}
//           style={{ height: "100%", width: "100%" }}
//           resizeMode="cover"
//         />
//       </View>
//       <View style={styles.detailDiv}>
//         <View style={styles.topRectangleDiv}>
//           <Image source={topRectangle} style={styles.topRectangle} />
//         </View>
//         {/* Rest of your JSX */}
//         <View style={styles.topInfoDiv}>
//           <View style={styles.breedANDTypeDiv}>
//             <View>
//               <Text style={styles.breed}>{item.breed}</Text>
//             </View>
//             <View>
//               <Text style={styles.type}>{item.selectedType}</Text>
//             </View>
//           </View>
//           <View>
//             <Text style={styles.price}>{item.amount}</Text>
//           </View>
//         </View>
//         <View style={styles.secondInfoDiv}>
//           <View style={styles.ageDiv}>
//             <Text style={styles.ageHeading}>{item.age}</Text>
//             <Text style={styles.age}>4</Text>
//           </View>
//           <View style={styles.genderDiv}>
//             <Text style={styles.genderHeading}>Gender</Text>
//             <Text style={styles.gender}>{item.selectedGenderStatusType}</Text>
//           </View>
//           <View style={styles.weightDiv}>
//             <Text style={styles.weightHeading}>Weight</Text>
//             <Text style={styles.weight}>{item.weight}</Text>
//           </View>
//           <View style={styles.vaccineDiv}>
//             <Text style={styles.vaccineHeading}>Vaccine</Text>
//             <Text style={styles.vaccine}>{item.selectedVaccineStatusType}</Text>
//           </View>
//         </View>
//         <View style={styles.ownerInfoDiv}>
//           <View style={styles.leftDiv}>
//             <View style={styles.ownerImgDiv}>
//               <Image
//                 source={backgroundImg}
//                 style={styles.ownerImg}
//                 resizeMode="cover"
//               />
//             </View>
//             <View style={styles.ownerNameRoleDiv}>
//               <View>
//                 <Text style={styles.ownerName}>Shin Ryujin</Text>
//               </View>
//               <View>
//                 <Text style={styles.ownerRole}>Owner</Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.rightDiv}>
//             <Text
//             // style={styles.ownerLocation}
//             >
//               {item.location}{" "}
//               <Image
//                 source={searchIcon}
//                 style={{ height: 20, width: 20 }}
//                 resizeMode="contain"
//               />
//             </Text>
//           </View>
//         </View>
//         <View style={styles.descriptionDiv}>
//           <ScrollView>
//             <Text style={styles.descriptionText}>
//              {item.description}
//             </Text>
//           </ScrollView>
//         </View>
//       <View style={styles.lastButtonDiv}>
//         <TouchableOpacity
//           style={styles.lastButton}
//           onPress={handleAdoptNow}
//         >
//           <Text style={styles.lastButtonText}>Adopt Now</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//     </View>
//   );
// };

// export default PetDetails;

// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//     backgroundColor: "cyan",
//     // marginTop: 30,
//   },
//   header: {
//     height: "5%",
//     width: "100%",
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//   },
//   bgImageDiv: {
//     height: "40%", // Increased the height to accommodate the detailDiv
//     borderWidth: 1,
//     width: "100%",
//   },
//   detailDiv: {
//     height: "60%", // Decreased the height to make it climb up
//     marginBottom: 100,
//     backgroundColor: "white",
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//     marginTop: "-10%", // Adding some negative margin to the top
//     paddingTop: 10, // Adding some padding to the top of the content
//   },
//   topRectangleDiv: {
//     height: "2%",
//     // width:50,
//     width: "100%",
//     alignItems: "center",
//   },
//   topRectangle: {
//     height: 5,
//     width: 54,
//     // width:50,
//   },
//   topInfoDiv: {
//     width: "100%",
//     height: "15%",
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   breedANDTypeDiv: {},
//   breed: {
//     fontSize: 24,
//     lineHeight: 29.26,
//   },
//   type: {
//     fontSize: 14,
//     lineHeight: 17.07,
//   },
//   price: {
//     fontSize: 24,
//     lineHeight: 29.26,
//   },
//   secondInfoDiv: {
//     backgroundColor: "transparent",
//     width: "100%",
//     height: "20%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   ageDiv: {
//     backgroundColor: "#fef6ea",
//     width: 75,
//     height: 59,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 18,
//   },
//   age: {
//     fontSize: 16,
//     lineHeight: 19.5,
//   },
//   ageHeading: {
//     fontSize: 11,
//     lineHeight: 13.41,
//     color: "rgba(246, 165, 48, 1)",
//   },

//   genderDiv: {
//     backgroundColor: "#fef6ea",
//     width: 75,
//     height: 59,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 18,
//   },
//   gender: {
//     fontSize: 16,
//     lineHeight: 19.5,
//   },
//   genderHeading: {
//     fontSize: 11,
//     lineHeight: 13.41,
//     color: "rgba(246, 165, 48, 1)",
//   },
//   weightDiv: {
//     backgroundColor: "#fef6ea",
//     width: 75,
//     height: 59,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 18,
//   },
//   weight: {
//     fontSize: 16,
//     lineHeight: 19.5,
//   },
//   weightHeading: {
//     fontSize: 11,
//     lineHeight: 13.41,
//     color: "rgba(246, 165, 48, 1)",
//   },
//   vaccineDiv: {
//     backgroundColor: "#fef6ea",
//     width: 75,
//     height: 59,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 18,
//   },
//   vaccine: {
//     fontSize: 16,
//     lineHeight: 19.5,
//   },
//   vaccineHeading: {
//     fontSize: 11,
//     lineHeight: 13.41,
//     color: "rgba(246, 165, 48, 1)",
//   },
//   ownerInfoDiv: {
//     // backgroundColor: "blue",
//     width: "100%",
//     height: "20%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   leftDiv: {
//     backgroundColor: "transparent",
//     height: "100%",
//     // borderWidth: 1,
//     // borderColor: "black",
//     width: "50%",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },

//   ownerImgDiv: {
//     height: 40,
//     width: 40,
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 50,
//     overflow: "hidden",
//     marginLeft: 10,
//   },
//   ownerImg: {
//     height: "100%",
//     width: "100%",
//   },
//   ownerNameRoleDiv: {
//     marginLeft: 10,
//     // borderWidth:2,
//   },
//   ownerName: {},
//   ownerRole: {},
//   rightDiv: {
//     backgroundColor: "transparent",
//     height: "100%",
//     // borderWidth: 1,
//     // borderColor: "black",
//     width: "50%",
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginRight: 40,
//   },
//   // ownerLocation: {
//   //   height: "40%",
//   //   width: "80%",
//   //   borderWidth: 2,
//   //   borderColor: "green",
//   //   flexDirection: "row",
//   //   justifyContent: "center",
//   //   marginLeft: "auto",
//   // },
//   descriptionDiv: {
//     height: "20%",
//     width: "100%",
//     backgroundColor: "transparent",
//   },
//   descriptionText: {
//     fontSize: 13,
//     lineHeight: 15.85,
//   },
//   lastButtonDiv: {
//     height: "23%",
//     // borderWidth: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lastButton: {
//     height: 74,
//     width: "90%",
//     backgroundColor: "rgba(16, 28, 29, 1)",
//     borderRadius: 34,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lastButtonText: {
//     color: "white",
//     fontSize: 20,
//     lineHeight: 24.38,
//   },
// });
