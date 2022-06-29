import React from 'react';
import { Icon } from '@rneui/themed';
import { InputToolbar, Composer, Send } from 'react-native-gifted-chat/src';

import colors from '../../Helpers/colors';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.secondary_2,
      borderRadius: 3,
      alignItems: 'stretch',
      justifyContent: 'center',
    }}
    primaryStyle={{
      alignItems: 'stretch',
      justifyContent: 'center',
    }}
  />
)

export const renderComposer = (disableComposer, props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: colors.white,     
    }}
    disableComposer={disableComposer}
    placeholderTextColor={colors.white}
  />
);

export const renderSend = (disableComposer, props) => (
  <Send
    {...props}
    disabled={disableComposer}
    containerStyle={{
      backgroundColor: colors.secondary_light,
      paddingVertical: 8,
      paddingHorizontal: 15,
      justifyContent: 'center',
    }}
  >
    <Icon name="arrow-upward" size={26} color={colors.white} />
  </Send>
)