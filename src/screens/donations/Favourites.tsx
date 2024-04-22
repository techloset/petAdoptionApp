import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import plusIcon from "../../asset/plusIcon.png";
import turtleImg from "../../asset/images/turtle.jpg";
import UncheckedLikeBtn from "../../asset/images/uncheckedUnion.png";
import SearchIcon from "../../asset/images/searchIconSearchPage.png";
const Favourites = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favourites</Text>
        <Image source={plusIcon} style={styles.plusIcon} />
      </View>
      {/* <View style={styles.card}>
        <View style={styles.imgDiv}>
          <Image source={turtleImg} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Cavachon</Text>
          <Text style={styles.age}>Age 4 months</Text>
          <Text style={styles.location}>Fsd</Text>
          <Text style={styles.gender}>Male</Text>
        </View>
      </View> */}
      <TouchableOpacity
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
              source={UncheckedLikeBtn}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    // bordre
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
  // card: {
  //   marginTop: 20,
  //   height: 181,
  //   width: 341,
  //   backgroundColor: "transparent",
  //   flexDirection: "row",
  //   borderWidth: 1,
  //   borderColor: "red",
  //   // justifyContent:'center',
  //   alignItems: "center",
  // },
  // imgDiv: {
  //   width: "55%",
  //   borderWidth: 1,
  //   borderColor: "green",
  // },
  // image: {
  //   height: "100%",
  //   width: "100%",
  //   borderRadius: 25,
  // },
  // info: {
  //   borderTopWidth: 1,
  //   borderRightWidth: 1,
  //   borderBottomWidth: 1,
  //   borderColor: "green",
  //   width: "45%",
  //   justifyContent: "center",
  //   alignItems:'flex-start',
  //   height: "80%",
  //   borderRadius: 20,
  //   alignSelf:'baseline'
  //   // elevation:2,
  // },
  // name: {
  //   fontSize: 18,
  //   lineHeight: 21.94,
  // },
  // age: {
  //   fontSize: 10,
  //   lineHeight: 12.19,
  // },

  // location: {
  //   fontSize: 10,
  //   lineHeight: 12.19,
  // },
  // gender: {
  //   fontSize: 10,
  //   lineHeight: 12.19,
  // },

  image: {
    width: 194,
    height: 174,
    borderRadius: 25,
    // marginRight: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 10, // Keep only right border radius
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
    fontWeight: "bold",
    fontSize: 18,
  },
  fot: {
    fontSize: 12,
  },
  suggestedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 5,
  },
  headerText: {
    fontSize:24,
    lineHeight:29.26,
  },
});
