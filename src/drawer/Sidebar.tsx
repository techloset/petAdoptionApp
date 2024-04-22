import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Search from '../components/search/SearchComp';
import closeDrawer from '../asset/closeDrawer.png';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const SideBar = ({props, navigation}: any) => {
  // const navigation = useNavigation();

  // const handleNavigation = (screenName: any) => {
  //   navigation.navigate(screenName);
  // };
  const handleNavigation = (screenName: any) => {
    if (screenName === 'Profile') {
      // Navigate to the BottomProfile screen when the Profile option is selected
      navigation.navigate('Profile', {screen: 'BottomProfile'});
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout=()=>{
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  // navigation.navigate(screenName);

}
  return (
    <>
      <View style={styles.container}>
        {/* <TouchableOpacity><Search  /></TouchableOpacity> */}
        <TouchableOpacity
          style={{marginLeft: 34, marginTop: 30}}
          onPress={() => {
            navigation.closeDrawer();
          }}>
          <Image source={closeDrawer} />
        </TouchableOpacity>
        <View>
          <Search containerStyle={{borderColor: 'transparent'}} />
        </View>
        <View>
          <TouchableOpacity style={styles.option} onPress={() => handleNavigation('HomeSide')}>
            <Text>Home</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}>
            <Text>My Adoptions</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.option}   onPress={() => handleNavigation('BottomFavourite')}>
            <Text>Donations</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation('MyDonations')}>
            <Text>Donations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation('DonateData')}>
            <Text>Add Pet</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}  onPress={() => handleNavigation('BottomFavourite')}>
            <Text>Favourite</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation("Favourites")}
          >
            <Text>Favourite</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation("BottomFavourite")}
          >
            <Text>Favourite</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation('DonationRequests')}>
            <Text>Message</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => handleNavigation("BottomProfile")}
          >
            <Text>Profile</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.logoutDiv}>
          <TouchableOpacity style={styles.logoutBtn}  onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
  },
  option: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 21.94,
    marginLeft: 35,
  },
  logoutBtn: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 21.94,
    marginLeft: 35,
    marginTop: 'auto',
  },
  logoutDiv: {
    marginTop: 'auto',
    // color:'#FB5D48',
  },
  logoutBtnText: {
    color: '#FB5D48',
  },
});
