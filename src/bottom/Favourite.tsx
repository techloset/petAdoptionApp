// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import React, {useState,useEffect} from 'react';
// import plusIcon from '../asset/plusIcon.png';
// import turtleImg from '../asset/images/turtle.jpg';
// import UncheckedLikeBtn from '../asset/images/uncheckedUnion.png';
// import checkedLikeBtn from '../asset/images/checkedUnion.png';
// import SearchIcon from '../asset/images/searchIconSearchPage.png';
// import {useAppDispatch, useAppSelector} from '../hooks/hooks';
// import {fetchFavorites, removeFavorite} from '../store/slices/favouriteSlice'; // Import removeFavorite action
// import {auth} from '../config/firebase';

// const Favourite = () => {
//   const currentUserEmail = auth().currentUser?.email;

//   const dispatch = useAppDispatch();
//   dispatch(fetchFavorites('favorites'));
 
//   const allFavorites = useAppSelector(state => state.favourite.favorites);
  
//   // Filter favorites based on current user's email
//   const [filteredFavorites, setFilteredFavorites] = useState([]);

//   useEffect(() => {
//     if (currentUserEmail) {
//       const filtered:any = allFavorites.filter((item:any) => item.email === currentUserEmail);
//       setFilteredFavorites(filtered);
//     }
//   }, [currentUserEmail, allFavorites]);

//   // Function to remove item from favorites
//   const handleRemoveFavorite = (itemId: string) => {
//     dispatch(removeFavorite('favorites', itemId)); // Dispatch removeFavorite action with collectionName and itemId
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Favourites</Text>
//         <Image source={plusIcon} style={styles.plusIcon} />
//       </View>

//       <View
//         style={{
//           height: '95%',
//           width: '100%',
//           borderColor: 'transparent',
//           borderWidth: 1,
//         }}>
//         <ScrollView>
//           <FlatList
//             data={filteredFavorites}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}:any) => (
//               <TouchableOpacity style={styles.suggestedItem} activeOpacity={1}>
//                 <Image source={{uri: item.imageUrl}} style={styles.image} />
//                 <View style={styles.card}>
//                   <Text style={styles.name}>{item.breed}</Text>
//                   <Text style={styles.age}>Age {item.age} months </Text>
//                   <Text style={styles.location}>
//                     {item.location} <Image source={SearchIcon} />{' '}
//                   </Text>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={styles.gender}>
//                       {item.selectedGenderStatusType}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => handleRemoveFavorite(item.id)}>
//                       <Image
//                         style={{marginTop: 6, marginRight: 10}}
//                         source={checkedLikeBtn}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Favourite;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   header: {
//     height: '5%',
//     width: '100%',
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   plusIcon: {
//     height: 30,
//     width: 30,
//   },
//   image: {
//     width: 194,
//     height: 174,
//     borderRadius: 25,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     height: 126,
//     marginRight: 10,
//     elevation: 5,
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   age: {
//     fontSize: 12,
//   },
//   location: {
//     fontSize: 12,
//   },
//   gender: {
//     fontSize: 12,
//   },
//   suggestedItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     paddingLeft: 5,
//     width: '100%',
//   },
//   headerText: {
//     fontSize: 24,
//     lineHeight: 29.26,
//   },
// });










// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { auth } from '../config/firebase';
// // import { auth } from 'firebase/auth'; // Assuming you have firebase auth imported

// const FavoritesScreen = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const user = auth().currentUser; // Get currently authenticated user
//         if (user) {
//           const favoritesRef = firestore().collection('favorites').doc(user.email).collection('items');
//           const unsubscribe = favoritesRef.onSnapshot(snapshot => {
//             const favoritesData = snapshot.docs.map(doc => doc.data());
//             setFavorites(favoritesData);
//           });

//           // Unsubscribe when component unmounts
//           return () => unsubscribe();
//         } else {
//           console.log('User not authenticated.');
//         }
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.item}>
//       <Image source={{ uri: item.imageUrl }} style={styles.image} />
//       <Text style={styles.name}>{item.breed}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={favorites}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   item: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   name: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginTop: 5,
//     fontSize: 14,
//   },
// });

// export default FavoritesScreen;








// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import React, {useState,useEffect} from 'react';
// import plusIcon from '../asset/plusIcon.png';
// import turtleImg from '../asset/images/turtle.jpg';
// import UncheckedLikeBtn from '../asset/images/uncheckedUnion.png';
// import checkedLikeBtn from '../asset/images/checkedUnion.png';
// import SearchIcon from '../asset/images/searchIconSearchPage.png';
// import {useAppDispatch, useAppSelector} from '../hooks/hooks';
// import {fetchFavorites, removeFavorite} from '../store/slices/favouriteSlice'; // Import removeFavorite action
// // import {auth, firestore} from '../config/firebase';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth'

// const Favourite = () => {
//     const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const user = auth().currentUser; // Get currently authenticated user
//         if (user) {
//           const favoritesRef = firestore().collection('favorites').doc(user.email).collection('items');
//           const unsubscribe = favoritesRef.onSnapshot(snapshot => {
//             const favoritesData:any = snapshot.docs.map(doc => doc.data());
//             setFavorites(favoritesData);
//           });

//           // Unsubscribe when component unmounts
//           return () => unsubscribe();
//         } else {
//           console.log('User not authenticated.');
//         }
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     };

//     fetchFavorites();
//   }, []);

  
  



//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Favourites</Text>
//         <Image source={plusIcon} style={styles.plusIcon} />
//       </View>

//       <View
//         style={{
//           height: '95%',
//           width: '100%',
//           borderColor: 'transparent',
//           borderWidth: 1,
//         }}>
//         <ScrollView>
//           <FlatList
//             data={favorites}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}:any) => (
//               <TouchableOpacity style={styles.suggestedItem} activeOpacity={1}>
//                 <Image source={{uri: item.imageUrl}} style={styles.image} />
//                 <View style={styles.card}>
//                   <Text style={styles.name}>{item.breed}</Text>
//                   <Text style={styles.age}>Age {item.age} months </Text>
//                   <Text style={styles.location}>
//                     {item.location} <Image source={SearchIcon} />{' '}
//                   </Text>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={styles.gender}>
//                       {item.selectedGenderStatusType}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => handleRemoveFavorite(item.id)}
//                       >
//                       <Image
//                         style={{marginTop: 6, marginRight: 10}}
//                         source={checkedLikeBtn}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Favourite;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   header: {
//     height: '5%',
//     width: '100%',
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   plusIcon: {
//     height: 30,
//     width: 30,
//   },
//   image: {
//     width: 194,
//     height: 174,
//     borderRadius: 25,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     height: 126,
//     marginRight: 10,
//     elevation: 5,
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   age: {
//     fontSize: 12,
//   },
//   location: {
//     fontSize: 12,
//   },
//   gender: {
//     fontSize: 12,
//   },
//   suggestedItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     paddingLeft: 5,
//     width: '100%',
//   },
//   headerText: {
//     fontSize: 24,
//     lineHeight: 29.26,
//   },
// });


























import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import plusIcon from '../asset/plusIcon.png';
import turtleImg from '../asset/images/turtle.jpg';
import UncheckedLikeBtn from '../asset/images/uncheckedUnion.png';
import checkedLikeBtn from '../asset/images/checkedUnion.png';
import SearchIcon from '../asset/images/searchIconSearchPage.png';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchFavorites, removeFavorite } from '../store/slices/favouriteSlice'; // Import removeFavorite action
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user:any = auth().currentUser; // Get currently authenticated user
        if (user) {
          const favoritesRef = firestore().collection('favorites').doc(user.email).collection('items');
          const unsubscribe = favoritesRef.onSnapshot(snapshot => {
            const favoritesData:any = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFavorites(favoritesData);
          });

          // Unsubscribe when component unmounts
          return () => unsubscribe();
        } else {
          console.log('User not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (itemId:any) => {
    try {
      const user:any = auth().currentUser;
      if (user) {
        const favoritesRef = firestore().collection('favorites').doc(user.email).collection('items');
        await favoritesRef.doc(itemId).delete();
        console.log('Item removed from favorites successfully!');
      } else {
        console.log('User not authenticated.');
      }
    } catch (error) {
      console.error('Error removing item from favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favourites</Text>
        <Image source={plusIcon} style={styles.plusIcon} />
      </View>

      <View
        style={{
          height: '95%',
          width: '100%',
          borderColor: 'transparent',
          borderWidth: 1,
        }}>
        
          <FlatList
            data={favorites}
            keyExtractor={(item:any) => item.id}
            renderItem={({ item }:any) => (
              <TouchableOpacity style={styles.suggestedItem} activeOpacity={1}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.card}>
                  <Text style={styles.name}>{item.breed}</Text>
                  <Text style={styles.age}>Age {item.age} months </Text>
                  <Text style={styles.location}>
                    {item.location} <Image source={SearchIcon} />{' '}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.gender}>
                      {item.selectedGenderStatusType}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveFavorite(item.id)}
                    >
                      <Image
                        style={{ marginTop: 6, marginRight: 10 }}
                        source={checkedLikeBtn}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        
      </View>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  header: {
    height: '5%',
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  plusIcon: {
    height: 30,
    width: 30,
  },
  image: {
    width: 194,
    height: 174,
    borderRadius: 25,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    shadowColor: '#000',
    height: 126,
    marginRight: 10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  name: {
    // fontWeight: 'bold',
    fontSize: 18,
    fontFamily:'Montserrat-Bold',
    // lineHeight:12.19,
  },
  age: {
    fontSize: 12,
    fontFamily:'Montserrat-Medium',

  },
  location: {
    fontSize: 12,
    fontFamily:'Montserrat-Medium',
    lineHeight:12.19,
  },
  gender: {
    fontSize: 12,
    fontFamily:'Montserrat-Medium',
    lineHeight:12.19,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 5,
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    lineHeight: 29.26,
    fontFamily:'Montserrat-Bold',
  },
});











