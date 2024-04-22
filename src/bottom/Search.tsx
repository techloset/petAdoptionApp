import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import SearchComp from '../components/search/SearchComp';
import SearchIcon from '../../src/asset/images/searchIconSearchPage.png';
import UncheckedLikeBtn from '../asset/images/uncheckedUnion.png';
import CheckedLikeBtn from '../asset/images/checkedUnion.png';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchData } from '../store/slices/dataSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation:any = useNavigation();
  const [selectedType, setSelectedType] = useState('All'); // State to track selected type
  const [favorites, setFavorites] = useState([]); // State to store favorites
  const [selectedData, setSelectedData] = useState([]);

  // Fetch favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const user:any = auth().currentUser;
      if (user) {
        const favoritesRef = firestore()
          .collection('favorites')
          .doc(user.email)
          .collection('items');
        const unsubscribe= favoritesRef.onSnapshot(snapshot => {
          const favoritesData:any = snapshot.docs.map(doc => doc.data());
          setFavorites(favoritesData);
        });
        return unsubscribe;
      }
    };
    const unsubscribe:any = fetchFavorites();
    return () => unsubscribe();
  }, []);

  const dispatch = useAppDispatch();
  dispatch(fetchData('donations'));
  const allData = useAppSelector(state => state.data.allData);

  const handleItemPress = (item:any) => {
    setSelectedType(item.selectedType); // Update selected type
  };

  // Check if item is in favorites
  const isFavorite = (item:any) => {
    return favorites.some((fav:any) => fav.serialNo === item.serialNo);
  };

  // Function to toggle the favorite status locally
  const toggleFavoriteLocally = (item:any) => {
    const updatedData:any = selectedData.map((dataItem:any) => {
      if (dataItem.serialNo === item.serialNo) {
        return {
          ...dataItem,
          isFavorite: !isFavorite(dataItem), // Toggle the favorite status
        };
      }
      return dataItem;
    });
    setSelectedData(updatedData);
  };

  // Modify the addToFavorites function to handle favorite status updates locally
  const addToFavorites = async (item:any) => {
    try {
      const user:any = auth().currentUser; // Get currently authenticated user
      if (user) {
        const favoritesRef = firestore()
          .collection('favorites')
          .doc(user.email)
          .collection('items');
        const itemRef = favoritesRef.doc(item.serialNo);
        const itemDoc = await itemRef.get();

        if (itemDoc.exists) {
          // Item already exists in favorites, so remove it
          await itemRef.delete();
          console.log('Item removed from favorites successfully!');
        } else {
          // Item does not exist in favorites, so add it
          await itemRef.set({ ...item });
          console.log('Item added to favorites successfully!');
        }

        // Update favorite status locally
        toggleFavoriteLocally(item);
      } else {
        console.log('User not authenticated.');
      }
    } catch (error) {
      console.error('Error adding/removing item to/from favorites:', error);
    }
  };

  // Filter data based on selected type
  const filteredData =
    selectedType === 'All'
      ? allData
      : allData.filter((item:any) => item.selectedType === selectedType);

  const filterData = (text:any) => {
    const filtered:any = filteredData.filter((item:any) =>
      item.breed.toLowerCase().includes(text.toLowerCase()),
    );
    setSelectedData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: '10%', borderColor: 'transparent', borderWidth: 1 }}>
        <SearchComp
          containerStyle={{
            marginTop: 10,
            marginBottom: 20,
            borderColor: 'transparent',
          }}
          handleSearch={filterData}
        />
      </View>
      <View style={{ height: '5%', borderColor: 'transparent', borderWidth: 1, flexDirection: 'row' }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ createdAt: 'All', selectedType: 'All' }, ...allData]}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }:any) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={[
                styles.item,
                selectedType === item.selectedType && { backgroundColor: '#F6A530' },
              ]}>
              <Text style={[
                styles.itemText,
                selectedType === item.selectedType && { color: '#FFFFFF' },
                { flexWrap: 'nowrap' },
              ]}>
                {item.selectedType}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item:any) => item.createdAt.toString()}
        />
      </View>

      <View style={{ height: '85%' }}>
        <FlatList
          data={selectedData.length > 0 ? selectedData : filteredData}
          renderItem={({ item }:any) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PetDetailss', { item });
                // console.log('Navigating to PetDetails:', item);
              }}
              style={styles.suggestedItem}
              activeOpacity={1}>
              <Image
                source={item.imageUrl ? { uri: item.imageUrl } : require('../asset/images/dog2.jpg')}
                style={styles.image}
              />
              <View style={styles.card}>
                <Text style={styles.name}>{item.breed}</Text>
                <Text style={styles.font}>Age: {item.age} </Text>
                <Text style={styles.font}>
                  {item.location} {'  '}
                  <Image source={SearchIcon} />
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>{item.selectedGenderStatusType}</Text>
                  <TouchableOpacity onPress={() => addToFavorites(item)}>
                    <Image
                      source={isFavorite(item) ? CheckedLikeBtn : UncheckedLikeBtn}
                      style={{ marginTop: 6, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item:any) => item.createdAt.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  item: {
    marginHorizontal: 9,
    height: 31,
    width: 63,
    borderRadius: 20,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: 'black',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontSize:14,
    fontFamily:'Montserrat-Bold',
    lineHeight:17.07,
  },
  flatListContent: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 5,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontFamily:'Montserrat-Bold',
    fontSize: 18,
  },
  font: {
    fontSize: 12,
    fontFamily:'Montserrat-Medium',
  },
});

export default Search;
