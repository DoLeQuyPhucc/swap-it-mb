import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomTab, { TabBarProps } from './BottomBar';
import fonts from '@/config/fonts';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './types/navigationTypes';
import WelcomeScreen from '@/screens/Welcome/WelcomeScreen';
import LoginScreen from '@/screens/Login/LoginScreen';
import RegisterScreen from '@/screens/Register/RegisterScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import NotificationScreen from '@/screens/Notification/NotificationScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import DetailScreen from '@/screens/Detail/DetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const tabBarProps: TabBarProps[] = [
  {
    route: 'Home',
    component: HomeScreen,
    tabBarLabel: 'Home',
    tabBarIconProps: {
      iconType: Ionicons,
      iconName: 'home',
    },
  },
  {
    route: 'Notifications',
    component: NotificationScreen,
    tabBarLabel: 'Notifitcations',
    tabBarIconProps: {
      iconType: Ionicons,
      iconName: 'notifications',
    },
  },
  {
    route: 'Profile',
    component: ProfileScreen,
    tabBarLabel: 'Profile',
    tabBarIconProps: {
      iconType: Ionicons,
      iconName: 'person',
    },
  },
];

export default function Navigation() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(fonts);
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  useEffect(() => {
    const checkInitialRoute = async () => {
      setInitialRoute('WelcomeScreen');
      setAppIsReady(true);
    };
  
    checkInitialRoute();
  }, []);
  

  if (!appIsReady || !fontsLoaded || !initialRoute) {
    return null;
  }

  return (
    <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => <CustomBottomTab tabs={tabBarProps} />}
          </Stack.Screen>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false, headerBackTitleVisible: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
