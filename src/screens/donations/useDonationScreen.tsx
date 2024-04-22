// import {useState} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
// import {DonationScreen, LoginScreenProps} from '../../constants/types';
// import {fetchCollectionData} from '../../store/slice/donationPetsSlice';
// // import {showToast} from '../../components/toast/Toast';

// const petType = [
//   {label: 'Dog', value: 'Dog'},
//   {label: 'Cat', value: 'Cats'},
//   {label: 'Bunnies ', value: 'Bunnies '},
//   {label: 'Turtle', value: 'Turtle'},
//   {label: 'Cattle', value: 'Cattle'},
//   {label: 'Sheep', value: 'Sheep'},
//   {label: 'Goat', value: 'Goat'},
// ];
// const vaccinatedData = [
//   {label: 'Yes', value: 'Yes'},
//   {label: 'No', value: 'No'},
// ];
// const genderList = [
//   {label: 'Male', value: 'Male'},
//   {label: 'Female', value: 'Female'},
// ];

// const useDonateScreen = ({navigation}: any) => {
//   const dispatch = useAppDispatch();
//   const userData = useAppSelector(state => state.user.userData);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (name: keyof any, value: string) => {
//     setState(prevState => ({...prevState, [name]: value}));
//   };

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [state, setState] = useState<any>({
//     petType: '',
//     vaccinated: '',
//     gender: '',
//     petBreed: '',
//     amount: '',
//     weight: '',
//     location: '',
//     description: '',
//     image: '',
//     uid: '',
//     currentUserEmail: userData?.email || '',
//     userUID: userData?.uid || '',
//     userPhotoURL: userData?.photoURL || '',
//     currentUserName: userData?.userName || '',
//   });

//   const handleDonation = async () => {
//     setIsLoading(true);

//     if (
//       !state.petType ||
//       !state.vaccinated ||
//       !state.gender ||
//       !state.petBreed ||
//       !state.amount ||
//       !state.weight ||
//       !state.location ||
//       !state.description ||
//       !selectedImage
//     ) {
//     //   showToast('error', 'Error', 'Please fill in all required fields');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const uploadUri = selectedImage!;
//       const imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

//       const storageRef = storage().ref(`images/${imageName}`);
//       await storageRef.putFile(uploadUri);

//       const imageURL = await storageRef.getDownloadURL();

//       await firestore()
//         .collection('donationPets')
//         .add({
//           ...state,
//           image: imageURL,
//           createdAt: firestore.FieldValue.serverTimestamp(),
//         });

//       dispatch(fetchCollectionData());

//       setState({
//         petType: '',
//         vaccinated: '',
//         gender: '',
//         petBreed: '',
//         amount: '',
//         weight: '',
//         location: '',
//         description: '',
//         image: '',
//         uid: '',
//         currentUserEmail: userData?.email || '',
//         userUID: userData?.uid || '',
//         userPhotoURL: userData?.photoURL || '',
//         currentUserName: userData?.userName || '',
//       });

//       setSelectedImage(null);

//       navigation.navigate('Home');
//     //   showToast('success', 'Success', 'Your pet upload successful');
//     } catch (error) {
//     //   showToast('error', 'Error', 'Error in your upload pets');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImagePicker = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 300,
//         cropping: true,
//         includeBase64: false,
//       });
//       setSelectedImage(image.path);
//       setState(prevState => ({...prevState, image: image.path}));
//     } catch (error) {
//       console.log('Error selecting image:', error);
//     }
//   };

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   return {
//     selectedImage,
//     handleChange,
//     handleDonation,
//     handleImagePicker,
//     handleGoBack,
//     petType,
//     vaccinatedData,
//     genderList,
//     state,
//     isLoading,
//   };
// };

// export default useDonateScreen;