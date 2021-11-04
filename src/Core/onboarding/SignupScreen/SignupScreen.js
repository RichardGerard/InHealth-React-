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
  const type = props.route.params.type;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [txvTitle, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [practiceNumber, setPracticeNumber] = useState('');
  const [password, setPassword] = useState('');

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (text) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(text).toLowerCase()) ? true : false;
  };
  
  const validatePassword = (text) => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])/;
    return reg.test(String(text)) ? true : false;
  };
  
  const onRegister = () => {

    if(!validateEmail(email?.trim())) {
      Alert.alert(
        '',
        IMLocalized(
          'Please enter a valid email address.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    };

    if (password?.trim() == '') {
      Alert.alert(
        '',
        IMLocalized(
          'Password cannot be empty.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      setPassword('');
      return;
    };

    if (password?.trim()?.length < 6) {
      Alert.alert(
        '',
        IMLocalized(
          'Password is too short. Please use at least 6 characters for security reasons.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      setPassword('');
      return;
    };

    const userDetails = {
      type: type,
      title:txvTitle?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email && email.trim(),
      contactNumber: phoneNumber?.trim(),
      PracticeNumber: practiceNumber?.trim(),
      password: password && password.trim(),
      appIdentifier: appConfig.appIdentifier,
    };
   routes: [props.navigation.navigate('LoginStack', {
        screen: 'Signup2',
        params: {
          isSigningUp: true,
          appStyles,
          appConfig,
          authManager,
          userDetails:userDetails,
        },
      }) ]
  };

  const renderSignupWithEmail = () => {
    return (
      <>
       <Text style={styles.inputTitle}>{IMLocalized('Title')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('Title')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={txvTitle}
          underlineColorAndroid="transparent"
        />
         <Text style={styles.inputTitle}>{IMLocalized('First Name')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('First Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
         <Text style={styles.inputTitle}>{IMLocalized('Last Name')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('Last Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.inputTitle}>{IMLocalized('E-mail address')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('E-mail Address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
         <Text style={styles.inputTitle}>{IMLocalized('Contact number')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('Contact number')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType ='numeric'
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
          <Text style={styles.inputTitle}>{IMLocalized('Practice number')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('Practice Number')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPracticeNumber(text)}
          value={practiceNumber}
          keyboardType ='numeric'
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
         <Text style={styles.inputTitle}>{IMLocalized('Password')}</Text>
        <TextInput 
         style={styles.InputContainer1}
          placeholder={IMLocalized('Password')}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => onRegister()}>
          {IMLocalized('Next')}
        </Button>
        <Text style={styles.smallCaption} 
        onPress={() => props.navigation.goBack()}>
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
        <Text style={styles.title1}>{IMLocalized('Doctors personal information')}</Text>      

        {/* <TNProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
          appStyles={appStyles}
        /> */}
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
