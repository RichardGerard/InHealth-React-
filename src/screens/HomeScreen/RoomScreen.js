
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


import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage
} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { firebase }  from '../../Core/firebase/config'



const RoomScreen = (props) => {
  const { store } = useContext(ReactReduxContext);
  const { navigation } = props;

  let colorScheme = useColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const [loading, setLoading] = useState(true);

  const friends = useSelector((state) => state.friends.friends);
  const currentUser = useSelector((state) => state.auth.user);
  //console.log('this is currentuser=========>',currentUser);
  const channels = useSelector((state) => state.chat.channels);
  const friendships = useSelector((state) => state.friends.friendships);

  const friendshipTracker = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: IMLocalized(thread.name),
      
      headerLeft: () => (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.backArrow}
          onPress={()=>props.navigation.navigate('Home')}
          appStyles={AppStyles}
        />
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  const [messages, setMessages] = useState([]);
  
  const thread = props.route.params.thread;
  //console.log('this is thread=========>',thread);

  async function handleSend(messages) {
    const text = messages[0].text;

    firebase.firestore()
      .collection('PUBLIC_CHAT_ROOM')
      .doc(thread.name)
      .collection(thread.name)
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.id,
          email: currentUser.email
        }
      });

    await firebase.firestore()
      .collection('PUBLIC_CHAT_ROOM')
      .doc(thread.name)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = firebase.firestore()
      .collection('PUBLIC_CHAT_ROOM')
      .doc(thread.name)
      .collection(thread.name)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6292fe'
          },
          left: {
            backgroundColor: '#e0e0e0'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6292fe' />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }



  

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.id }}
      placeholder='Type your message here...'
      quickReplyStyle
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});

