import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image } from "react-native";

import React from 'react';
import DynamicAppStyles from '../DynamicAppStyles';
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu';
import { IMChatScreen } from '../Core/chat';
import { IMFriendsScreen, IMCreateGroupScreen } from '../Core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile';
import HomeScreen from '../screens/HomeScreen/HomeScreen';


import SearchScreen from '../screens/HomeScreen/SearchScreen';
import RoomScreen from '../screens/HomeScreen/RoomScreen';

import BlockedUsersScreen from '../screens/MyProfileScreen/BlockedUsers';


import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen';
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen';
import SignupScreen2 from '../Core/onboarding/SignupScreen/SignupScreen2';
import SignupScreen3 from '../Core/onboarding/SignupScreen/SignupScreen3';
import PatientSignupScreen from '../Core/onboarding/SignupScreen/PatientSignupScreen';

import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen';
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen';
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import DoctorHomeScreen from '../screens/DoctorHomeScreen/DoctorHomeScreen';

import { ResetPasswordScreen } from '../Core/onboarding';
import { IMUserSearchModal } from '../Core/socialgraph/friendships';
import ChatConfig from '../config';
import { NavigationContainer } from '@react-navigation/native';
import { IMLocalized } from '../Core/localization/IMLocalization';
import authManager from '../Core/onboarding/utils/authManager';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const HomeSearchStackNavigator = createStackNavigator();
const FriendsSearchStackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(240, 240, 240)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const LoginStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
          authManager: authManager,
        }}
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup2"
        component={SignupScreen2}
      />
          <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup3"
        component={SignupScreen3}
      />
       <AuthStack.Screen
        options={{ headerShown: false }}
        name="PatientSignup"
        component={PatientSignupScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{ headerTitleAlign: 'center' }}>
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name="Home"
        component={HomeScreen}
      />
      <AppStack.Screen name="roomChat" component={RoomScreen} />
      <AppStack.Screen name="CreateGroup" component={IMCreateGroupScreen} />
      <AppStack.Screen name="PersonalChat" component={IMChatScreen} />
    </AppStack.Navigator>
  );
};

const DoctorHomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{ headerTitleAlign: 'center' }}>
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name="Home"
        component={DoctorHomeScreen}
      />      
    </AppStack.Navigator>
  );
};

const HomeSearchStack = () => {
  return (
    <HomeSearchStackNavigator.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <HomeSearchStackNavigator.Screen
        name="Main"        
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <HomeSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </HomeSearchStackNavigator.Navigator>
  );
};

const FriendsStack = () => {
  return (
    <AppStack.Navigator initialRouteName="Friends" headerMode="float">
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          showDrawerMenuButton: true,
        }}
        name="Friends"
        component={IMFriendsScreen}
      />
    </AppStack.Navigator>
  );
};

const FriendsSearchStack = () => {
  return (
    <FriendsSearchStackNavigator.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <FriendsSearchStackNavigator.Screen
        name="Main"
        component={FriendsStack}
        options={{ headerShown: false }}
      />
      <FriendsSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </FriendsSearchStackNavigator.Navigator>
  );
};

const SearchStack = () => {
  return (
    <AppStack.Navigator initialRouteName="Search" headerMode="float">
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          showDrawerMenuButton: true,
        }}
        name="Search"
        component={SearchScreen}
      />
    </AppStack.Navigator>
  );
};

const MyProfileStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
        }}
        name="My Profile"
        component={MyProfileScreen}
      />
      <AuthStack.Screen name="AccountDetails" component={IMEditProfileScreen} />
      <AuthStack.Screen name="Settings" component={IMUserSettingsScreen} />
      <AuthStack.Screen name="ContactUs" component={IMContactUsScreen} />
      <AuthStack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
    </AuthStack.Navigator>
  );
};

// drawer stack
const BottomTabNavigator = () => {
  return (
   <NavigationContainer independent={true}>
        <Tab.Navigator
        NavigationContainer = 
        {({ navigation, state }) => {
                return (
                  <IMDrawerMenu
                    navigation={navigation}
                    menuItems={ChatConfig.drawerMenu.upperMenu}
                    menuItemsSettings={ChatConfig.drawerMenu.lowerMenu}
                    appStyles={DynamicAppStyles}
                    authManager={authManager}
                    appConfig={ChatConfig}
                  />
                );
              }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'File') {
              iconName = focused
                ? require("../../assets/icons/mail.png")
                : require("../../assets/icons/mail.png");
            } else if (route.name === 'Profile') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }else if (route.name === 'Appointments') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }else if (route.name === 'Patients') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          // tabBarIcon: ({ tintColor }) => (
            
          //   <Image
          //     source={require("../../assets/icons/mail.png")}
          //     style={{ width: 26, height: 26, tintColor: tintColor }}
          //   />
          // ),
        }
        )}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',        

        }}
      
      >
        <Tab.Screen name="File" component={HomeScreen} />
        <Tab.Screen  name="Profile" component={MyProfileStack} />

        <Tab.Screen  name="Appointments" component={HomeScreen} />
        <Tab.Screen  name="Patients" component={HomeScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );


};

const BottomTabPatientNavigator = () => {
  return (
   <NavigationContainer independent={true}>
        <Tab.Navigator
        NavigationContainer = 
        {({ navigation, state }) => {
                return (
                  <IMDrawerMenu
                    navigation={navigation}
                    menuItems={ChatConfig.drawerMenu.upperMenu}
                    menuItemsSettings={ChatConfig.drawerMenu.lowerMenu}
                    appStyles={DynamicAppStyles}
                    authManager={authManager}
                    appConfig={ChatConfig}
                  />
                );
              }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused
                ? require("../../assets/icons/mail.png")
                : require("../../assets/icons/mail.png");
            } else if (route.name === 'Profile') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }else if (route.name === 'Appointments') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }else if (route.name === 'Patients') {
              iconName = focused ? require("../../assets/icons/mail.png") : require("../../assets/icons/mail.png");
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // tabBarIcon: ({ tintColor }) => (
          //   <Image
          //     source={require("../../assets/icons/mail.png")}
          //     style={{ width: 26, height: 26, tintColor: tintColor }}
          //   />
          // ),
        }
        )}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',        

        }}
      
      >
        <Tab.Screen  name="Search" component={HomeSearchStack}  />
        <Tab.Screen name="Profile" component={DoctorHomeStack} />

        <Tab.Screen  name="Appointments" component={DoctorHomeStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );


};

const MainStackNavigator = () => {
  return ( 
    <Stack.Navigator initialRouteName="Home" headerMode="float">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name={IMLocalized('Home')}
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

const PatientMainStackNavigator = () => {
  return ( 
    <Stack.Navigator initialRouteName="Home" headerMode="float">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name={IMLocalized('Home')}
        options={{ headerShown: false }}
        component={BottomTabPatientNavigator}
      />
    </Stack.Navigator>
  );
};

// Manifest of possible screens
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false, headerBackTitleVisible: false }}
      initialRouteName="LoadScreen">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
        }}
        name="LoadScreen"
        options={{ headerShown: false }}
        component={LoadScreen}
      />
      <RootStack.Screen
        name="Walkthrough"
        options={{ headerShown: false }}
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      <RootStack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStackNavigator}
      />
      <RootStack.Screen
        name="PatMainStack"
        options={{ headerShown: false }}
        component={PatientMainStackNavigator}
      />
      <RootStack.Screen name="PersonalChat" component={IMChatScreen} />
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export { RootNavigator, AppNavigator };
