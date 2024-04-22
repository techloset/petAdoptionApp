// import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
// import React from "react";
// import favouriteIcon from "../../asset/favouritePetDetails.png";
// import goBackPetDetails from "../../asset/goBackPetDetails.png";
// import backgroundImg from "../../asset/images/dog1.jpg";

// const PetDetails = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//         <Image source={goBackPetDetails} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//         <Image source={favouriteIcon} />
//         </TouchableOpacity>
//       </View>
//       <View  style={styles.bgImageDiv}>
//       <Image source={backgroundImg} style={{height:'100%',width:'100%'}} resizeMode="cover" />
//       </View>
//       <View  style={styles.detailDiv}>

//       </View>
//     </View>
//   );
// };

// export default PetDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "cyan",
//     marginTop: 30,
//   },
//   header: {
//     height: "5%",
//     width: "100%",
//     backgroundColor: "grey",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//   },
//   bgImageDiv:{
//    height:'55%',
//    borderWidth:1,
//    width:'100%',
// },
// detailDiv:{
//     height:'40%',
//     marginBottom:100,
//     backgroundColor:'yellow',
//     borderTopRightRadius:30,
//     borderTopLeftRadius:30,
//     // position:'absolute',

//   }
// });

import React from "react";
import favouriteIcon from "../../asset/favouritePetDetails.png";
import goBackPetDetails from "../../asset/goBackPetDetails.png";
import backgroundImg from "../../asset/images/dog1.jpg";
import searchIcon from "../../asset/searchIconDetailPage.png";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import topRectangle from "../../asset/top-info-rectangle.png";
// import { ScrollView } from "react-native-gesture-handler";
const PetDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={goBackPetDetails} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={favouriteIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bgImageDiv}>
        <Image
          source={backgroundImg}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailDiv}>
        <View style={styles.topRectangleDiv}>
          <Image source={topRectangle} style={styles.topRectangle} />
        </View>
        <View style={styles.topInfoDiv}>
          <View style={styles.breedANDTypeDiv}>
            <View>
              <Text style={styles.breed}>Cavachon</Text>
            </View>
            <View>
              <Text style={styles.type}>Dog</Text>
            </View>
          </View>
          <View>
            <Text style={styles.price}>$250</Text>
          </View>
        </View>
        <View style={styles.secondInfoDiv}>
          <View style={styles.ageDiv}>
            <Text style={styles.ageHeading}>Age</Text>
            <Text style={styles.age}>4</Text>
          </View>
          <View style={styles.genderDiv}>
            <Text style={styles.genderHeading}>Gender</Text>
            <Text style={styles.gender}>Male</Text>
          </View>
          <View style={styles.weightDiv}>
            <Text style={styles.weightHeading}>Weight</Text>
            <Text style={styles.weight}>2.1</Text>
          </View>
          <View style={styles.vaccineDiv}>
            <Text style={styles.vaccineHeading}>Vaccine</Text>
            <Text style={styles.vaccine}>Yes</Text>
          </View>
        </View>
        <View style={styles.ownerInfoDiv}>
          <View style={styles.leftDiv}>
            <View style={styles.ownerImgDiv}>
              <Image
                source={backgroundImg}
                style={styles.ownerImg}
                resizeMode="cover"
              />
            </View>
            <View style={styles.ownerNameRoleDiv}>
              <View>
                <Text style={styles.ownerName}>Shin Ryujin</Text>
              </View>
              <View>
                <Text style={styles.ownerRole}>Owner</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightDiv}>
            <Text
            // style={styles.ownerLocation}
            >
              Fsd{" "}
              <Image
                source={searchIcon}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
            </Text>
          </View>
        </View>
        <View style={styles.descriptionDiv}>
          <ScrollView>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sed
              totam officia possimus reiciendis temporibus atque magni pariatur
              quo, blanditiis nostrum incidunt cumque ipsa fugit provident
              dicta. Quam magnam consequuntur assumenda magni rerum et
              accusantium, vero alias praesentium voluptatibus minima nesciunt
              distinctio recusandae voluptas maiores debitis id. Optio, placeat
              adipisci? Debitis beatae quibusdam magni sit perferendis voluptas
              accusamus laudantium labore quos nemo maxime recusandae iure,
              deleniti ipsam obcaecati molestiae natus doloribus architecto eum
              est iste quaerat alias dicta? Molestiae aperiam tempore excepturi,
              dolorum nisi dolorem quisquam tenetur, neque velit ipsa fuga?
              Inventore iusto aliquid ab cum, sint ullam perspiciatis labore.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.lastButtonDiv}>
          <TouchableOpacity style={styles.lastButton}>
            {/* <Text style={styles.lastButtonText>Adopt Now</Text> */}
            <Text style={styles.lastButtonText}>Adopt Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // left div contsnt
    // <View style={styles.ownerImgDiv}>
    //           <Image source={backgroundImg} />
    //         </View>
    //         <View style={styles.ownerNameDiv}>
    //           <Text>Shin Ryujin</Text>
    //         </View>
    //         <View style={styles.ownerRoleDiv}>
    //           <Text>Owner</Text>
    //         </View>
    // right div content
    // <View style={styles.ownerlocationDiv}><Text>FSd</Text></View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
    marginTop: 30,
  },
  header: {
    height: "5%",
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bgImageDiv: {
    height: "40%", // Increased the height to accommodate the detailDiv
    borderWidth: 1,
    width: "100%",
  },
  detailDiv: {
    height: "60%", // Decreased the height to make it climb up
    marginBottom: 100,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: "-10%", // Adding some negative margin to the top
    paddingTop: 10, // Adding some padding to the top of the content
  },
  topRectangleDiv: {
    height: "2%",
    // width:50,
    width: "100%",
    alignItems: "center",
  },
  topRectangle: {
    height: 5,
    width: 54,
    // width:50,
  },
  topInfoDiv: {
    width: "100%",
    height: "15%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  breedANDTypeDiv: {},
  breed: {
    fontSize: 24,
    lineHeight: 29.26,
  },
  type: {
    fontSize: 14,
    lineHeight: 17.07,
  },
  price: {
    fontSize: 24,
    lineHeight: 29.26,
  },
  secondInfoDiv: {
    backgroundColor: "transparent",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  ageDiv: {
    backgroundColor: "#fef6ea",
    width: 75,
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  age: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  ageHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: "rgba(246, 165, 48, 1)",
  },

  genderDiv: {
    backgroundColor: "#fef6ea",
    width: 75,
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  gender: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  genderHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: "rgba(246, 165, 48, 1)",
  },
  weightDiv: {
    backgroundColor: "#fef6ea",
    width: 75,
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  weight: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  weightHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: "rgba(246, 165, 48, 1)",
  },
  vaccineDiv: {
    backgroundColor: "#fef6ea",
    width: 75,
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  vaccine: {
    fontSize: 16,
    lineHeight: 19.5,
  },
  vaccineHeading: {
    fontSize: 11,
    lineHeight: 13.41,
    color: "rgba(246, 165, 48, 1)",
  },
  ownerInfoDiv: {
    // backgroundColor: "blue",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftDiv: {
    backgroundColor: "transparent",
    height: "100%",
    // borderWidth: 1,
    // borderColor: "black",
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  ownerImgDiv: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    overflow: "hidden",
    marginLeft: 10,
  },
  ownerImg: {
    height: "100%",
    width: "100%",
  },
  ownerNameRoleDiv: {
    marginLeft: 10,
    // borderWidth:2,
  },
  ownerName: {},
  ownerRole: {},
  rightDiv: {
    backgroundColor: "transparent",
    height: "100%",
    // borderWidth: 1,
    // borderColor: "black",
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 40,
  },
  // ownerLocation: {
  //   height: "40%",
  //   width: "80%",
  //   borderWidth: 2,
  //   borderColor: "green",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginLeft: "auto",
  // },
  descriptionDiv: {
    height: "20%",
    width: "100%",
    backgroundColor: "transparent",
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 15.85,
  },
  lastButtonDiv: {
    height: "23%",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lastButton: {
    height: 74,
    width: "90%",
    backgroundColor: "rgba(16, 28, 29, 1)",
    borderRadius: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lastButtonText: {
    color: "white",
    fontSize: 20,
    lineHeight: 24.38,
  },
});
