import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Text, Image } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat/src'

import  { getTypes, getKinds, getTemplateByKind, postSchema } from './getItems'
import initialMessages from './messages';
import { robot, user, affiantNo, partyKind } from './templates';

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

let quickRepliesItems = [];
let selectedDocumentType = [];
let selectedKind = []
let selectedTemplateByKind = []
let selectedHowMany = []

export function Home2({ }) {
  
  const [ messages, setMessages ] = useState([]);
  const [ step, setStep ] = useState(1);
  const [ inputEnabled, setInputEnabled] = useState(false);
  const [ isTyping, setIsTyping] = useState(true);
  const [ lexdocs, setLexdocs] = useState([]);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, [])

  useEffect(() => { 
    sendBotResponse()
  }, [step])

  async function setQuickRepliesItems () {

    console.log("Selected kind",selectedKind?.value)
    var quickReplyFunc = {
      1: async function() { return quickRepliesItems = await getTypes()},
      2: async function() { return quickRepliesItems = await getKinds(selectedDocumentType.value)},
      3: async function() { return quickRepliesItems = await getTemplateByKind(selectedKind.value)},
      4: async function() { return quickRepliesItems = affiantNo },
      5: async function() { return quickRepliesItems = partyKind }
      // 'default': async function() { return quickRepliesItems = [{title: "sample", value: 1}] }
    };
    return await (quickReplyFunc[step] || quickReplyFunc['default'])();
  }

  async function getBotResponse () {
    var response = {
      1: `What type of legal document do you need?`,
      2: `What kind of "${selectedDocumentType?.title}" do you need?`,
      3: `What kind of "${selectedKind?.title}" do you need?`,
      4: `How many "Affiant" who will sign the "${selectedTemplateByKind?.title}"?` ,
      5: `What kind of party is the Affiant?`,
      'default': 'fail'
    };
    return await (response[step] || response['default']);
  }

  async function sendBotResponse() {

    setIsTyping(true)
    await setQuickRepliesItems();
    console.log("\n", step)
    var response = await getBotResponse();

    let msg = {
      _id: messages.length + 1,
      text: response,
      user: robot,
      quickReplies: {
        type: 'radio',
        values: quickRepliesItems
      }
    }
    
    setMessages(prevState => GiftedChat.append(prevState, msg));
    setIsTyping(false)
  }

  async function onSend(messages = []) {
    setMessages(prevState => GiftedChat.append(prevState, messages));
  }
  
  async function onQuickReply(quickReply) {

    console.log("step onquickreply: ", step)
    if(step === 1) { selectedDocumentType = quickReply[0] }
    else if(step === 2) selectedKind = quickReply[0]
    else if(step === 3) selectedTemplateByKind = quickReply[0]
    else if(step === 4) selectedHowMany = quickReply[0]
    // else if(step === 5) selectedFinalTemplate = quickReply[0]

    let message = quickReply[0].title;
    let msg = {
      _id: messages.length + 1,
      text: message,
      user
    }
    await onSend(msg);

    if(step !== 5)
      setStep(prevStep => prevStep + 1)
    else 
      postSchema(selectedDocumentType, selectedKind, selectedTemplateByKind, selectedHowMany)

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
          isTyping={isTyping}
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
          user={user}
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