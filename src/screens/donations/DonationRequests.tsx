import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import turtle from '../../asset/images/turtle.jpg';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../config/firebase';
import locationImage from '../../asset/searchIconDetailPage.png';
import { format } from 'date-fns';


interface Request {
  id: string;
  name: string;
  age: string;
  amount: string;
  breed: string;
  createAt: string;
  selectedType: string;
  description: string;
  email: string;
  imageURL: string;
  requesterEmail: string;
  requesterImage: string;
  selectedGenderStatusType: string;
  requesterName: string;
  selectedVaccineStatusType: string;
  serialNo: string;
  uid: string;
  weight: string;
  location: string;
  createTime:any;
  
}

const DonationRequests = () => {
  
  const [requests, setRequests] = useState<Request[]>([]);
  console.log('requests', requests);

  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('requests')
      .onSnapshot(snapshot => {
        const requestsData: Request[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (currentUser && data.email === currentUser.email) {
            const formattedCreateTime = data.createTime ? format(data.createTime.toDate(), 'MMMM dd, yyyy HH:mm:ss') : null;
            requestsData.push({
              id: doc.id,
              name: data.name,
              age:data.age,
              amount:data.amount,
              breed: data.breed,
              createAt:data.createdAt,
              selectedType: data.selectedType,
              description:data.description,
              email:data.email,
              imageURL:data.imageUrl,
              requesterEmail: data.requesterEmail,
              requesterImage:data.requesterImage,
              selectedGenderStatusType:data.selectedGenderStatusType,
              requesterName:data.requesterName,
              selectedVaccineStatusType:data.selectedVaccineStatusType,
              serialNo:data.serialNo,
              uid:data.uid,
              weight:data.weight,
              location: data.location,
              // timestamp: data.timestamp.toDate(), 
              createTime:formattedCreateTime ,
            });
          }
        });
        setRequests(requestsData);
      });
    return unsubscribe;
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Donation Requests</Text>
      </View>

    

      <FlatList
        data={requests}
        // style
        renderItem={({item}) => (
         
          <View style={styles.card}>
            <View style={styles.requestInfo}>
              <View style={styles.leftSide}>
               <Image
                  source={{uri: item.requesterImage}}
                  style={styles.profileImg}
                />
              </View>
              <View style={styles.rightSide}>
                <Text style={styles.name}>{item.requesterName}</Text>
                <Text style={styles.breed}>
                  {item.breed},{item.selectedType}
                </Text>
                <Text style={styles.email}>{item.requesterEmail}</Text>
                <Text style={styles.location}>
                  {item.location} <Image source={locationImage} />
                </Text>
                <Text style={styles.date}>{item.createTime}</Text>
              </View>
            </View>
            <View style={styles.contactBtnDiv}>
              {/* <TouchableOpacity style={styles.contactBtn}>
                <Text style={styles.contactBtnText}>Contact</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
  style={styles.contactBtn}
  onPress={() => {
    const subject = "Regarding Donation Request";
    const body = "Dear " + item.requesterName + ",\n\n";
    Linking.openURL(`mailto:${item.requesterEmail}?subject=${subject}&body=${body}`);
  }}
>
  <Text style={styles.contactBtnText}>Contact</Text>
</TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        style={styles.flatList}
      />
    </View>
  );
};

export default DonationRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 10,
    alignItems: 'center',
  },
  header: {
    height: '5%',
    backgroundColor: 'transparent',
    width: '100%',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 20,
    lineHeight:29.26,
    fontFamily:'Montserrat-Bold',
  },
  card: {
    width: '95%',
    height: 194,
    marginTop: 10,
    shadowColor: '#000',
    alignSelf: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Adjust the opacity as needed
    shadowRadius: 4, // Adjust the shadow radius as needed
    elevation: 15, // Android
    borderRadius: 20,
    backgroundColor: 'white', // Make sure to set a background color if the parent doesn't have one
  },
  requestInfo: {
    height: '65%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    flexDirection: 'row',
  },
  contactBtnDiv: {
    height: '35%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSide: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: '100%',
    width: '35%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: '100%',
    width: '65%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  contactBtn: {
    height: 56,
    width: '90%',
    backgroundColor: '#101C1D',
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19.5,
    fontFamily:'Montserrat-Bold',
  },
  name: {
    fontSize: 18,
    lineHeight: 21.94,
    marginLeft: 10,
    fontFamily:'Montserrat-Bold',
  },
  breed: {
    fontSize: 18,
    lineHeight: 21.94,
    marginLeft: 10,
    fontFamily:'Montserrat-Bold',
  },
  email: {
    fontSize: 10,
    lineHeight: 12.19,
    marginLeft: 10,
    fontFamily:'Montserrat-Medium',
  },
  location: {
    fontSize: 10,
    lineHeight: 12.19,
    fontFamily:'Montserrat-Medium',
    marginLeft: 10,
  },
  date: {
    fontSize: 10,
    lineHeight: 12.19,
    marginLeft: 10,
    fontFamily:'Montserrat-Medium',
  },

  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  flatList: {
    flex: 1,
  },
  requestItem: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});


































  {/* <View style={styles.card}>
        <View style={styles.requestInfo}>
          <View style={styles.leftSide}>
            <Image source={turtle} style={styles.profileImg} />
          </View>
          <View style={styles.rightSide}>
            <Text  style={styles.name}>Talha</Text>
            <Text  style={styles.breed}>Cavachon.dog</Text>
            <Text  style={styles.email}>info@techloset.com</Text>
            <Text  style={styles.location}>Lahore, PK.</Text>
            <Text  style={styles.date}>January 21, 2024</Text>
          </View>
        </View>
        <View style={styles.contactBtnDiv}>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View> */}