import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import profileImgIcon from '../asset/profileImgIcon.png';
import {auth, firestore, storage} from '../config/firebase';
import {firebase} from '@react-native-firebase/firestore';
import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import {getUserData} from '../store/slices/userSlice';
import ImagePicker from 'react-native-image-crop-picker';
// import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation}: any) => {
  // const navigation=useNavigation()
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.userData);
  const userName = userData?.userName;
  const email = auth().currentUser?.email;
  const currentUserUID: string | null = auth().currentUser?.uid;
  const nowUser = auth().currentUser;
  dispatch(getUserData(currentUserUID));

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageProfile = () => {
    Alert.alert(
      'Select Image Source',
      'Choose the source for your image',
      [
        {text: 'Gallery', onPress: () => openImagePicker('gallery')},
        {text: 'Camera', onPress: () => openImagePicker('camera')},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: false,
        cropperCircleOverlay: true,
      });

      setSelectedImage(image.path);
    } catch (error) {}
  };
  const handleChangeName = (text: any) => {
    setNewUserName(text); // Update the new username
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    console.log('User profile updated!');
    try {
      let updatedImageURL = userData?.image || '';
      if (selectedImage) {
        const imageRef = storage()
          .ref()
          .child(`profile_images/${userData?.uid}`);
        await imageRef.putFile(selectedImage);
        updatedImageURL = await imageRef.getDownloadURL();
      }
      // Update the fields in the user document
      const updatedUserName = newUserName || userData?.userName || '';

      await firestore().collection('users').doc(nowUser?.uid).update({
        userName: updatedUserName,
        image: updatedImageURL,
      });
      setLoading(false);
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleNavigation = () => {
    navigation.navigate('UpdatePassword');
  };

  return (
    <ScrollView>
      {/* ... (rest of your component code) */}
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Settings</Text>
        <View style={styles.profileImgDiv}>
          <TouchableOpacity onPress={handleImageProfile}>
            <View style={styles.profileImgCircle}>
              {userData ? (
                // <Image
                //   source={{uri: selectedImage || userData?.image}}
                //   style={styles.profileImgIcon}
                // />
                <Image
                  source={
                    selectedImage
                      ? {uri: selectedImage}
                      : userData?.image
                      ? {uri: userData.image}
                      : profileImgIcon
                  }
                  style={styles.profileImgIcon}
                />
              ) : (
                <Image source={profileImgIcon} style={styles.profileImgIcon} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userNameDiv}>
          <Text style={styles.texts}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder={userData?.userName}
            keyboardType="email-address"
            onChangeText={handleChangeName}
          />
        </View>

        <View style={styles.userEmailDiv}>
          <Text style={styles.texts}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={userData?.email}
            keyboardType="email-address"
            editable={false}
            onChangeText={handleChangeName}
          />
        </View>
        <View style={{width: 303, borderWidth: 1, borderColor: 'transparent'}}>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={{marginLeft: 'auto'}}>Update Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonUpdateDiv}>
          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={handleUpdateProfile}>
            <Text style={styles.updateProfileText}>
              {loading ? (
                <ActivityIndicator size={'large'} />
              ) : (
                'Update Profile'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    lineHeight: 29.26,
    fontFamily:'Montserrat-Bold',
    marginTop: 78,
  },
  profileImgDiv: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 125,
    width: 125,
    marginTop: 47,
  },
  profileImgCircle: {
    height: 125,
    width: 125,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 71,
    borderStyle: 'dashed',
  },
  profileImgIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 71,
  },
  userNameDiv: {
    height: 62,
    width: 303,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 50,
  },
  userEmailDiv: {
    height: 62,
    width: 303,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 50,
  },
  texts: {
    fontSize: 18,
    lineHeight: 21.94,
    fontFamily:'Montserrat-SemiBold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  buttonUpdate: {
    backgroundColor: '#101C1D',
    padding: 10,
    borderRadius: 50,
    width: '90%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 20,
  },
  updateProfileText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 24.38,
  },
  buttonUpdateDiv: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    width: '100%',
    marginTop: 90,
  },
});







// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState} from 'react';
// import profileImgIcon from '../asset/profileImgIcon.png';
// import {auth, firestore, storage} from '../config/firebase';
// import {useAppSelector, useAppDispatch} from '../hooks/hooks';
// import {getUserData} from '../store/slices/userSlice';
// import ImagePicker from 'react-native-image-crop-picker';

// const Profile = ({navigation}: any) => {
//   const dispatch = useAppDispatch();
//   const userData = useAppSelector(state => state.user.userData);
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [newUserName, setNewUserName] = useState<string | null>(null);

//   dispatch(getUserData(auth().currentUser?.uid));

//   const handleImageProfile = () => {
//     Alert.alert(
//       'Select Image Source',
//       'Choose the source for your image',
//       [
//         {text: 'Gallery', onPress: () => openImagePicker('gallery')},
//         {text: 'Camera', onPress: () => openImagePicker('camera')},
//         {text: 'Cancel', style: 'cancel'},
//       ],
//       {cancelable: true},
//     );
//   };

//   const openImagePicker = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 300,
//         cropping: true,
//         includeBase64: false,
//         cropperCircleOverlay: true,
//       });

//       setSelectedImage(image.path);
//     } catch (error) {
//       console.error('Error selecting image:', error);
//     }
//   };

//   const handleChangeName = (text: string) => {
//     setNewUserName(text);
//   };

//   const handleUpdateProfile = async () => {
//     setLoading(true);
//     try {
//       let updatedImageURL = userData?.image || '';
//       if (selectedImage) {
//         const imageRef = storage()
//           .ref()
//           .child(`profile_images/${auth().currentUser?.uid}`);
//         await imageRef.putFile(selectedImage);
//         updatedImageURL = await imageRef.getDownloadURL();
//       }

//       const updatedUserName = newUserName || userData?.userName || '';

//       await firestore().collection('users').doc(auth().currentUser?.uid).update({
//         userName: updatedUserName,
//         image: updatedImageURL,
//       });

//       console.log('User profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNavigation = () => {
//     navigation.navigate('UpdatePassword');
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Profile Settings</Text>
//         <View style={styles.profileImgDiv}>
//           <TouchableOpacity onPress={handleImageProfile}>
//             <View style={styles.profileImgCircle}>
//               {userData ? (
//                 <Image
//                   source={{uri: selectedImage || userData?.image}}
//                   style={styles.profileImgIcon}
//                 />
//               ) : (
//                 <Image source={profileImgIcon} style={styles.profileImgIcon} />
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.userNameDiv}>
//           <Text style={styles.texts}>Username</Text>
//           <TextInput
//             style={styles.input}
//             value={newUserName || ''}
//             placeholder="Enter Username"
//             onChangeText={handleChangeName}
//           />
//         </View>
//         <View style={styles.userEmailDiv}>
//           <Text style={styles.texts}>Email</Text>
//           <Text style={styles.texts}>{userData?.email}</Text>
//         </View>
//         <View style={{width: 303, borderWidth: 1, borderColor: 'transparent'}}>
//           <TouchableOpacity onPress={handleNavigation}>
//             <Text style={{marginLeft: 'auto'}}>Update Password?</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.buttonUpdateDiv}>
//           <TouchableOpacity
//             style={styles.buttonUpdate}
//             onPress={handleUpdateProfile}>
//             <Text style={styles.updateProfileText}>
//               {loading ? (
//                 <ActivityIndicator size={'large'} />
//               ) : (
//                 'Update Profile'
//               )}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     borderWidth: 1,
//     borderColor: 'transparent',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     lineHeight: 29.26,
//     marginTop: 78,
//   },
//   profileImgDiv: {
//     borderWidth: 1,
//     borderColor: 'transparent',
//     height: 125,
//     width: 125,
//     marginTop: 47,
//   },
//   profileImgCircle: {
//     height: 125,
//     width: 125,
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 71,
//     borderStyle: 'dashed',
//   },
//   profileImgIcon: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     width: '100%',
//     height: '100%',
//     borderRadius: 71,
//   },
//   userNameDiv: {
//     height: 62,
//     width: 303,
//     borderWidth: 1,
//     borderColor: 'transparent',
//     marginTop: 50,
//   },
//   userEmailDiv: {
//     height: 62,
//     width: 303,
//     borderWidth: 1,
//     borderColor: 'transparent',
//     marginTop: 50,
//   },
//   texts: {
//     fontSize: 18,
//     lineHeight: 21.94,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderBottomWidth: 1,
//     borderTopColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderBottomColor: 'black',
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//   },
//   buttonUpdate: {
//     backgroundColor: '#101C1D',
//     padding: 10,
//     borderRadius: 50,
//     width: '90%',
//     height: 60,
//     display: 'flex',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   updateProfileText: {
//     color: 'white',
//     fontSize: 20,
//     fontFamily: 'Montserrat-Bold',
//     textAlign: 'center',
//     lineHeight: 24.38,
//   },
//   buttonUpdateDiv: {
//     display: 'flex',
//     alignItems: 'center',
//     borderWidth: 0,
//     borderColor: 'transparent',
//     width: '100%',
//     marginTop: 90,
//   },
// });
