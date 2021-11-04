import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';

const { height } = Dimensions.get('window');
const imageSize = height * 0.232;
const photoIconSize = imageSize * 0.27;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    container1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    container2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 10,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },
    title1: {
      fontSize: 16,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 5,
      alignSelf: 'stretch',
      color: '#F44336',
      textAlign: 'left',
      marginLeft: 35,
    },
    inputTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 15,
      alignSelf: 'stretch',
      color: '#323232',
      textAlign: 'left',
      marginLeft: 35,
      paddingLeft: 20,
    },
    InputContainer1: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 5,
      alignItems: 'center',
      borderRadius: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    InputContainer2: {
      height: 100,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 5,
      alignItems: 'center',
      borderRadius: 10,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    InputContainer3: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '30%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: appStyles.fontSet.middle,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    loginContainer: {
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 30,
    },
    loginText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    signupContainer: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 50,
    },
    signupContainer1: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 10,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    smallCaption: {
      fontSize: 12,
      paddingHorizontal: 50,
      marginBottom: 10,
      marginTop:10,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
  });
};

export default dynamicStyles;
