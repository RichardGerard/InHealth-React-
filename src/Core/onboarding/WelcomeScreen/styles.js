import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    logo: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: -100,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 50,
      marginBottom: 20,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    smallCaption: {
      fontSize: 12,
      paddingHorizontal: 50,
      marginBottom: 10,
      marginTop:10,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 25,
      padding: 10,
      marginTop: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      height: 48,
    },
    loginText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    signupContainer: {
      justifyContent: 'center',
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      height: 45,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    dismissButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    }
  });
};

export default dynamicStyles;
