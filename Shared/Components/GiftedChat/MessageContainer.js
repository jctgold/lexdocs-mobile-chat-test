import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat/src';
import { QuickReplies } from 'react-native-gifted-chat/src/QuickReplies';

import colors from '../../Helpers/colors';

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{
      left: { alignSelf: 'flex-start' }, 
      right: { alignSelf: 'flex-start' } 
    }}
    imageStyle={{ 
      left: { borderRadius: 19, borderWidth: 2, width: 38, height: 38, borderColor: colors.primary }, 
      right: { borderRadius: 19, borderWidth: 2, width: 38, height: 38, borderColor: colors.white, backgroundColor: colors.secondary } 
    }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    containerStyle={{
      left: { marginRight: 10, alignItems: 'flex-start' },
      right: { alignItems: 'flex-start' },
    }}
  />
);

export const renderBubble = (props) => (
  <Bubble
    {...props}

    wrapperStyle={{
      right: { backgroundColor: colors.secondary, padding: 5, borderRadius: 20,  borderTopRightRadius: 0, marginBottom: 5 },
      left: { backgroundColor: colors.white, padding: 5, borderRadius: 20, borderTopLeftRadius: 0, marginBottom: 5 },
    }}
    // containerToPreviousStyle={{
    //   right: { backgroundColor: 'red', borderTopRightRadius: 15, borderBottomRightRadius: 0 },
    //   left: {  backgroundColor: 'pink', borderTopLeftRadius: 15, borderBottomLeftRadius: 0 },
    // }}
    // containerToNextStyle={{
    //   right: { backgroundColor: 'blue', borderTopRightRadius: 20},
    //   left: { backgroundColor: 'yellow', borderTopLeftRadius: 20 },
    // }}
    containerStyle={{
      right: { marginBottom: 5 },
      left: { marginBottom: 5 },
    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: { color: colors.secondary_2 },
      right: { color: colors.white },
    }}
    customTextStyle={{ fontSize: 14, fontWeight: '500' }}
  />
);

export const renderQuickReplies = (props) => (
  <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} >
    <QuickReplies
      {...props}
      color={colors.secondary} 
      quickReplyStyle={{ backgroundColor: colors.white, paddingVertical: 5, maxWidth: 270 }}
      quickReplyTextStyle={{ textAlign: 'center', padding: 0, margin: 0 }}
    />
  </ScrollView>
);