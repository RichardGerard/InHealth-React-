import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar,Image,TouchableOpacity ,TextInput} from 'react-native';
import Button from 'react-native-button';

import { firebase } from '../../../../firebase/config';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../../localization/IMLocalization';
import IMProfileItemView from '../IMProfileItemView/IMProfileItemView';
import { TNProfilePictureSelector } from '../../../../truly-native';
import { firebaseStorage } from '../../../../firebase/storage';
import { firebaseAuth } from '../../../../firebase';
import { loadCachedItem } from '../../../../helpers/cacheManager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const IMUserProfileComponent = (props) => {
  
  const { appStyles, menuItems, onUpdateUser, onLogout } = props;
  const {
    profilePictureURL,
    firstName,
    lastName,
    fullname,
    userID,    
    title,
    email,
    contactNumber,
    PracticeNumber,
    practiece ,
    education,
    xray,
    radation,
    scanner,
    workOpenTime,
    workCloseTime,
    restOpenTime ,
    restCloseTime,
    holidayOpenTime,
    holidayCloseTime ,
    location: location ,
    signUpLocation,    
    createdAt: timestamp,
  } = props.user;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [profilePicture, setProfilePicture] = useState(profilePictureURL);

  const viewType =0;
  useEffect(() => {
    const loadImage = async () => {
      const image = await loadCachedItem({ uri: profilePicture });
      setProfilePicture(image);
    };

    loadImage();
  }, [profilePictureURL]);

  const onUserProfileUpdate = (querySnapshot) => {
    const data = querySnapshot.data();
    if (data) {
      onUpdateUser(data);
    }
  };

  useEffect(() => {
    if (props.user.id || props.user.userID) {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(props.user.id || props.user.userID);

      const unsubscribeUserFunction = userRef.onSnapshot(onUserProfileUpdate);
      return () => {
        unsubscribeUserFunction();
      };
    }
  }, []);

  const displayName = () => {
    if (
      (firstName && firstName.length > 0) ||
      (lastName && lastName.length > 0)
    ) {
      return firstName + ' ' + lastName;
    }
    return fullname || '';
  };

  const setProfilePictureFile = (photoFile) => {
    if (photoFile == null) {
      // Remove profile photo action
      firebaseAuth.updateProfilePhoto(userID, null).then((finalRes) => {
        if (finalRes.success == true) {
          onUpdateUser({ ...props.user, profilePictureURL: null });
        }
      });
      return;
    }
    // If we have a photo, we upload it to Firebase, and then update the user
    firebaseStorage.uploadFile(photoFile).then((response) => {
      if (response.error) {
        // there was an error, fail silently
      } else {
        firebaseAuth
          .updateProfilePhoto(userID, response.downloadURL)
          .then((finalRes) => {
            if (finalRes.success == true) {
              onUpdateUser({
                ...props.user,
                profilePictureURL: response.downloadURL,
              });
            }
          });
      }
    });
  };

  const renderMenuItem = (menuItem) => {
    const { title, icon, onPress, tintColor } = menuItem;
    return (
      <IMProfileItemView
        title={title}
        icon={icon}
        iconStyle={{ tintColor: tintColor }}
        onPress={onPress}
        appStyles={appStyles}
      />
    );
  };

  const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,    
  }) => (

    <View style={{ padding: 10, flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[
              styles.button,
              selectedValue === value && styles.selected,
            ]}
          >
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {console.log(selectedValue)}
      {selectedValue== 'Profile'? 
        <View style={[styles.container, { [label]: selectedValue }]}>
          {
            renderSignupWithEmail()
          }

        </View>
        : null//profileSetting3() 
        }
        
      
    </View>
  );

  const onRegister = () => {
    
  };
  const profileSetting3 = (variable) => {

    return (
      <>
       <Text style={styles.inputTitle}>{IMLocalized('Practice address')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('Practice address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPractiece(text)}
          value={"aaa"}
          underlineColorAndroid="transparent"
        />   
        <Text style={styles.inputTitle}>{IMLocalized('Payment Details')}</Text>
        <Text style={styles.title1,{
            marginBottom:300,
          }}>{IMLocalized('This payment detail will be comefrom stripe sdk')}</Text>      

        <View style={styles.container2}>
              <Button
                containerStyle={[styles.signupContainer1,{width:150}]}
                style={styles.signupText}
                onPress={() => onRegister()}>
                {IMLocalized('Previous')}
              </Button>
              <Button
              containerStyle={[styles.signupContainer1,{width:150,marginLeft:20}]}
                style={styles.signupText}
                onPress={() => onRegister()}>
                {IMLocalized('Change Profile')}
              </Button>
        </View>        
      </>
    );
  };
  const profileSetting = (variable) => {
    console.log("bbbbbbb");

    return (
      <>
       <Text style={styles.inputTitle}>{IMLocalized('Doctors specialty')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('General practieces')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPractiece(text)}
          value={practiece}
          underlineColorAndroid="transparent"
        />   
        <Text style={styles.inputTitle}>{IMLocalized('Education background discription')}</Text>
       <TextInput
          style={styles.InputContainer2}
          placeholder={IMLocalized('Education background description')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEduction(text)}
          value={education}
          underlineColorAndroid="transparent"
        /> 
      <Text style={styles.inputTitle}>{IMLocalized('Add my Facility service')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('X-ray')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setXray(text)}
          value={xray}
          underlineColorAndroid="transparent"
        />     
          <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('Radation')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setRadation(text)}
          value={radation}
          underlineColorAndroid="transparent"
        />   
        <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('MRI Scaner')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setScaner(text)}
          value={scanner}
          underlineColorAndroid="transparent"
        />   
      <Text style={styles.inputTitle}>{IMLocalized('Set Openning Times')}</Text>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setWorkOpenning(text)}
            value={workOpenTime}
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
            value={workCloseTime}
            underlineColorAndroid="transparent"
          />   
      </View>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setRestOpenning(text)}
            value={restOpenTime}
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
            value={restCloseTime}
            underlineColorAndroid="transparent"
          />   
      </View>
      <View style={styles.container2}>
        <TextInput
            style={styles.InputContainer3}
            placeholder={IMLocalized('Openning')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setHolidayOpenning(text)}
            value={holidayOpenTime}
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
            value={holidayCloseTime}
            underlineColorAndroid="transparent"
          />   
      </View>
      {/* <Text style={styles.inputTitle}>{IMLocalized('Upload pracitice label')}</Text>
      <View style={styles.container1}>
        <TNProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
          appStyles={appStyles}
          />
      </View> */}
       <View style={styles.container2}>
              <Button
                containerStyle={[styles.signupContainer1,{width:150}]}
                style={styles.signupText}
                onPress={() => onRegister()}>
                {IMLocalized('Previous')}
              </Button>
              <Button
              containerStyle={[styles.signupContainer1,{width:150,marginLeft:20}]}
                style={styles.signupText}
                onPress={() => onRegister()}>
                {IMLocalized('Next')}
              </Button>
        </View>
      </>
    );
  };

  const renderSignupWithEmail = () => {
    return (
      <>
     <Text style={[styles.inputTitle,{color:"#FF3307"}]}>{IMLocalized('Doctors personal information')}</Text>

      <Text style={styles.inputTitle}>{IMLocalized('Title')}</Text>
       <TextInput
          style={styles.InputContainer1}
          placeholder={IMLocalized('Title')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={title}
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
        <Text style={styles.inputTitle}>{IMLocalized('Email Address')}</Text>
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
          value={contactNumber}
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
          value={PracticeNumber}
          keyboardType ='numeric'
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() =>
            onRegister()
          }>
          {IMLocalized('Next')}
        </Button>
      
      </>
    );
  };
 
  const myProfileScreenContent = () => {
    const [direction, setDirection] = useState("Profile");
    return (
      <>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <StatusBar
          // backgroundColor={useDynamicValue('#ffffff', '#121212')}
          // barStyle={useDynamicValue('dark-content', 'light-content')}
          />
          <View style={[styles.container2,{marginTop:30}]}>
              <View style={styles.imageContainer}>
                  <TNProfilePictureSelector
                    setProfilePictureFile={setProfilePictureFile}
                    appStyles={appStyles}
                    profilePictureURL={profilePicture}
                />
              </View>
              <View style={{marginLeft: 20}}>      
               <Text style={styles.userName}>{displayName()}</Text>                         
               <Text style={[styles.userName,{fontSize:14}]}>{title}</Text>   
               <View style={[styles.container1,{marginTop:20}]}>
                <Image
                      source={require("../../../../../../assets/icons/contact-us.png")}
                      style={{ width: 15, height: 15,tintColor:"#FF3307"}}
                    />
                <Text style={[styles.userName,{fontSize:14,color:"#FF3307",marginLeft:5}]}>{contactNumber}</Text>   
               </View>
               <View style={styles.container1}>
                <Image
                      source={require("../../../../../../assets/icons/mail.png")}
                      style={{ width: 15, height: 15,tintColor:"#FF3307"}}
                    />
                <Text style={[styles.userName,{fontSize:14,color:"#FF3307",marginLeft:5}]}>{email}</Text>   
               </View>
               <View style={styles.container1}>
                <Image
                      source={require("../../../../../../assets/icons/icon_map.png")}
                      style={{ width: 15, height: 15,tintColor:"#FF3307"}}
                    />
                <Text style={[styles.userName,{fontSize:14,color:"#FF3307",marginLeft:5}]}>{'View Location'}</Text>   
               </View>
              </View>          
          </View>         
          {/* {menuItems.map((menuItem) => {
            return renderMenuItem(menuItem);
          })}           */}

          <PreviewLayout
                selectedValue={direction}
                values={["Profile", "My Patients"]}
                setSelectedValue={setDirection}>               
                     {/* {renderSignupWithEmail({})}
                     {profileSetting({})} 
                     {profileSetting3({})} */}

          </PreviewLayout>
          <Text onPress={onLogout} style={styles.logout}>
            {IMLocalized('Logout')}
          </Text>
        </View>
        </KeyboardAwareScrollView>
      </>
    );
  };


  return <>{myProfileScreenContent()}</>;
};

export default IMUserProfileComponent;
