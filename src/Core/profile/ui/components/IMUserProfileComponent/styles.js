import { Dimensions } from 'react-native';
import { StyleSheet ,I18nManager} from 'react-native';
import TNColor from '../../../../truly-native/TNColor';
import { modedColor } from '../../../../helpers/colors';

const { height } = Dimensions.get('window');
const imageSize = height * 0.14;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    buttonContainer: {
      height: 53,
      width: '98%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      alignItems: 'center',
      marginTop: 50,
    
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
    userName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
    },
    logout: {
      width: '90%',
      borderWidth: 1,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
      paddingVertical: 10,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      borderRadius: 5,
      marginBottom:20,
      textAlign: 'center',
    },
    container2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },  
    container1: {
      flexDirection: 'row',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    }, 
 
    box: {
      width: 50,
      height: 50,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      paddingHorizontal: 0,
      paddingVertical: 16,
      borderRadius: 4,
      backgroundColor: "oldlace",
      alignItems: 'center',
      alignSelf: "flex-start",
      marginHorizontal: "1%",
      marginBottom: 6,
      minWidth: "48%",
      textAlign: "center",
    },
    selected: {
      backgroundColor: "coral",
      borderWidth: 0,
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: "500",
      textAlign: 'center',
      color: "coral",
    },
    selectedLabel: {
      color: "white",
    },
    label: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 24,
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
      marginTop: 10,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
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
    signupContainer1: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 10,
    },
  });
};

export default dynamicStyles;
