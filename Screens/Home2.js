import React, { useState, useCallback, useEffect } from 'react'
import { Text, Image } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat/src'
import initialMessages from './messages';

import { 
  renderComposer,
  renderInputToolbar,
  renderSend,
} from '../Shared/Components/GiftedChat/InputToolbar';

import { 
  renderAvatar,
  renderBubble,
  renderMessage,
  renderMessageText,
  renderQuickReplies
} from '../Shared/Components/GiftedChat/MessageContainer';

import colors from '../Shared/Helpers/colors';

const title="Step 1 - Preliminary Questions"

export function Home2({ navigation }) {
  
  const [messages, setMessages] = useState([]);
  const [ inputEnabled, setInputEnabled] = useState(false);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, [])

  const onSend = (messages = []) => {
    console.log(messages)
    setMessages(prevState => GiftedChat.append(prevState, messages));
  }
  
  function onQuickReply(quickReply) {
    
    let message = quickReply[0].title;
    let msg = {
      _id: messages.length + 1,
      text: message,
      user: {
        _id: 1,
        name: "user"
      }
    }

    console.log(msg)
    onSend(msg);

    setTimeout(function(){ 
      var botResponse = `What kind of '${message}' do you need?`;
  
      msg = {
        _id: messages.length + 2,
        text: botResponse,
        user: {
          _id: 2,
          name: 'robot',
          avatar: require("../Shared/Images/lexdoc/lexie/smile.png")
        },
        quickReplies: {
          type: 'radio',
          values: [
            {
              title: 'Affidavit of Acceptance',
              value: '0',
            },
            {
              title: 'Affidavit of Adverse Claim',
              value: '1',
            },
            {
              title: 'Affidavit of Aggregate Agricultural Landholdings',
              value: '2',
            },
            {
              title: 'Affidavit of Assumption of Liability',
              value: '3',
            },
            {
              title: 'Affidavit of Attainment of Majority Age',
              value: '4',
            },
            {
              title: 'Affidavit of Building Ownership',
              value: '5',
            },
            {
              title: 'Affidavit of Cancellation',
              value: '6',
            },
            {
              title: 'Affidavit of Change in Motor Vehicle',
              value: '7',
            },
            {
              title: 'Affidavit of Child Custody',
              value: '8',
            },
          ]
        },
      }
  
      onSend(msg);
    }, 500);

    
  }


  return (
    <View style={styles.main}>
			<View style={[styles.chatContainer]}>
				<View style={styles.mainTop}>
					<Text style={styles.stepTitle}>{title}</Text>
					<Text style={styles.stepDesc}>Your Task: Select Check the Legal Document (Ongoing)</Text>
				</View>

				<GiftedChat
          messages={messages}

          scrollToBottom={true}
          alwaysShowSend
          renderSend={renderSend}
          renderComposer={renderComposer}
          renderInputToolbar={renderInputToolbar}
          renderAvatar={renderAvatar}
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          renderMessage={renderMessage}

          renderQuickReplies={renderQuickReplies}

          onQuickReply={onQuickReply}

          placeholder={inputEnabled ? "Type your answer here" : "Select your answer above"}
          user={{
            _id: 1,
            name: 'user',
          }}
          onSend={onSend}
          showUserAvatar 

        />
			</View>
		</View>
  )
}


const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.white
  },
  chatExtraContainer: {
		paddingHorizontal: 10,
		paddingBottom: 20,
		paddingTop: 5,
  },
  chatInnerContainer: {
		paddingHorizontal: 15,
		paddingTop: 15,
  },
  insertButton: {
		borderRadius: 15,
		marginTop: 10,
		paddingVertical: 8
  },
  enterIconContainer: {
		backgroundColor: colors.secondary_light,
		alignItems: 'center',
		justifyContent: 'center'
  },
  enterIcon: {
		paddingVertical: 10,
		paddingHorizontal: 15
  },
  chatContainer: {
		flex: 1,
		borderColor: '#DFDFDF',
		borderWidth: 1,
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3,
		justifyContent: 'space-between',
		overflow: 'hidden',
		backgroundColor: '#E4E7EA'
  },  
  mainTop: {
		backgroundColor: colors.white,
		padding: 12
  },
  mainMiddle: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'stretch',
  },
  mainBottom: {
		flexDirection: 'row',
		borderRadius: 3,
		backgroundColor: colors.secondary,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		overflow: 'hidden',
  },
  scroll: {
		flex: 1,
  },
  stepTitle: {
		color: colors.secondary_2,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16
  },
  stepDesc: {
		color: colors.gray_shade_11,
		textAlign: 'center',
		fontSize: 15
  },
  inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
  },
  input: {
		fontSize: 15,
		color: colors.white,
		padding: 10,
		flexWrap: 'wrap'
  }
})