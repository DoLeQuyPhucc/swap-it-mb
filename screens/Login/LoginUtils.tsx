import { Alert } from "react-native";

export const handleLogin = (navigation: any) => {
  try {
    navigation.navigate('Main', {
      screen: 'Home'
    })
  } catch (error) {
    Alert.alert('Error', 'Invalid username or password');
  }
}