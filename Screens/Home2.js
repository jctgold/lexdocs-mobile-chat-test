import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Text, Image } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat/src'

import  { getTypes, getKinds, getTemplateByKind, fetchTemplate } from './getItems'
import initialMessages from './messages';
import { robot, user, affiantNo, partyKind, proceedToStep2 } from './templates';

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
  const [ fetchedTemplate, setFetchedTemplate] = useState([]);
  const [ disableComposer, setDisableComposer] = useState(false);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, [])

  useEffect(() => { 
    sendBotResponse()
  }, [step])

  useEffect(() => { 
    console.log("\n\nFetched items:", fetchedTemplate.template?.name, fetchedTemplate.template?.price, fetchedTemplate.template?.minutes_to_finish_document )
  }, [fetchedTemplate])

  async function setQuickRepliesItems () {

    console.log("Selected kind",selectedKind?.value)
    var quickReplyFunc = {
      1: async function() { setDisableComposer(true); return quickRepliesItems = await getTypes()},
      2: async function() { setDisableComposer(true); return quickRepliesItems = await getKinds(selectedDocumentType.value)},
      3: async function() { setDisableComposer(true); return quickRepliesItems = await getTemplateByKind(selectedKind.value)},
      4: async function() { setDisableComposer(true); return quickRepliesItems = affiantNo },
      5: async function() { setDisableComposer(true); return quickRepliesItems = partyKind },
      6: async function() { setDisableComposer(true); return quickRepliesItems = proceedToStep2 }
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
      6: `Please review the legal document that you selected below. Are you sure this is the legal document you need?\n\n"${fetchedTemplate.template?.name}"\n\nNo. of Affiant: 1, 1 Individual\nPrice of Document - ₱${fetchedTemplate.template?.price}\nNo. of Questions - 16\nNo. of Minutes to Complete - ${fetchedTemplate.template?.minutes_to_finish_document}`,
      'default': 'fail'
    };
    return await (response[step] || response['default']);
  }

  async function sendBotResponse() {

    setIsTyping(true)
    await setQuickRepliesItems();
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

    if(step === 5) setFetchedTemplate(await fetchTemplate(selectedDocumentType, selectedKind, selectedTemplateByKind, selectedHowMany))
    if(step !== 6) setStep(prevStep => prevStep + 1)
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
          isTyping={isTyping || true}
          alwaysShowSend
          renderSend={(props) => renderSend(disableComposer, props)}
          renderComposer={(props) => renderComposer(disableComposer, props)}
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
  insertButton: {
		borderRadius: 15,
		marginTop: 10,
		paddingVertical: 8
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
})