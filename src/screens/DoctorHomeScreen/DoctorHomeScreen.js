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
import { View } from 'react-native';

const DoctorHomeScreen = (props) => {
  const { navigation } = props;
  let colorScheme = useColorScheme();
  return (
    <View>
      
    </View>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout, setUserData })(
  DoctorHomeScreen,
);
