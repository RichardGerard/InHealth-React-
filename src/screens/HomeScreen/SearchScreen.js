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

const SearchScreen = (props) => {
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
      headerTitle: "Search",
      
      headerLeft: () => (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.menuHamburger}
          onPress={openDrawer}
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
      .collection('PUBLIC_CHAT_ROOM')
      .onSnapshot(querySnapshot => {
        
        const threads = querySnapshot.docs.map(documentSnapshot => {
          //console.log(documentSnapshot);
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: documentSnapshot.name,

            latestMessage: {
              text: 'Created just ago.Please join now.'
            },
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


  async function handleSetMyRoom(item) {
    firebase.firestore()
      .collection('MY_ROOM')
      .doc(currentUser.id)
      .collection('chat_rooms')
      .doc(item.name)
      .set(
        {
        name:item.name,
        createdAt: new Date().getTime()
        },
        { merge: true }
      )
      .then(() => {props.navigation.navigate('roomChat', { thread: item })});
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
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        }
        data={threads}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
        <View style={[{height: 100, borderBottomWidth:1, borderBottomColor:'#d2d2d2', flexDirection: 'row'}]}>
            <View style={{flex: 2.0}}>
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>{item.latestMessage.text}</Text>
            </View>
            <TouchableOpacity style={[{flex:1}]} onPress={() => handleSetMyRoom(item)}>
                <Image source={require('./joinbtn.png')} style={styles.logo}/>
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;

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
    top: 20,
    left: 10,
    width: 110,
    height: 30,
    right:20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    top:20,
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