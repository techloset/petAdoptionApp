import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

interface FormData {
  userName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = ({navigation}:any) => {
  const [user, setUser] = useState<any>(null); // You might want to replace 'any' with the actual type of your user object
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onAuthStateChanged = async (currentUser: any) => {
    setUser(currentUser);
    console.log('Current user:', currentUser);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  const handleSignup = async () => {
    const {userName, email, password} = formData;

    if (!userName) {
      return Alert.alert('Please enter a user name');
    }
    if (!email) {
      return Alert.alert('Please enter an email');
    }
    if (password.length < 6) {
      return Alert.alert('Please enter a password of at least 6 characters');
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User signed up successfully:', user);


      interface FormData {
        userName: string;
        email: string;
        password: string;
        uid: string; // Assuming it's a string identifier
        image: string | null;
    }
    

      const formData: FormData  = {
        userName,
        email,
        password,
        uid: user.uid,
        image: user.photoURL,
      };

      await firestore().collection('users').doc(user.uid).set(formData);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Email already in use. Please try a different email.');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Invalid email address. Please enter a valid email.');
      } else {
        console.error('Error signing up:', error);
        Alert.alert(
          'An error occurred while signing up. Please try again later.',
        );
      }
    }
  };

  const handleNavigateLogin = () => {
    // Implement navigation logic here
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.heading}>SignUp</Text>
        <View style={styles.userNameDiv}>
          <Text style={styles.texts}>UserName</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={formData.userName}
            onChangeText={value => handleChange('userName', value)}
          />
        </View>
        <View style={styles.emailDiv}>
          <Text style={styles.texts}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="email-address"
            value={formData.email}
            onChangeText={value => handleChange('email', value)}
          />
        </View>
        <View style={styles.passwordDiv}>
          <Text style={styles.texts}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handleChange('password', value)}
            secureTextEntry={true}
            placeholder=""
            value={formData.password}
          />
        </View>
        <View>
          <Text style={styles.termServies}>
            I agree
            <Text style={styles.underline}> terms and services</Text> and
            <Text style={styles.underline}> Privacy policy</Text>
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleSignup} style={styles.buttonSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleNavigateLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  main: {
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor:'transparent',
  },
  userNameDiv: {
    marginVertical: 10,
  },
  emailDiv: {
    marginVertical: 10,
  },
  passwordDiv: {
    marginVertical: 10,
  },
  texts: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 21.94,
  },
  heading: {
    marginVertical: 10,
    fontSize: 36,
    fontFamily: 'Montserrat-ExtraBold',
    lineHeight: 43,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'black',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  buttonLogin: {},
  loginText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 24.38,
  },
  buttonSignup: {
    backgroundColor: '#101C1D',
    padding: 10,
    borderRadius: 50,
    width: '70%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signupText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 24.38,
  },
  termServies: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 17.07,
  },
});

export default SignUp;
