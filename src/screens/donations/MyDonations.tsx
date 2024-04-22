// Import the necessary dependencies
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import plusIcon from "../../asset/plusIcon.png";
import turtleImg from "../../asset/images/turtle.jpg";
import deleteIconBasket from "../../asset/deleteIconBasket.png";
import SearchIcon from "../../asset/images/searchIconSearchPage.png";
import { auth } from "../../config/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData, removeData } from "../../store/slices/dataSlice";

const MyDonations = () => {
  const currentUserEmail = auth().currentUser?.email;
  const dispatch = useAppDispatch();
  const allData = useAppSelector(state => state.data.allData);

  // State to store filtered favorites
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    // Dispatch fetchData action when the component mounts
    dispatch(fetchData('donations'));
  }, []); // Empty dependency array ensures it only runs once when component mounts

  useEffect(() => {
    // Dispatch fetchData action again whenever allData changes
    if (allData.length === 0) return; // Skip if allData is empty (initial state)
    dispatch(fetchData('donations'));
    console.log('data on my donations page', allData);
  }, [allData]); // Run whenever allData changes

  // Filter favorites based on current user's email
  useEffect(() => {
    if (currentUserEmail) {
      const filtered:any = allData.filter((item:any) => item.email === currentUserEmail);
      setFilteredFavorites(filtered);
    }
  }, [currentUserEmail, allData]);

  // Function to handle the removal of an item
  const handleRemoveItem = (serialNo: string) => {
    dispatch(removeData('donations', serialNo)); // Dispatch removeData action with collectionName and itemId
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Donations</Text>
        <Image source={plusIcon} style={styles.plusIcon} />
      </View>
      {/* Add your UI components here */}
      <View style={{ height: '95%', width: '100%', borderColor: 'transparent', borderWidth: 1 }}>
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item, index) => index.toString()}
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
                  <TouchableOpacity onPress={() => handleRemoveItem(item.serialNo)}>
                    <Image
                      style={{ marginTop: 6, marginRight: 10 }}
                      source={deleteIconBasket}
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

export default MyDonations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  header: {
    height: "5%",
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    shadowColor: "#000",
    height: 126,
    marginRight: 10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  name: {
    fontFamily:'Montserrat-Bold',
    fontSize: 18,
    lineHeight:21.94,
  },
  age: {
    fontSize: 12,
    lineHeight:12.19,
    fontFamily:'Montserrat-Medium',
  },
  location: {
    fontSize: 12,
    lineHeight:12.19,
    fontFamily:'Montserrat-Medium',
  },
  gender: {
    fontSize: 12,
    lineHeight:12.19,
    fontFamily:'Montserrat-Medium',
  },
  suggestedItem: {
    flexDirection: "row",
    alignItems: "center",
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


















{/* <TouchableOpacity
        // onPress={() => handleSuggestedItemPress(item)}
        style={styles.suggestedItem}
        activeOpacity={1}
      >
        <Image source={turtleImg} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.name}>Cavachon</Text>
          <Text style={styles.fot}>Age 4 months </Text>

          <Text style={styles.fot}>
            Fsd <Image source={SearchIcon} />{" "}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Male</Text>
            <Image
              style={{ marginTop: 6, marginRight: 10 }}
              source={deleteIconBasket}
            />
          </View>
        </View>
      </TouchableOpacity> */}
