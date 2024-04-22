import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeSide from '../screens/others/HomeSide';
import SignUp from '../screens/auth/signup/SignUp';
import Login from '../screens/auth/login/Login';
import RecoverPass from '../screens/auth/recoverPass/RecoverPass';
import Home from '../bottom/Home';
import Search from '../bottom/Search';
import Favourite from '../bottom/Favourite';
import Profile from '../bottom/Profile';
import MyDonations from '../screens/donations/MyDonations';
import Adopt from '../screens/others/Adopt';
import Donate from '../screens/others/Donate';
import DonationRequests from '../screens/donations/DonationRequests';
import DonateData from '../screens/donations/DonateData';
import Message from '../screens/others/Message';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {UserData} from '../types/Types';
import {auth} from '../config/firebase';
import {fetchUserDataSuccess} from '../store/slices/userSlice';
import BottomNavigator from '../bottom/BottomNavigator';
import UpdatePassword from '../screens/auth/UpdatePassword';
import PetDetails from '../screens/details/AdoptedPetDetails';

export type RootStackparams = {
  Login: undefined;
  SignUp: undefined;
  RecoverPass: undefined;
  Home: undefined;
  Search: undefined;
  Favorite: undefined;
  Profile: undefined;
  // UpdataPassword: undefined;
  MyDonations: undefined;
  Adopt: undefined;
  Donate: undefined;
  DonationRequests: undefined;
  DonateData: undefined;
  Message: undefined;
  DrawerNavigation: undefined;
};

const StackNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const userData = useAppSelector(state => state.user.userData);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        const userData: UserData = {
          userName: user.displayName || '',
          email: user.email || '',
          password: '',
          uid: user.uid,
          image: user.photoURL || '',
        };
        dispatch(fetchUserDataSuccess(userData));
      } else {
        dispatch(fetchUserDataSuccess(null));
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [dispatch, initializing]);

  if (initializing) {
    return null;
  }

  if (userData) {
    return (
      // <Stack.Navigator initialRouteName="Home">
      //   <Stack.Screen
      //     name="Home"
      //     component={Home}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Search"
      //     component={Search}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Favourite"
      //     component={Favourite}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Profile"
      //     component={Profile}
      //     options={{headerShown: false}}
      //   />

      //   <Stack.Screen
      //     name="HomeSide"
      //     component={HomeSide}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="MyDonations"
      //     component={MyDonations}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Adopt"
      //     component={Adopt}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Donate"
      //     component={Donate}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="DonateData"
      //     component={DonateData}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="DonationRequests"
      //     component={DonationRequests}
      //     options={{headerShown: false}}
      //   />
      //   <Stack.Screen
      //     name="Message"
      //     component={Message}
      //     options={{headerShown: false}}
      //   />
      // </Stack.Navigator>
      <BottomNavigator />
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecoverPass"
          component={RecoverPass}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="PetDetailss"
          component={PetDetails}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    );
  }
};

export default StackNavigation;
