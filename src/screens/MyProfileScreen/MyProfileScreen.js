import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import AppStyles from '../../DynamicAppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { logout, setUserData } from '../../Core/onboarding/redux/auth';
import ChatConfig from '../../config';
import { TNTouchableIcon } from '../../Core/truly-native';
import { IMUserProfileComponent } from '../../Core/profile';
import authManager from '../../Core/onboarding/utils/authManager';
import { useColorScheme } from 'react-native-appearance';
import { StackActions } from '@react-navigation/native';

const MyProfileScreen = (props) => {
  const { navigation } = props;
  let colorScheme = useColorScheme();


  const onAccountDetailsPress = () => {
    navigation.navigate('AccountDetails', {
      appStyles: AppStyles,
      form: ChatConfig.editProfileFields,
      screenTitle: IMLocalized('Edit Profile'),
    });
  };

  const onSettingsPress = () => {
    navigation.navigate('Settings', {
      appStyles: AppStyles,
      form: ChatConfig.userSettingsFields,
      screenTitle: IMLocalized('Settings'),
    });
  };

  const onContactUsPress = () => {
    navigation.navigate('ContactUs', {
      appStyles: AppStyles,
      screenTitle: IMLocalized('Contact Us'),
      form: ChatConfig.contactUsFields,
      phone: ChatConfig.contactUsPhoneNumber,
    });
  };

  const onBlockedUsersPress = () => {
    navigation.navigate('BlockedUsers', {
      appStyles: AppStyles,
      screenTitle: IMLocalized('Blocked Users')
    });
  };

  const onUpdateUser = (newUser) => {
    props.setUserData({ user: newUser });
  };

  const onLogout = () => {
    authManager.logout(props.user);
    props.logout();
  
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoadScreen',
          params: { appStyles: AppStyles, appConfig: ChatConfig },
        },
      ],
    });


  };

  const menuItems = [
    {
      title: IMLocalized('Account Details'),
      icon: require('../../CoreAssets/account-details-icon.png'),
      tintColor: '#6b7be8',
      onPress: onAccountDetailsPress,
    },
    {
      title: IMLocalized('Settings'),
      icon: require('../../CoreAssets/settings-icon.png'),
      tintColor: '#777777',
      onPress: onSettingsPress,
    },
    {
      title: IMLocalized('Contact Us'),
      icon: require('../../CoreAssets/contact-us-icon.png'),
      tintColor: '#9ee19f',
      onPress: onContactUsPress,
    },
    {
      title: IMLocalized('Blocked Users'),
      icon: require('../../CoreAssets/ic_block.png'),
      tintColor: '#ff0000',
      onPress: onBlockedUsersPress,
    },
  ];

  return (
    <IMUserProfileComponent
      user={props.user}
      onUpdateUser={onUpdateUser}
      onLogout={onLogout}
      menuItems={menuItems}
      appStyles={AppStyles}
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout, setUserData })(
  MyProfileScreen,
);
