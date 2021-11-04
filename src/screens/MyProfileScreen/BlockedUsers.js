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





import { firebase }  from '../../Core/firebase/config'
import { View, StyleSheet, FlatList, TouchableOpacity , Image, TouchableWithoutFeedback, Text, TextInput} from 'react-native';
import { List, Divider } from 'react-native-paper';
import { ThemeContext } from 'react-native-elements';

// for filter function
import filter from 'lodash.filter';



import { channelManager } from '../../Core/firebase';
import { lastFromTime } from 'uuid-js';

const BlockedUsersScreen = (props) => {
  const { store } = useContext(ReactReduxContext);
  const { navigation } = props;
  const [threads, setThreads] = useState([]);
  const [search, setSearch] = useState('');


  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);


  let colorScheme = useColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const [loading, setLoading] = useState(true);

  const friends = useSelector((state) => state.friends.friends);
  const currentUser = useSelector((state) => state.auth.user);
  const channels = useSelector((state) => state.chat.channels);
  const friendships = useSelector((state) => state.friends.friendships);

  const friendshipTracker = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Blocked Users",
      
      headerLeft: () => (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.backArrow}
          onPress={back}
          appStyles={AppStyles}
        />
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('BLOCKED_USERS')
      .doc(currentUser.id)
      .collection('blocked_users')
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
        setFullData(threads);
        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);



  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const back = () => {
    props.navigation.navigate('MyProfile');
  };


  async function unblockAction(item) {
    console.log("clicked unblcok");
    // firebase.firestore()
    //   .collection('MY_ROOM')
    //   .doc(currentUser.id)
    //   .collection('chat_rooms')
    //   .doc(item.name)
    //   .set(
    //     {
    //     name:item.name,
    //     createdAt: new Date().getTime()
    //     },
    //     { merge: true }
    //   )
    //   .then(() => {props.navigation.navigate('roomChat', { thread: item })});
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = fullData.filter(
        function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setThreads(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setThreads(fullData);
      setSearch(text);
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: '#fff',
              padding: 0,
              marginVertical: 10,
              marginHorizontal:10,
              borderRadius: 20,
              height:40
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={search}
              onChangeText={queryText => searchFilterFunction(queryText)}
              placeholder="Search Users"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        }
        data={threads}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
        <View style={[{height: 75, borderBottomWidth:1, borderBottomColor:'#d2d2d2', flexDirection: 'row'}]}>
            <View style={{flex: 1.5}}>
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            </View>
            <TouchableOpacity style={[{flex:1}]} onPress={() => unblockAction(item)}>
                <Image source={require('./unblock.png')} style={styles.logo}/>
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
};

export default BlockedUsersScreen;

const styles = StyleSheet.create({
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

  logo: {
    resizeMode: 'stretch', // or 'stretch'
    top: 24,
    left: 10,
    width: 140,
    height: 30,
    right:30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    top:25,
    left: 20,
    right: 20,
    bottom:10,
    backgroundColor: 'transparent',
    flexDirection: 'column'
},
subtitle: {
    top:30,
    left: 20,
    right: 0,
    bottom:10,
    fontSize: 15,
    backgroundColor: 'transparent',
  }
});