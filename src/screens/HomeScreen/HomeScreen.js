import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import { useSelector, ReactReduxContext } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { IMChatHomeComponent } from '../../Core/chat';
import { TNTouchableIcon } from '../../Core/truly-native';
import AppStyles from '../../DynamicAppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import FriendshipTracker from '../../Core/socialgraph/friendships/firebase/tracker';

const HomeScreen = (props) => {
  const { store } = useContext(ReactReduxContext);
  const { navigation } = props;

  let colorScheme = useColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const [loading, setLoading] = useState(true);

  const friends = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.user);
  const channels = useSelector((state) => state.chat.channels);
  const friendships = useSelector((state) => state.friends.friendships);

  const friendshipTracker = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: IMLocalized('Home'),

      headerRight: () => (
        <TNTouchableIcon
          imageStyle={{ tintColor: '#ffffff'}}
          iconSource={AppStyles.iconSet.home}
          onPress={() =>
            //navigation.navigate('CreateGroup', { appStyles: AppStyles })
            console.log("Clicked home")
          }
          appStyles={AppStyles}
        />
      ),
      headerStyle: {
        backgroundColor: '#FF3307',
      },
      headerTintColor: '#ffffff',
    });
  }, []);

  useEffect(() => {
    friendshipTracker.current = new FriendshipTracker(store, currentUser?.id);
    friendshipTracker.current.subscribeIfNeeded();
  }, [currentUser?.id]);

  const onFriendItemPress = (friend) => {
    console.log(friend);
  };

  const onSearchButtonPress = async () => {
    props.navigation.navigate('UserSearchScreen', {
      appStyles: AppStyles,
      followEnabled: false,
    });
  };
  const onEmptyStatePress = () => {
    onSearchButtonPress();
  };

  const onSenderProfilePicturePress = (item) => {
    console.log(item);
  };
  return (
  <IMChatHomeComponent
      loading={loading}
      friends={friends}
      onFriendItemPress={onFriendItemPress}
      onSearchBarPress={onSearchButtonPress}
      appStyles={AppStyles}
      navigation={props.navigation}
      onEmptyStatePress={onEmptyStatePress}
      onSenderProfilePicturePress={onSenderProfilePicturePress}
      user={currentUser}
    />
    
  );
};

export default HomeScreen;
