import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      console.log("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const user:any = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      // Reauthenticate user
      await user.reauthenticateWithCredential(credential);
      // Update password
      await user.updatePassword(newPassword);
      setLoading(false);
      console.log("Password updated successfully!");
      // Optionally, navigate to a success screen or show a success message
    } catch (error) {
      console.error("Error updating password:", error);
      setLoading(false);
      // Optionally, show an error message to the user
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingDiv}>
          <Text style={styles.heading}>Update Password</Text>
        </View>
        <View style={styles.currentPasswordDiv}>
          <Text style={styles.texts}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="default"
            secureTextEntry
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />
        </View>
        <View style={styles.newPasswordDiv}>
          <Text style={styles.texts}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="default"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        <View style={styles.newPasswordDiv}>
          <Text style={styles.texts}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="default"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.buttonUpdateDiv}>
          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={handleUpdatePassword}
            disabled={loading} // Disable button when loading
          >
            <Text style={styles.updatePasswordText}>
              {loading ? "Updating Password..." : "Update Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 30,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
  },
  headingDiv: {
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    marginTop: 78,
    width: 303,
  },
  heading: {
    fontSize: 24,
    lineHeight: 29.26,
  },
  currentPasswordDiv: {
    height: 62,
    width: 303,
    borderWidth: 1,
    borderColor: "transparent",
    marginTop: 50,
  },
  texts: {
    fontSize: 18,
    lineHeight: 21.94,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  newPasswordDiv: {
    height: 62,
    width: 303,
    borderWidth: 1,
    borderColor: "transparent",
    marginTop: 50,
  },
  buttonUpdateDiv: {
    display: "flex",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "transparent",
    width: "100%",
    marginTop: 160,
  },
  buttonUpdate: {
    backgroundColor: "#101C1D",
    padding: 10,
    borderRadius: 50,
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    marginVertical: 20,
  },
  updatePasswordText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    lineHeight: 24.38,
  },
});
