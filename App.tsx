import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import StackNavigation from './src/navigation/StackNavigation';
import PetDetails from './src/screens/details/AdoptedPetDetails';
import DonationRequests from './src/screens/donations/DonationRequests';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </Provider> 
      {/* <PetDetails/>
      {/* <DonationRequests /> */}
    </>
  );
};

export default App;


