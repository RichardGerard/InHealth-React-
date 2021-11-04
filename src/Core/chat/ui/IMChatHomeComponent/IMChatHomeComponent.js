import React, {
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity,Text, ScrollView , Image} from 'react-native';
import { firebase }  from '../../../../Core/firebase/config'
import { useSelector, ReactReduxContext } from 'react-redux';
import { List, Divider } from 'react-native-paper';




import PropTypes from 'prop-types';


import { SearchBarAlternate } from '../../..';
import { TNStoriesTray } from '../../../truly-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMConversationListView } from '../..';
import { IMLocalized } from '../../../localization/IMLocalization';







function IMChatHomeComponent(props) {
  const {
    friends,
    onSearchBarPress,
    onFriendItemPress,
    navigation,
    appStyles,
    onSenderProfilePicturePress,
    onEmptyStatePress,
    followEnabled,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);




  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.user);
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('MY_ROOM')
      .doc(currentUser.id)
      .collection('chat_rooms')
      .onSnapshot(querySnapshot => {
        
        const threads = querySnapshot.docs.map(documentSnapshot => {
          console.log("thisis==> ",documentSnapshot);
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: documentSnapshot.name,

            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);



  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBarAlternate
            onPress={onSearchBarPress}
            placeholderTitle={IMLocalized('Search for doctors')}
            appStyles={appStyles}
          />
        </View>
        <View style={styless.container}>
          <FlatList
            data={threads}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <TouchableOpacity style={[{flexDirection: 'row',height: 80, borderBottomWidth:1, borderBottomColor:'#d2d2d2'}]} onPress={() => navigation.navigate('roomChat', { thread: item })}>
                <Image source={require('./group_chatting.png')} style={styless.logo}/>
                <View style={[{flex: 5}]}>
                  <Text style={styless.title}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {friends && friends.length > 0 && (
          <TNStoriesTray
            onStoryItemPress={onFriendItemPress}
            storyItemContainerStyle={styles.userImageContainer}
            data={friends}
            displayLastName={false}
            appStyles={appStyles}
            showOnlineIndicator={true}
          />
        )}
      </ScrollView>
    </View>
  );
}

IMChatHomeComponent.propTypes = {
  onSearchClear: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFriendAction: PropTypes.func,
  onSearchBarPress: PropTypes.func,
  channels: PropTypes.array,
};

export default IMChatHomeComponent;

const styless = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  },
  title: {
    fontSize: 16,
    //fontWeight: 'bold',
    top:30,
    left: 30,
    right: 20,
    bottom:10,
    backgroundColor: 'transparent',
    flexDirection: 'column'
},logo: {
  resizeMode: 'stretch', // or 'stretch'
  top: 10,
  left: 15,
  width: 60,
  height: 60,
  right:20,
  flex:0.9
},
});
