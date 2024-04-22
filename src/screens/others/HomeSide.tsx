import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import {fetchData} from '../../store/slices/dataSlice';
import hamberger from '../../asset/hamberger.png';
import SearchComp from '../../components/search/SearchComp';

const HomeSide = ({navigation}: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData('donations'));
    // dispatch(getUserData(''));
  }, []);
  const userData: any = useAppSelector(state => state.user.userData);
  const allData: any = useAppSelector(state => state.data.allData);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const filterData = (text: any) => {
    const filtered = allData.filter((item: any) =>
      item.selectedType.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.hambergerDiv}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image source={hamberger} />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{
              width: 56,
              height: 56,
              borderRadius: 123,
              backgroundColor: '#C4C4C4',
            }}
            source={
              userData && userData.image
                ? {uri: userData.image}
                : require('../../asset/images/cat.jpg')
            }
          />
        </View>
      </View>
      <View style={styles.headingDiv}>
        <Text style={styles.heading}>Find an Awesome Pets for You</Text>
      </View>
      <View style={styles.searchDiv}>
        <SearchComp
          containerStyle={{
            marginTop: 10,
            marginBottom: 10,
            paddingHorizontal: 15,
            borderColor: 'transparent',
          }}
          handleSearch={filterData}
        />
      </View>
      {/* <Text>Email {userData.email} </Text>
      <Text>Name {userData.userName} </Text>
      <Text>uid {userData.uid} </Text> */}
      <View>
        <FlatList
          horizontal
          style={styles.horizontalFlatlist}
          // data={allData}
          showsHorizontalScrollIndicator={false}
          data={filteredData.length > 0 ? filteredData : allData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PetDetailss', {item});
                // console.log('Navigating to PetDetails:', item);
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginHorizontal: 2,
              }}>
              {/* <Image
                source={{uri: item.imageUrl}}
                style={styles.circularSuggestImage}
              /> */}
              <Image
                source={
                  item.imageUrl
                    ? {uri: item.imageUrl}
                    : require('../../asset/images/cat.jpg')
                }
                style={styles.circularSuggestImage}
              />

              <Text style={{fontFamily:'Montserrat-SemiBold'}}>{item.selectedType}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <Text style={styles.forYouText}>For You</Text>
      </View>
      <View style={{flex: 1, marginVertical: 5}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.verticalFlatlist}
          data={filteredData.length > 0 ? filteredData : allData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PetDetailss', {item});
                // console.log('Navigating to PetDetails:', item);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginBottom: 20,
              }}>
             <ImageBackground
                source={
                  item.imageUrl
                    ? {uri: item.imageUrl}
                    : require('../../asset/images/cat.jpg')
                }
                style={styles.imageBackground}
                resizeMode="cover">
                <View style={styles.cardText}>
                  <Text style={styles.cardTextName}>{item.selectedType}</Text>
                  <Text style={styles.cardTextCatagory}>{item.breed}</Text>
                  <Text style={styles.cardTextAge}>Age {item.age}</Text>
                  <Text style={styles.cardTextPrice}>$ {item.amount}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HomeSide;

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    borderWidth: 0,
    borderColor: 'transparent',
    flex: 1,
  },
  header: {
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: 10,
    // display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  hambergerDiv: {
    // height:50,
    // width:50,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 50,
  },
  headingDiv: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 15,
  },
  heading: {
    fontSize: 36,
    fontFamily: 'Montserrat-ExtraBold',
    lineHeight: 43.88,
  },
  searchDiv: {},
  horizontalFlatlist: {
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
    height: 110,
  },
  circularSuggestImage: {
    height: 72,
    width: 72,
    borderRadius: 50,
  },
  forYouText: {
    fontSize: 18,
    lineHeight: 21.94,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 16,
  },
  verticalFlatlist: {
    borderWidth: 0,
    borderColor: 'transparent',
  },

  imageBackground: {
    height: 180,
    width: 321,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between'
  },
  cardText: {
    borderWidth: 0,
    borderColor: 'transparent',
    width: '70%',
    marginLeft: 20,
  },
  cardTextName: {
    fontSize: 29,
    lineHeight: 35.35,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
  },
  cardTextCatagory: {
    fontSize: 29,
    lineHeight: 35.35,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
  },
  cardTextAge: {
    fontSize: 14,
    lineHeight: 17.07,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  cardTextPrice: {
    fontSize: 25,
    lineHeight: 30.48,
    color: '#101C1D',
    fontFamily: 'Montserrat-ExtraBold',
  },
});

