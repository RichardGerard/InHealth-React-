import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import { localizedErrorMessage } from '../utils/ErrorCode';
import TermsOfUseView from '../components/TermsOfUseView';
import { number } from 'yup';
import { color } from 'react-native-reanimated';

const SignupScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const appStyles = props.route.params.appStyles;
  const authManager = props.route.params.authManager;
  const userDetails = props.route.params.userDetails;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [txvPractiece, setPractiece] = useState('');


  const [loading, setLoading] = useState(false);

  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const onRegister = () => {
    setLoading(true);
    authManager
      .createAccountWithEmailAndPassword(
        userDetails,
        appConfig,
      )
      .then((response) => {
        if (response?.user) {
          const user = response.user;
          props.setUserData({
            user: response.user,
          });
          Keyboard.dismiss();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user: user } }],
          });
        } else {
          setLoading(false);
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      });
  };

  const renderSignupWithEmail = () => {
    return (
      <>
       <Text style={styles.inputTitle}>{IMLocalized('Practice address')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('Practice address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPractiece(text)}
          value={txvPractiece}
          underlineColorAndroid="transparent"
        />   
        <Text style={styles.inputTitle}>{IMLocalized('Payment Details')}</Text>
        <Text style={styles.title1,{
            marginBottom:300,
          }}>{IMLocalized('This payment detail will be comefrom stripe sdk')}</Text>      

        <Button
          containerStyle={styles.signupContainer1}
          style={styles.signupText}
          onPress={() => onRegister()}>

          {IMLocalized('Submit')}
        </Button>
        <Text style={styles.smallCaption} 
             onPress={() =>
            props.navigation.navigate('LoginStack', {
              screen: 'Login',
              params: {
                isSigningUp: true,
                appStyles,
                appConfig,
                authManager,
              },
            })            
          }>
           Already have a account <Text style={{color: 'red'}}>Sign in</Text>
      </Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                style={appStyles.styleSet.backArrowStyle}
                source={appStyles.iconSet.backArrow}
              />
            </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized('Signup')}</Text>      
        <Text style={styles.title1}>{IMLocalized('Payment details')}</Text>      
    
        {renderSignupWithEmail()}
        {appConfig.isSMSAuthEnabled && (
          <>
            {/* <Text style={styles.orTextStyle}>{IMLocalized('OR')}</Text>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() =>
                props.navigation.navigate('Sms', {
                  isSigningUp: true,
                  appStyles,
                  appConfig,
                  authManager,
                })
              }>
              {IMLocalized('Sign up with phone number')}
            </Button> */}
          </>
        )}
        {/* <TermsOfUseView tosLink={appConfig.tosLink} privacyPolicyLink={appConfig.privacyPolicyLink} style={styles.tos} /> */}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData,
})(SignupScreen);
