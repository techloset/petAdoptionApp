// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {useRef, useState, useEffect} from 'react';
// import {dropDown} from '../../asset/dropDown.png';
// import bigDropDown from '../../asset/bigDropDown.png';
// import imagePickerIcon from '../../asset/imagePickerIcon.png';
// import goBackIcon from '../../asset/goBack.png';
// import ImagePicker from 'react-native-image-crop-picker';
// import firestore from '@react-native-firebase/firestore';
// import {useAppSelector} from '../../hooks/hooks';
// import storage from '@react-native-firebase/storage';
// import {useNavigation} from '@react-navigation/native';
// import {firebase} from '@react-native-firebase/auth';
// import {auth} from '../../config/firebase';

// interface ImageData {
//   path: string;
//   filename: string;
// }

// const types = [
//   {id: 1, type: 'Dog'},
//   {id: 2, type: 'Cat'},
//   {id: 3, type: 'Bird'},
//   {id: 4, type: 'Rabbit'},
//   {id: 5, type: 'Hamster'},
//   {id: 6, type: 'Guinea Pig'},
//   {id: 7, type: 'Fish'},
//   {id: 8, type: 'Turtle'},
//   {id: 9, type: 'Parrot'},
//   {id: 10, type: 'Snake'},
//   {id: 11, type: 'Ferret'},
//   {id: 12, type: 'Horse'},
//   {id: 13, type: 'Rat'},
//   {id: 14, type: 'Mouse'},
//   {id: 15, type: 'Lizard'},
//   {id: 16, type: 'Gerbil'},
//   {id: 17, type: 'Chinchilla'},
//   {id: 18, type: 'Hedgehog'},
//   {id: 19, type: 'Sugar Glider'},
//   {id: 20, type: 'Potbellied Pig'},
// ];
// const vaccine = [
//   {id: 1, status: 'yes'},
//   {id: 2, status: 'no'},
// ];
// const genders = [
//   {id: 1, gender: 'Male'},
//   {id: 2, gender: 'FeMale'},
//   {id: 3, gender: 'Other'},
// ];

// const DonateData = () => {
//   const navigation = useNavigation();
//   const userData = useAppSelector(state => state.user.userData);

//   // userData.
//   // main hook
//   const [data, setData] = useState({
//     selectedType: '',
//     breed: '',
//     amount: '',
//     selectedVaccineStatusType: '',
//     selectedGenderStatusType: '',
//     age: '',
//     weight: '',
//     location: '',
//     description: '',
//     imageUrl: '',
//     userName: '',
//     userImage: '',
//     uid: '',
//     // name: '',
//     email: '',
//     serialNo: '',
//     // uid: '',
//     // userName: '',
//     // userImage:'',
//     createdAt: '',
//   });
//   // console.log('data is', data);

//   const [selectedType, setSelectedType] = useState('');
//   const [isClicked, setIsClicked] = useState(false);
//   const [type, setType] = useState(types);
//   const userNewData = useAppSelector(state => state.user.userData);

//   const [isLoading, setIsloading] = useState(false);
//   // Serialize the createdAt field to a Firestore Timestamp object
//   // const createdAtTimestamp = firebase.firestore.Timestamp.now();
//   const createdAtMillis = Date.now();

//   useEffect(() => {
//     if (userData) {
//       // handleChange('userImage', userData.image);
//       handleChange('email', userData.email);
//       // handleChange('uid', userData.uid);
//       // handleChange('userName', userData.userName);
//       // handleChange('createdAt', firestore.FieldValue.serverTimestamp());
//       handleChange('createdAt', createdAtMillis);
//     }
//   }, [userData]);

//   const vaccineStatuses = [
//     {id: 1, status: 'Yes'},
//     {id: 2, status: 'No'},
//   ];
//   const genderStatuses = [
//     {id: 1, status: 'Male'},
//     {id: 2, status: 'Female'},
//     {id: 3, status: 'Other'},
//   ];
//   // gender hooks
//   const [isGenderStatusClicked, setIsGenderStatusClicked] = useState(false);
//   // vaccinated hooks
//   const [isVaccineStatusClicked, setIsVaccineStatusClicked] = useState(false);

//   // description hooks
//   const [imageUrl, setImageUrl] = useState<string>('');
//   console.log('imageUrl', imageUrl);
//   const searchRef = useRef();

//   const onSearch = (txt: any) => {
//     if (txt !== '') {
//       let tempData = type.filter(item => {
//         return item.type.toLowerCase().indexOf(txt.toLowerCase()) > -1;
//       });
//       setType(tempData);
//     } else {
//       setType(types);
//     }
//   };

//   const hello = auth().currentUser;
//   const userId: any = auth().currentUser?.uid;

//   const handleChange = (name: any, value: any) => {
//     setData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const onSelectImage = async () => {
//     try {
//       const image: any = await ImagePicker.openPicker({
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
//       setIsloading(true);
//       // Generate a unique file name for the image
//       const filename = `${Date.now()}-${image.filename}`;

//       // Create a reference to the Firebase Storage path
//       const storageRef = storage().ref(`images/${filename}`);

//       // Upload the selected image to Firebase Storage
//       await storageRef.putFile(image.path);

//       // Get the download URL of the uploaded image
//       const downloadURL = await storageRef.getDownloadURL();

//       // Set the download URL in the component state or wherever you need it
//       setImageUrl(downloadURL);

//       // Update the image URL in the data object
//       handleChange('image', downloadURL);
//     } catch (error) {
//       console.error('Error selecting image:', error);
//       setIsloading(false);
//     } finally {
//       setIsloading(false);
//     }
//   };

//   const generateUid = () => {
//     // Generate a random 16-character string (you can use any method to generate a unique ID)
//     return Math.random().toString(36).substring(2, 10);
//   };

//   // Function to handle donation
//   const handleDonation = async (data: any, imageUrl: any) => {
//     const serials = generateUid();
//     try {
//       console.log('Data:', data);
//       console.log('Image URL:', imageUrl);

//       // Create a Firestore document with the data
//       // await firestore().collection('donations').add({
//       //   selectedType: data.selectedType,
//       //   breed: data.breed,
//       //   amount: data.amount,
//       //   selectedVaccineStatusType: data.selectedVaccineStatusType,
//       //   selectedGenderStatusType: data.selectedGenderStatusType,
//       //   age: data.age,
//       //   weight: data.weight,

//       //   location: data.location,
//       //   description: data.description,
//       //   imageUrl: imageUrl, // Save the download URL of the uploaded image

//       //   email: hello?.email,
//       //   userName: userNewData?.userName,
//       //   userImage: userNewData?.image,
//       //   uid: userId,
//       //   serialNo: serials,
//       //   // createdAt: firestore.FieldValue.serverTimestamp(),
//       //   createdAt: createdAtMillis,
//       // });

//       await firestore().collection('donations').doc(serials).set({
//         selectedType: data.selectedType,
//         breed: data.breed,
//         amount: data.amount,
//         selectedVaccineStatusType: data.selectedVaccineStatusType,
//         selectedGenderStatusType: data.selectedGenderStatusType,
//         age: data.age,
//         weight: data.weight,

//         location: data.location,
//         description: data.description,
//         imageUrl: imageUrl, // Save the download URL of the uploaded image

//         email: hello?.email,
//         userName: userNewData?.userName,
//         userImage: userNewData?.image,
//         uid: userId,
//         serialNo: serials,
//         // createdAt: firestore.FieldValue.serverTimestamp(),
//         createdAt: createdAtMillis,
//       });

//       // Optionally, you can reset the form fields after successful donation
//       setData({
//         selectedType: '',
//         breed: '',
//         amount: '',
//         selectedVaccineStatusType: '',
//         selectedGenderStatusType: '',
//         age: '',
//         weight: '',
//         location: '',
//         uid: '',
//         description: '',
//         imageUrl: '',
//         email: '',
//         serialNo: '',
//         userName: '',
//         userImage: '',

//         createdAt: '',
//       });
//     } catch (error) {
//       console.error('Error donating:', error);
//     }
//   };

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.container}>
//         {/* <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/pet-adoption-app-591f0.appspot.com/o/images%2F1711962510931-undefined?alt=media&token=095ff77d-1839-4bfc-af4a-148b0a571bc7'}}
//   style = {{ width: 200, height: 200 }}
//   /> */}
//         <View style={styles.heading}>
//           <TouchableOpacity onPress={handleGoBack}>
          
//             <Image source={goBackIcon} style={{marginLeft: 15}} />
//           </TouchableOpacity>
//         </View>
//         {/* type div start */}
//         <View style={styles.typeDiv}>
//           <Text>Pet Type</Text>
//           <TouchableOpacity
//             style={styles.typeSelector}
//             onPress={() => {
//               setIsClicked(!isClicked);
//             }}>
//             <Text>{selectedType}</Text>
//             <Image
//               source={bigDropDown}
//               style={{
//                 height: 20,
//                 width: 20,
//                 // backgroundColor: "pink",
//                 marginLeft: 'auto',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {isClicked ? (
//           <View style={styles.dropdownArea}>
//             <TextInput
//               ref={searchRef}
//               placeholder="search pet"
//               style={styles.searchType}
//               onChangeText={txt => {
//                 onSearch(txt);
//               }}
//             />
//             <FlatList
//               data={type}
//               renderItem={({item}) => {
//                 return (
//                   <TouchableOpacity
//                     style={styles.typeItem}
//                     onPress={() => {
//                       setSelectedType(item.type);
//                       handleChange('selectedType', item.type);
//                       onSearch('');
//                       setIsClicked(false);
//                       searchRef.current.clear();
//                     }}>
//                     <Text>{item.type}</Text>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         ) : null}
//         {/* type div end */}

//         <View style={styles.breedDiv}>
//           <Text>Pet Breed</Text>
//           <TextInput
//             style={{height: 40}}
//             // editable={false}
//             value={data.breed}
//             onChangeText={val => handleChange('breed', val)}
//             // value={breed}
//           />
//         </View>
//         {/* amount Div start */}
//         <View style={styles.amountDiv}>
//           <Text>Amount</Text>
//           <TextInput
//             style={{height: 40}}
//             keyboardType="numeric"
//             value={data.amount}
//             onChangeText={val => handleChange('amount', val)}
//             // value={amount}
//             // editable={false}
//           />
//         </View>
//         {/* amount Div end */}
//         {/* vaccine div start */}
//         <View style={styles.vaccineDiv}>
//           <Text>Vaccinated</Text>
//           <TouchableOpacity
//             style={styles.vaccineStatusSelector}
//             onPress={() => {
//               setIsVaccineStatusClicked(!isVaccineStatusClicked);
//             }}>
//             <Text>{data.selectedVaccineStatusType}</Text>
//             <Image
//               source={bigDropDown}
//               style={{
//                 height: 20,
//                 width: 20,
//                 marginLeft: 'auto',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {isVaccineStatusClicked ? (
//           <View style={styles.dropdownVaccineArea}>
//             <FlatList
//               data={vaccineStatuses}
//               renderItem={({item}) => {
//                 return (
//                   <TouchableOpacity
//                     style={styles.typeItem}
//                     onPress={() => {
//                       handleChange('selectedVaccineStatusType', item.status); // Update selectedVaccineStatusType field
//                       setIsVaccineStatusClicked(false);
//                     }}>
//                     <Text>{item.status}</Text>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         ) : null}
//         {/* </View> */}
//         {/* vaccine div end */}
//         {/* genderr div start */}
//         <View style={styles.genderDiv}>
//           <Text>Gender</Text>
//           <TouchableOpacity
//             style={styles.vaccineStatusSelector}
//             onPress={() => {
//               setIsGenderStatusClicked(!isGenderStatusClicked);
//             }}>
//             <Text>{data.selectedGenderStatusType}</Text>
//             <Image
//               source={bigDropDown}
//               style={{
//                 height: 20,
//                 width: 20,
//                 marginLeft: 'auto',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {isGenderStatusClicked ? (
//           <View style={styles.dropdownGenderArea}>
//             <FlatList
//               data={genderStatuses}
//               renderItem={({item}) => {
//                 return (
//                   <TouchableOpacity
//                     style={styles.typeItem}
//                     onPress={() => {
//                       handleChange('selectedGenderStatusType', item.status); // Update selectedGenderStatusType field
//                       setIsGenderStatusClicked(false);
//                     }}>
//                     <Text>{item.status}</Text>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         ) : null}
//         {/* genderr div end */}
//         {/* ageDiv start */}
//         <View style={styles.weightDiv}>
//           <Text>Age</Text>
//           <TextInput
//             style={{height: 40}}
//             value={data.age}
//             onChangeText={val => handleChange('age', val)}
//             // value={age}
//             // editable={false}
//           />
//         </View>
//         {/* ageDiv  end*/}
//         {/* weightDiv start */}
//         <View style={styles.ageDiv}>
//           <Text>Weight</Text>
//           <TextInput
//             style={{height: 40}}
//             keyboardType="numeric"
//             value={data.weight}
//             onChangeText={val => handleChange('weight', val)}
//             // editable={false}
//           />
//         </View>
//         {/* weightDiv  end*/}
//         {/* LocationDiv start */}
//         <View style={styles.weightDiv}>
//           <Text>Location</Text>
//           <TextInput
//             style={{height: 40}}
//             // keyboardType="numeric"
//             value={data.location}
//             onChangeText={val => handleChange('location', val)}
//             // editable={false}
//           />
//         </View>
//         {/* LocationDiv end */}
//         {/* DescriptionDiv STARt */}
//         <View style={styles.descriptionDiv}>
//           <Text>Description:</Text>
//           {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
//           <TextInput
//             multiline
//             numberOfLines={4} // Adjust the number of lines as needed
//             style={{
//               height: 120,
//               borderColor: 'gray',
//               borderWidth: 1,
//               padding: 8,
//               borderRadius: 10,
//             }}
//             value={data.description}
//             keyboardType="default"
//             onChangeText={val => handleChange('description', val)}
//           />
//           {/* </ScrollView> */}
//         </View>
//         {/* DescriptionDiv end */}
//         {/* Image picker div start */}
//         <View style={styles.imagePickerDiv}>
//           <Text>Image:</Text>
//           <TouchableOpacity onPress={onSelectImage}>
//             <View style={styles.imagePicker}>
//               {isLoading ? (
//                 // Show loader if isLoading is true
//                 <ActivityIndicator size="large" color="#0000ff" />
//               ) : (
//                 // Show the image picker div if isLoading is false
//                 // <View style={styles.imagePicker}>
//                 <Image
//                   source={imagePickerIcon}
//                   style={{height: 40, width: 40}}
//                 />

//                 // </View>
//               )}
//               {/* <Image source={imagePickerIcon} style={{height: 40, width: 40}} /> */}
//             </View>
//           </TouchableOpacity>
//         </View>
//         {/* Image picker div end */}
//         {/* Donate button start */}
//         <TouchableOpacity
//           style={styles.donateButton}
//           onPress={() => handleDonation(data, imageUrl)}>
//           <Text style={styles.donateButtonText}>Donate</Text>
//         </TouchableOpacity>
//         {/* Donate button end */}
//       </View>
//     </ScrollView>
//   );
// };

// export default DonateData;

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     // flex: 1,
//     height: '100%',
//     width: '100%',
//     // borderWidth: 1,
//     borderColor: 'green',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   heading: {
//     // height: "4%",
//     width: '100%',
//     marginTop: 5,
//   },
//   typeDiv: {
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     height: 50,
//   },

//   typeSelector: {
//     paddingHorizontal: 10,

//     marginHorizontal: 'auto',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dropdownArea: {
//     width: '90%',
//     height: 300,
//     borderRadius: 10,
//     marginTop: 2,
//     backgroundColor: 'white',
//     elevation: 5,
//   },
//   searchType: {
//     width: '90%',
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 0.5,
//     borderColor: '#8e8e8e',
//     alignSelf: 'center',
//     paddingHorizontal: 10,
//   },
//   typeItem: {
//     width: '80%',
//     height: 50,
//     borderBottomColor: '#*e8e8e',
//     borderBottomWidth: 0.3,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   breedDiv: {
//     height: 50,
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   amountDiv: {
//     height: 50,
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   vaccineDiv: {
//     width: '90%',
//     height: 50,
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   vaccineStatusSelector: {
//     paddingHorizontal: 10,
//     marginHorizontal: 'auto',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   vaccineItem: {
//     width: '80%',
//     height: 50,
//     borderBottomColor: '#*e8e8e',
//     borderBottomWidth: 0.3,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   dropdownVaccineArea: {
//     width: '90%',
//     height: 100,
//     borderRadius: 10,
//     marginTop: 2,
//     backgroundColor: 'white',
//     elevation: 5,
//   },
//   genderItem: {
//     width: '80%',
//     height: 60,
//     borderBottomColor: '#*e8e8e',
//     borderBottomWidth: 0.3,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   genderDiv: {
//     width: '90%',
//     height: 50,
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   dropdownGenderArea: {
//     width: '90%',
//     height: 150,
//     borderRadius: 10,
//     marginTop: 2,
//     backgroundColor: 'white',
//     elevation: 5,
//   },
//   weightDiv: {
//     height: 50,
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   ageDiv: {
//     height: 50,
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//   },
//   descriptionDiv: {
//     height: 50,
//     width: '90%',
//     marginTop: 10,
//     borderBottomColor: 'black',
//     marginBottom: 90,
//   },
//   imagePickerDiv: {
//     width: '90%',
//     marginTop: 10,
//   },
//   imagePicker: {
//     marginTop: 10,
//     height: 160,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'black',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   donateButton: {
//     marginTop: 20,
//     height: 74,
//     width: '90%',
//     backgroundColor: '#101c1d',
//     borderRadius: 34,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   donateButtonText: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     lineHeight: 24.38,
//   },
// });






































import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useRef, useState, useEffect} from 'react';
import {dropDown} from '../../asset/dropDown.png';
import bigDropDown from '../../asset/bigDropDown.png';
import imagePickerIcon from '../../asset/imagePickerIcon.png';
import goBackIcon from '../../asset/goBack.png';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector} from '../../hooks/hooks';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {auth} from '../../config/firebase';

interface ImageData {
  path: string;
  filename: string;
}

const types = [
  {id: 1, type: 'Dog'},
  {id: 2, type: 'Cat'},
  {id: 3, type: 'Bird'},
  {id: 4, type: 'Rabbit'},
  {id: 5, type: 'Hamster'},
  {id: 6, type: 'Guinea Pig'},
  {id: 7, type: 'Fish'},
  {id: 8, type: 'Turtle'},
  {id: 9, type: 'Parrot'},
  {id: 10, type: 'Snake'},
  {id: 11, type: 'Ferret'},
  {id: 12, type: 'Horse'},
  {id: 13, type: 'Rat'},
  {id: 14, type: 'Mouse'},
  {id: 15, type: 'Lizard'},
  {id: 16, type: 'Gerbil'},
  {id: 17, type: 'Chinchilla'},
  {id: 18, type: 'Hedgehog'},
  {id: 19, type: 'Sugar Glider'},
  {id: 20, type: 'Potbellied Pig'},
];
const vaccine = [
  {id: 1, status: 'yes'},
  {id: 2, status: 'no'},
];
const genders = [
  {id: 1, gender: 'Male'},
  {id: 2, gender: 'FeMale'},
  {id: 3, gender: 'Other'},
];

const DonateData = () => {
  const navigation = useNavigation();
  const userData = useAppSelector(state => state.user.userData);

  // userData.
  // main hook
  const [data, setData] = useState({
    selectedType: '',
    breed: '',
    amount: '',
    selectedVaccineStatusType: '',
    selectedGenderStatusType: '',
    age: '',
    weight: '',
    location: '',
    description: '',
    imageUrl: '',
    userName: '',
    userImage: '',
    uid: '',
    // name: '',
    email: '',
    serialNo: '',
    // uid: '',
    // userName: '',
    // userImage:'',
    createdAt: '',
  });
  // console.log('data is', data);

  const [selectedType, setSelectedType] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [type, setType] = useState(types);
  const userNewData = useAppSelector(state => state.user.userData);

  const [isLoading, setIsloading] = useState(false);
  // Serialize the createdAt field to a Firestore Timestamp object
  // const createdAtTimestamp = firebase.firestore.Timestamp.now();
  const createdAtMillis = Date.now();

  useEffect(() => {
    if (userData) {
      // handleChange('userImage', userData.image);
      handleChange('email', userData.email);
      // handleChange('uid', userData.uid);
      // handleChange('userName', userData.userName);
      // handleChange('createdAt', firestore.FieldValue.serverTimestamp());
      handleChange('createdAt', createdAtMillis);
    }
  }, [userData]);

  const vaccineStatuses = [
    {id: 1, status: 'Yes'},
    {id: 2, status: 'No'},
  ];
  const genderStatuses = [
    {id: 1, status: 'Male'},
    {id: 2, status: 'Female'},
    {id: 3, status: 'Other'},
  ];
  // gender hooks
  const [isGenderStatusClicked, setIsGenderStatusClicked] = useState(false);
  // vaccinated hooks
  const [isVaccineStatusClicked, setIsVaccineStatusClicked] = useState(false);

  // description hooks
  const [imageUrl, setImageUrl] = useState<string>('');
  console.log('imageUrl', imageUrl);
  const searchRef:any = useRef();

  const onSearch = (txt: any) => {
    if (txt !== '') {
      let tempData = type.filter(item => {
        return item.type.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setType(tempData);
    } else {
      setType(types);
    }
  };

  const hello = auth().currentUser;
  const userId: any = auth().currentUser?.uid;

  const handleChange = (name: any, value: any) => {
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSelectImage = async () => {
    try {
      const image: any = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setIsloading(true);
      // Generate a unique file name for the image
      const filename = `${Date.now()}-${image.filename}`;

      // Create a reference to the Firebase Storage path
      const storageRef = storage().ref(`images/${filename}`);

      // Upload the selected image to Firebase Storage
      await storageRef.putFile(image.path);

      // Get the download URL of the uploaded image
      const downloadURL = await storageRef.getDownloadURL();

      // Set the download URL in the component state or wherever you need it
      setImageUrl(downloadURL);

      // Update the image URL in the data object
      handleChange('image', downloadURL);
    } catch (error) {
      console.error('Error selecting image:', error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  const generateUid = () => {
    // Generate a random 16-character string (you can use any method to generate a unique ID)
    return Math.random().toString(36).substring(2, 10);
  };

  // Function to handle donation
  const handleDonation = async (data: any, imageUrl: any) => {
    const serials = generateUid();
    try {
      console.log('Data:', data);
      console.log('Image URL:', imageUrl);

      // Create a Firestore document with the data
      // await firestore().collection('donations').add({
      //   selectedType: data.selectedType,
      //   breed: data.breed,
      //   amount: data.amount,
      //   selectedVaccineStatusType: data.selectedVaccineStatusType,
      //   selectedGenderStatusType: data.selectedGenderStatusType,
      //   age: data.age,
      //   weight: data.weight,

      //   location: data.location,
      //   description: data.description,
      //   imageUrl: imageUrl, // Save the download URL of the uploaded image

      //   email: hello?.email,
      //   userName: userNewData?.userName,
      //   userImage: userNewData?.image,
      //   uid: userId,
      //   serialNo: serials,
      //   // createdAt: firestore.FieldValue.serverTimestamp(),
      //   createdAt: createdAtMillis,
      // });

      await firestore().collection('donations').doc(serials).set({
        selectedType: data.selectedType,
        breed: data.breed,
        amount: data.amount,
        selectedVaccineStatusType: data.selectedVaccineStatusType,
        selectedGenderStatusType: data.selectedGenderStatusType,
        age: data.age,
        weight: data.weight,

        location: data.location,
        description: data.description,
        imageUrl: imageUrl, // Save the download URL of the uploaded image

        email: hello?.email,
        userName: userNewData?.userName,
        userImage: userNewData?.image,
        uid: userId,
        serialNo: serials,
        // createdAt: firestore.FieldValue.serverTimestamp(),
        createdAt: createdAtMillis,
      });

      // Optionally, you can reset the form fields after successful donation
      setData({
        selectedType: '',
        breed: '',
        amount: '',
        selectedVaccineStatusType: '',
        selectedGenderStatusType: '',
        age: '',
        weight: '',
        location: '',
        uid: '',
        description: '',
        imageUrl: '',
        email: '',
        serialNo: '',
        userName: '',
        userImage: '',

        createdAt: '',
      });
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <FlatList
  contentContainerStyle={styles.scrollViewContent}
  data={['']}
  renderItem={() => (
    <View style={styles.container}>
      {/* <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/pet-adoption-app-591f0.appspot.com/o/images%2F1711962510931-undefined?alt=media&token=095ff77d-1839-4bfc-af4a-148b0a571bc7'}}
        style = {{ width: 200, height: 200 }}
      /> */}
      <View style={styles.heading}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={goBackIcon} style={{marginLeft: 15}} />
        </TouchableOpacity>
      </View>
      {/* type div start */}
      <View style={styles.typeDiv}>
        <Text>Pet Type</Text>
        <TouchableOpacity
          style={styles.typeSelector}
          onPress={() => {
            setIsClicked(!isClicked);
          }}>
          <Text>{selectedType}</Text>
          <Image
            source={bigDropDown}
            style={{
              height: 20,
              width: 20,
              // backgroundColor: "pink",
              marginLeft: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>

      {isClicked ? (
  <ScrollView style={styles.dropdownArea}>
    <TextInput
      ref={searchRef}
      placeholder="search pet"
      style={styles.searchType}
      onChangeText={txt => {
        onSearch(txt);
      }}
    />
    <FlatList
      data={type}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={styles.typeItem}
            onPress={() => {
              setSelectedType(item.type);
              handleChange('selectedType', item.type);
              onSearch('');
              setIsClicked(false);
              searchRef.current.clear();
            }}>
            <Text>{item.type}</Text>
          </TouchableOpacity>
        );
      }}
    />
  </ScrollView>
) : null}

      {/* type div end */}

      <View style={styles.breedDiv}>
        <Text>Pet Breed</Text>
        <TextInput
          style={{height: 40}}
          // editable={false}
          value={data.breed}
          onChangeText={val => handleChange('breed', val)}
          // value={breed}
        />
      </View>
      {/* amount Div start */}
      <View style={styles.amountDiv}>
        <Text>Amount</Text>
        <TextInput
          style={{height: 40}}
          keyboardType="numeric"
          value={data.amount}
          onChangeText={val => handleChange('amount', val)}
          // value={amount}
          // editable={false}
        />
      </View>
      {/* amount Div end */}
      {/* vaccine div start */}
      <View style={styles.vaccineDiv}>
        <Text>Vaccinated</Text>
        <TouchableOpacity
          style={styles.vaccineStatusSelector}
          onPress={() => {
            setIsVaccineStatusClicked(!isVaccineStatusClicked);
          }}>
          <Text>{data.selectedVaccineStatusType}</Text>
          <Image
            source={bigDropDown}
            style={{
              height: 20,
              width: 20,
              marginLeft: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>

      {isVaccineStatusClicked ? (
        <View style={styles.dropdownVaccineArea}>
          <FlatList
            data={vaccineStatuses}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.typeItem}
                  onPress={() => {
                    handleChange('selectedVaccineStatusType', item.status); // Update selectedVaccineStatusType field
                    setIsVaccineStatusClicked(false);
                  }}>
                  <Text>{item.status}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {/* vaccine div end */}
      {/* genderr div start */}
      <View style={styles.genderDiv}>
        <Text>Gender</Text>
        <TouchableOpacity
          style={styles.vaccineStatusSelector}
          onPress={() => {
            setIsGenderStatusClicked(!isGenderStatusClicked);
          }}>
          <Text>{data.selectedGenderStatusType}</Text>
          <Image
            source={bigDropDown}
            style={{
              height: 20,
              width: 20,
              marginLeft: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>

      {isGenderStatusClicked ? (
        <View style={styles.dropdownGenderArea}>
          <FlatList
            data={genderStatuses}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.typeItem}
                  onPress={() => {
                    handleChange('selectedGenderStatusType', item.status); // Update selectedGenderStatusType field
                    setIsGenderStatusClicked(false);
                  }}>
                  <Text>{item.status}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {/* genderr div end */}
      {/* ageDiv start */}
      <View style={styles.weightDiv}>
        <Text>Age</Text>
        <TextInput
          style={{height: 40}}
          value={data.age}
          onChangeText={val => handleChange('age', val)}
        />
      </View>
      {/* ageDiv  end*/}
      {/* weightDiv start */}
      <View style={styles.ageDiv}>
        <Text>Weight</Text>
        <TextInput
          style={{height: 40}}
          keyboardType="numeric"
          value={data.weight}
          onChangeText={val => handleChange('weight', val)}
        />
      </View>
      {/* weightDiv  end*/}
      {/* LocationDiv start */}
      <View style={styles.weightDiv}>
        <Text>Location</Text>
        <TextInput
          style={{height: 40}}
          value={data.location}
          onChangeText={val => handleChange('location', val)}
        />
      </View>
      {/* LocationDiv end */}
      {/* DescriptionDiv STARt */}
      <View style={styles.descriptionDiv}>
        <Text>Description:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={{
            height: 120,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 8,
            borderRadius: 10,
          }}
          value={data.description}
          keyboardType="default"
          onChangeText={val => handleChange('description', val)}
        />
      </View>
      {/* DescriptionDiv end */}
      {/* Image picker div start */}
      <View style={styles.imagePickerDiv}>
        <Text>Image:</Text>
        <TouchableOpacity onPress={onSelectImage}>
          <View style={styles.imagePicker}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Image
                source={imagePickerIcon}
                style={{height: 40, width: 40}}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* Image picker div end */}
      {/* Donate button start */}
      <TouchableOpacity
        style={styles.donateButton}
        onPress={() => handleDonation(data, imageUrl)}>
        <Text style={styles.donateButtonText}>Donate</Text>
      </TouchableOpacity>
      {/* Donate button end */}
    </View>
  )}
/>

  );
};

export default DonateData;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    // flex: 1,
    height: '100%',
    width: '100%',
    // borderWidth: 1,
    borderColor: 'green',
    marginTop: 10,
    alignItems: 'center',
  },
  heading: {
    // height: "4%",
    width: '100%',
    marginTop: 5,
  },
  typeDiv: {
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 50,
  },

  typeSelector: {
    paddingHorizontal: 10,

    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownArea: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  searchType: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  typeItem: {
    width: '80%',
    height: 50,
    borderBottomColor: '#*e8e8e',
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  breedDiv: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  amountDiv: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  vaccineDiv: {
    width: '90%',
    height: 50,
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  vaccineStatusSelector: {
    paddingHorizontal: 10,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineItem: {
    width: '80%',
    height: 50,
    borderBottomColor: '#*e8e8e',
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownVaccineArea: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    marginTop: 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  genderItem: {
    width: '80%',
    height: 60,
    borderBottomColor: '#*e8e8e',
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  genderDiv: {
    width: '90%',
    height: 50,
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  dropdownGenderArea: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginTop: 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  weightDiv: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  ageDiv: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  descriptionDiv: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderBottomColor: 'black',
    marginBottom: 90,
  },
  imagePickerDiv: {
    width: '90%',
    marginTop: 10,
  },
  imagePicker: {
    marginTop: 10,
    height: 160,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donateButton: {
    marginTop: 20,
    height: 74,
    width: '90%',
    backgroundColor: '#101c1d',
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24.38,
  },
});
