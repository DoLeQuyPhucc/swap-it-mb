import { Book } from "@/screens/Home/HomeScreen";

export type RootStackParamList = {
  Main: {
    screen: keyof BottomTabParamList;
  };
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  WelcomeScreen: undefined;
  DetailScreen: { book: Book };
};

export type BottomTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
  Notifications: undefined;
};
