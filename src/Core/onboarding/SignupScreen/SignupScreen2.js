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
  const [txvEduction, setEduction] = useState('');
  const [txvXray, setXray] = useState('');
  const [txvRadation, setRadation] = useState('');
  const [txvScaner, setScaner] = useState('');
  const [txvWorkopenning, setWorkOpenning] = useState('');
  const [txvWorkClosing, setWorkClosing] = useState('');
  const [txvRestopenning, setRestOpenning] = useState('');
  const [txvRestClosing, setRestClosing] = useState('');
  const [txvHolidayopenning, setHolidayOpenning] = useState('');
  const [txvHolidayClosing, setHolidayClosing] = useState('');

  const [loading, setLoading] = useState(false);

  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const onRegister = () => {

    // if(!validateEmail(email?.trim())) {
    //   Alert.alert(
    //     '',
    //     IMLocalized(
    //       'Please enter a valid email address.',
    //     ),
    //     [{ text: IMLocalized('OK') }],
    //     {
    //       cancelable: false,
    //     },
    //   );
    //   return;
    // };

    // if (password?.trim() == '') {
    //   Alert.alert(
    //     '',
    //     IMLocalized(
    //       'Password cannot be empty.',
    //     ),
    //     [{ text: IMLocalized('OK') }],
    //     {
    //       cancelable: false,
    //     },
    //   );
    //   setPassword('');
    //   return;
    // };

    // if (password?.trim()?.length < 6) {
    //   Alert.alert(
    //     '',
    //     IMLocalized(
    //       'Password is too short. Please use at least 6 characters for security reasons.',
    //     ),
    //     [{ text: IMLocalized('OK') }],
    //     {
    //       cancelable: false,
    //     },
    //   );
    //   setPassword('');
    //   return;
    // };
    const NewuserDetails = {
      type:userDetails.type,
      title:userDetails.title,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      contactNumber: userDetails.contactNumber,
      PracticeNumber: userDetails.PracticeNumber,
      password: userDetails.password,

      practiece:txvPractiece?.trim(),
      education: txvEduction?.trim(),
      xray: txvXray?.trim(),
      radation: txvRadation?.trim(),
      scanner: txvScaner?.trim(),
      workOpenTime: txvWorkopenning?.trim(),
      workCloseTime: txvWorkClosing?.trim(),
      restOpenTime: txvRestopenning?.trim(),
      restCloseTime: txvRestClosing?.trim(),
      holidayOpenTime: txvHolidayopenning?.trim(),
      holidayCloseTime: txvHolidayClosing?.trim(),
      photoFile: profilePictureFile,
      appIdentifier: appConfig.appIdentifier,
    };

   routes: [props.navigation.navigate('LoginStack', {
        screen: 'Signup3',
        params: {
          isSigningUp: true,
          appStyles,
          appConfig,
          authManager,
          userDetails:NewuserDetails,
        },
      }) ]
  };
  const renderSignupWithEmail = () => {
    return (
      <>
       <Text style={styles.inputTitle}>{IMLocalized('Doctors specialty')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('General practieces')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPractiece(text)}
          value={txvPractiece}
          underlineColorAndroid="transparent"
        />   
        <Text style={styles.inputTitle}>{IMLocalized('Education background discription')}</Text>
       <TextInput
          style={styles.InputContainer2}
          placeholder={IMLocalized('Education background description')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEduction(text)}
          value={txvEduction}
          underlineColorAndroid="transparent"
        /> 
      <Text style={styles.inputTitle}>{IMLocalized('Add my Facility service')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('X-ray')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setXray(text)}
          value={txvXray}
          underlineColorAndroid="transparent"
        />     
          <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('Radation')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setRadation(text)}
          value={txvRadation}
          underlineColorAndroid="transparent"
        />   
        <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('MRI Scaner')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setScaner(text)}
          value={txvScaner}
          underlineColorAndroid="transparent"
        />   
      <Text style={styles.inputTitle}>{IMLocalized('Set Openning Times')}</Text>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setWorkOpenning(text)}
            value={txvWorkopenning}
            underlineColorAndroid="transparent"
          />   
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
          marginTop: 10,
          alignSelf: 'stretch',
          color: '#323232',
          textAlign: 'left',
          paddingLeft: 10,
          paddingRight: 10,
        }}>{IMLocalized('Mon-Fri')}</Text>
          <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Closing')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setWorkClosing(text)}
            value={txvWorkClosing}
            underlineColorAndroid="transparent"
          />   
      </View>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setRestOpenning(text)}
            value={txvRestopenning}
            underlineColorAndroid="transparent"
          />   
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
          marginTop: 10,
          alignSelf: 'stretch',
          color: '#323232',
          textAlign: 'left',
          paddingLeft: 10,
          paddingRight: 10,
        }}>{IMLocalized('Sat-Sun')}</Text>
          <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Closing')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setRestClosing(text)}
            value={txvRestClosing}
            underlineColorAndroid="transparent"
          />   
      </View>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setHolidayOpenning(text)}
            value={txvHolidayopenning}
            underlineColorAndroid="transparent"
          />   
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
          marginTop: 10,
          alignSelf: 'stretch',
          color: '#323232',
          textAlign: 'left',
          paddingLeft: 10,
          paddingRight: 10,
        }}>{IMLocalized('Holidays')}</Text>
          <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Closing')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setHolidayClosing(text)}
            value={txvHolidayClosing}
            underlineColorAndroid="transparent"
          />   
      </View>
      <Text style={styles.inputTitle}>{IMLocalized('Upload pracitice label')}</Text>
      <View style={styles.container1}>
        <TNProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
          appStyles={appStyles}
          />
      </View>
        <Button
          containerStyle={styles.signupContainer1}
          style={styles.signupText}
          onPress={() => onRegister()}>
          {IMLocalized('Next')}
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
        <Text style={styles.title1}>{IMLocalized('Facility service Information')}</Text>      

    
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
