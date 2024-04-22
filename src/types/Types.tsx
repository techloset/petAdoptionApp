import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackparams} from '../navigation/StackNavigation';

export interface UserData {
  uid: string;
  image: string;
  userName: string;
  email: string;
  password: string;
  // Add other properties as needed
}

export interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackparams, 'SignUp'>;
}
