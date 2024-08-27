import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  StatusBar
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { height } = useWindowDimensions();
  const [isIncorrect, setIsIncorrect] = useState(false);
  const navigation = useNavigation();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move to next input if value is entered
    if (value && index < (otp.length-1)) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);

    if (otpString === '0000') {
      // Correct OTP, navigate to HomeScreen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      // Incorrect OTP
      setIsIncorrect(true);
      // Optionally, you can clear the OTP inputs
      setOtp(['', '', '', '']);
      inputRefs.current[0].focus();
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { height }]}>
      <View style={styles.form}>
        <Text style={styles.title}>OTP</Text>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.message}>We have sent a verification code to your email</Text>
        <View style={styles.inputs}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              maxLength={1}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={digit}
              keyboardType="numeric"
            />
          ))}
        </View>
        {isIncorrect && <Text style={styles.errorText}>Incorrect OTP. Please try again.</Text>}
        <TouchableOpacity style={styles.action} onPress={handleVerify}>
          <Text style={styles.actionText}>Verify me</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "plum",
    padding: 20,
  },
  form: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  message: {
    color: "#a3a3a3",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  inputs: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    width: 32,
    height: 32,
    textAlign: "center",
    borderBottomWidth: 1.5,
    borderColor: "#d2d2d2",
    marginHorizontal: 10,
    fontSize: 16,
  },
  inputIncorrect: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
  action: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#FF7B1C",
    alignItems: "center",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 18,
    fontWeight: "600",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  actionPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 1 },
  },
  actionText: {
    color: "#242424",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default OtpVerificationForm;
