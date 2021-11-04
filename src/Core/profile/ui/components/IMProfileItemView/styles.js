import { StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      width: '95%',
    },
    icon: {
      width: 24,
      height: 24,
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      marginLeft: 10,
    },
    title: {
      marginLeft: 15,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      marginTop: 3,
    },
    itemNavigationIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
      tintColor: appStyles.colorSet[colorScheme].grey6,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
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
  });
};

export default dynamicStyles;
